import React from 'react';
import './style.css';
// import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import bootstrap from 'bootstrap';
import Tippy from '@tippyjs/react/headless'; // different import path!

export default function App() {
  return (
    <div className="text-center bg-dark">
      <Tippy
        render={attrs => (
          <div className="box" tabIndex="-1" {...attrs}>
            My tippy box jajaj
          </div>
        )}
      >
        <button>My button</button>
      </Tippy>
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#myButton');
    const ddBeyond = document.querySelector('#ddBeyond');

    // Vérifiez que les éléments existent
    if (!button || !ddBeyond) {
        console.error('Les éléments avec les IDs #myButton ou #ddBeyond sont introuvables.');
        return;
    }

    // Fonction pour charger le contenu de la tooltip via AJAX
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

    // Fonction pour créer et retourner la structure DOM de la tooltip
    function createTooltip(content, props) {
        const popper = document.createElement('div');
        const box = document.createElement('div');

        popper.appendChild(box);

        box.className = 'my-custom-class';
        if (props.allowHTML) {
            box.innerHTML = content;
        } else {
            box.textContent = content;
        }

        if (props.theme) {
            popper.setAttribute('data-theme', props.theme);
        }

        if (props.animation) {
            popper.setAttribute('data-animation', props.animation);
        }

        return popper;
    }

    // Utilisation de tippy.js pour créer une tooltip
    tippy(button, {
        content: 'Loading...',
        allowHTML: true,
        onShow(instance) {
            loadTooltipContent('https://www.dndbeyond.com/', '#someSelector', (content) => {
                instance.setContent(createTooltip(content, { allowHTML: true, theme: 'ddBeyond' }));
            });
        }
    });

    // Rendre le composant React HeadlessTippy
    ReactDOM.render(<HeadlessTippy />, document.getElementById('react-root'));
});