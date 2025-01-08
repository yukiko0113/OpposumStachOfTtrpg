import tippy from 'https://unpkg.com/@tippyjs/core@2.5.4/headless/dist/tippy-headless.esm.js';


document.addEventListener('DOMContentLoaded', () => {
  const ddBeyond = document.querySelector('#ddBeyond');

  function loadTooltipContent(url, selector, callback) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = xhr.responseText;
              const contentElement = tempDiv.querySelector(selector);
              if (contentElement) {
                  const content = contentElement.innerHTML;
                  callback(content);
              } else {
                  console.error(`Element with selector ${selector} not found in the response.`);
              }
          }
      };
      xhr.send();
  }

  // Appliquer Tippy.js à l'élément avec l'ID ddBeyond avec contenu chargé dynamiquement
  loadTooltipContent('tooltip-content.html', '#tooltip-content-ddBeyond', (content) => {
      tippy(ddBeyond, {
          content: content,
          allowHTML: true,
          render(instance) {
              const popper = document.createElement('div');
              const box = document.createElement('div');
              popper.appendChild(box);
              box.className = 'my-custom-class';
              box.innerHTML = instance.props.content;
              return {
                  popper,
                  onUpdate(prevProps, nextProps) {
                      box.innerHTML = nextProps.content;
                  },
              };
          },
          animation: 'fade',
          arrow: true,
          trigger: 'mouseenter focus',
          touch: ['hold', 500],
      });
  });
});