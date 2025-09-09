import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export const ChatPanel = ({ isVisible, onClose, onChatSelect }) => {
	// const [chats] = useState([
	//   { id: 1, title: 'Составление алгоритма продаж', isActive: true },
	//   { id: 2, title: 'Формулирование задачи', isActive: false },
	//   { id: 3, title: 'Анализ конкурентов', isActive: false },
	//   { id: 4, title: 'Планирование проекта', isActive: false }
	// ]);

	const [chats, setChats] = useState([]);
	const [isCreating, setIsCreating] = useState(false);
	const [newChatName, setNewChatName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const { getValidToken, user } = useAuth();

	// Загрузка чатов при открытии панели
	useEffect(() => {
		if (isVisible && user) {
			loadChats();
		}
	}, [isVisible, user]);


	// Загрузка списка чатов
	const loadChats = async () => {
		try {
			const token = await getValidToken();
			if (!token) return;

			const response = await fetch('/api/chats', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			if (response.ok) {
				const chatsData = await response.json();
				setChats(chatsData.map(chat => ({
					...chat,
					title: chat.chatName,
					isActive: false
				})));
			}
		} catch (error) {
			console.error('Ошибка загрузки чатов:', error);
		}
	};
	// Создание нового чата
	const createChat = async () => {
		if (!newChatName.trim()) {
			setError('Введите название чата');
			return;
		}

		setIsLoading(true);
		setError('');

		try {
			const token = await getValidToken();
			if (!token) {
				setError('Необходима авторизация');
				return;
			}

			const response = await fetch('/api/chats', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({
					chatName: newChatName.trim(),
					idUser: user.id
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Ошибка создания чата');
			}

			const newChat = await response.json();

			// Добавляем новый чат в список
			const chatWithActive = {
				...newChat,
				title: newChat.chatName,
				isActive: true
			};

			// Делаем новый чат активным, остальные неактивными
			setChats(prevChats => [
				chatWithActive,
				...prevChats.map(chat => ({ ...chat, isActive: false }))
			]);

			// Сбрасываем форму
			setNewChatName('');
			setIsCreating(false);

			// Уведомляем родительский компонент о выборе чата
			if (onChatSelect) {
				onChatSelect(chatWithActive);
			}

		} catch (error) {
			console.error('Ошибка создания чата:', error);
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	// Выбор чата
	const selectChat = (chatId) => {
		setChats(prevChats =>
			prevChats.map(chat => ({
				...chat,
				isActive: chat.id === chatId
			}))
		);

		const selectedChat = chats.find(chat => chat.id === chatId);
		if (onChatSelect && selectedChat) {
			onChatSelect(selectedChat);
		}
	};

	// Отмена создания
	const cancelCreation = () => {
		setIsCreating(false);
		setNewChatName('');
		setError('');
	};

	if (!isVisible) return null;

	return (
		<div className="w-80 bg-bg-secondary h-screen border-r border-border-custom flex flex-col">
			{/* Header */}
			<div className="p-4 border-b border-border-custom">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center space-x-3">
						<div className="w-3 h-3 bg-green-gradient rounded-full"></div>
						<h2 className="text-lg font-medium text-text-primary">Все чаты Kotler</h2>
					</div>
					<button
						onClick={onClose}
						className="text-text-muted hover:text-text-primary transition-colors p-1"
					>
						✕
					</button>
				</div>

				{/* New Chat Button */}
				<button className="w-full bg-bg-tertiary hover:bg-bg-primary border border-border-custom rounded-lg p-3 flex items-center justify-between text-text-secondary hover:text-text-primary transition-colors">
					<span>Создать новый чат</span>
					<span className="text-lg">+</span>
				</button>
			</div>

			{/* Chat List */}
			<div className="flex-1 overflow-y-auto">
				<div className="p-4">
					<h3 className="text-sm text-text-muted mb-3">Прошлые чаты</h3>
					<div className="space-y-2">
						{chats.map((chat) => (
							<div
								key={chat.id}
								className={`p-3 rounded-lg cursor-pointer transition-colors ${chat.isActive
										? 'bg-bg-primary border border-border-custom'
										: 'hover:bg-bg-tertiary'
									}`}
							>
								<p className="text-text-primary text-sm font-medium leading-tight">
									{chat.title}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};