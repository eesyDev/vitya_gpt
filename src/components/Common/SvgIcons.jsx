import React, { useEffect, useState } from 'react';

const SvgIcon = ({ src, className, ...props }) => {
    const [svgContent, setSvgContent] = useState('');
  
    useEffect(() => {
      fetch(src)
        .then(response => response.text())
        .then(text => {
          const modifiedSvg = text
            .replace(/fill="#[^"]*"/g, 'fill="var(--text-primary)"')
            .replace(/stroke="#[^"]*"/g, 'stroke="var(--text-secondary)"');
          setSvgContent(modifiedSvg);
        });
    }, [src]);
  
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        {...props}
      />
    );
  };

export default SvgIcon;