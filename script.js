import tippy from './node_modules/tippy.js/headless/dist/tippy-headless.esm.js';

document.addEventListener('DOMContentLoaded', () => {
  const ddBeyond = document.querySelector('#ddBeyond');

  function loadTooltipContent(url, selector, callback) {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.querySelector(selector);
        if (content) {
          callback(content.innerHTML);
        }
      });
  }

  loadTooltipContent('tooltip-content.html', '#tooltip-content-ddBeyond', (content) => {
    tippy(ddBeyond, {
      content,
      allowHTML: true,
      render(instance) {
        const popper = document.createElement('div');
        const box = document.createElement('div');
        
        box.className = 'tippy-box';
        box.setAttribute('data-state', 'visible');
        box.setAttribute('tabindex', '-1');
        box.innerHTML = instance.props.content;
        
        popper.appendChild(box);
        
        function onUpdate(prevProps, nextProps) {
          if (prevProps.content !== nextProps.content) {
            box.innerHTML = nextProps.content;
          }
        }

        return {
          popper,
          onUpdate
        };
      },
      trigger: 'mouseenter focus',
      touch: ['hold', 500]
    });
  });
});