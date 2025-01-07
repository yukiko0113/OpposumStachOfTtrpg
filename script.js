import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Tippy from '@tippyjs/react/headless';

function TooltipContent() {
  const [tooltipContent, setTooltipContent] = useState('');

  useEffect(() => {
    // Charger le contenu de la tooltip via AJAX
    fetch('tooltip-content.html')
      .then(response => response.text())
      .then(data => {
        setTooltipContent(data);
      })
      .catch(error => console.error('Error loading tooltip content:', error));
  }, []);

  return (
    <div className="box" dangerouslySetInnerHTML={{ __html: tooltipContent }} />
  );
}

function App() {
  return (
    <Tippy
      render={attrs => (
        <TooltipContent {...attrs} />
      )}
    >
      <span id="ddBeyondWrapper">
        <a id="ddBeyond" href="https://www.dndbeyond.com/">D&D Beyond</a>
      </span>
    </Tippy>
  );
}
loadTooltipContent('tooltip-contents.html', '#tooltip-content-button', (content) => {
    tippy(button, {
        content: content,
        render(instance) {
            return createTooltip(instance.props.content, instance.props);
        },
        allowHTML: true,
        animation: 'fade',
        arrow: false,
        theme: 'tomato',
        trigger: 'mouseenter focus',
        touch: ['hold', 500],
        
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Rendre le composant React App
    ReactDOM.render(<App />, document.getElementById('react-root'));
});