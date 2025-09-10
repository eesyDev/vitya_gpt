export default async function handler(req, res) {
    // Разрешаем CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    const { method, body } = req;
    const apiPath = req.query.path?.join('/') || '';
    
    try {
      const response = await fetch(`http://89.111.169.135:8080/${apiPath}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
        },
        body: method !== 'GET' ? JSON.stringify(body) : undefined
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Proxy error' });
    }
  }