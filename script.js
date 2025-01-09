import tippy, {followCursor} from './node_modules/tippy.js/headless/dist/tippy-headless.esm.js';

document.addEventListener('DOMContentLoaded', () => {
    const ddBeyond = document.querySelector('#ddBeyond');
    const teste = document.querySelector('#teste'); // Corriger la sélection

  function loadTooltipContent(url, selector, callback) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = xhr.responseText;
              const contentElement = tempDiv.querySelector(selector);
              if (contentElement) {
                  callback(contentElement.innerHTML);
              }
          }
      };
      xhr.send();
  }

  loadTooltipContent('tooltip-content.html', '#tooltip-content-ddBeyond', (content) => {
    tippy(ddBeyond, {
        content,
        allowHTML: true,
        followCursor: true,
        plugins: [followCursor],
        placement: 'top',
        render(instance) {
            const popper = document.createElement('div');
            const box = document.createElement('div');
            
            box.className = 'tippy-box';
            box.innerHTML = instance.props.content;
            
            popper.appendChild(box);
            
            return {
                popper,
                onUpdate(prevProps, nextProps) {
                    if (prevProps.content !== nextProps.content) {
                        box.innerHTML = nextProps.content;
                    }
                }
            };
        },
        trigger: 'mouseenter focus',
        touch: ['hold', 500]
        });
    });
    loadTooltipContent('tooltip-content.html', '#tooltip-content-teste', (content) => {
      tippy(teste, {
          content,
          allowHTML: true,
          followCursor: true,
          plugins: [followCursor],
          placement: 'top',
          offset: [2,0], // [x, y] offset from cursor
          withmax: 120,
          render(instance) {
              const popper = document.createElement('div');
              const box = document.createElement('div');
              
              box.className = 'tippy-box';
              box.innerHTML = instance.props.content;
              
              popper.appendChild(box);
              
              return {
                  popper,
                  onUpdate(prevProps, nextProps) {
                      if (prevProps.content !== nextProps.content) {
                          box.innerHTML = nextProps.content;
                      }
                  }
              };
          },
          trigger: 'mouseenter focus',
          touch: ['hold', 500]
      });
});
});