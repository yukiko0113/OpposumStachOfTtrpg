import tippy, { followCursor } from 'tippy.js/headless';

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#myButton');
    const ddBeyond = document.querySelector('#ddBeyond');

    // Vérifiez que les éléments existent
    if (!button || !ddBeyond) {
        console.error('Les éléments avec les IDs #myButton ou #ddBeyond sont introuvables.');
        return;
    }

    // Fonction pour charger le contenu de la tooltip via AJAX
    function loadTooltipContent(url, id, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = xhr.responseText;
                const content = tempDiv.querySelector(id).innerHTML;
                callback(content);
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

        return {
            popper,
            onUpdate(prevProps, nextProps) {
                if (prevProps.content !== nextProps.content) {
                    if (nextProps.allowHTML) {
                        box.innerHTML = nextProps.content;
                    } else {
                        box.textContent = nextProps.content;
                    }
                }

                if (prevProps.theme !== nextProps.theme) {
                    popper.setAttribute('data-theme', nextProps.theme);
                }

                if (prevProps.animation !== nextProps.animation) {
                    popper.setAttribute('data-animation', nextProps.animation);
                }
            },
        };
    }

    // Appliquer Tippy.js au bouton spécifique avec contenu chargé dynamiquement
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
            followCursor: true,
        });
    });

    // Appliquer Tippy.js à l'élément avec l'ID ddBeyond avec contenu chargé dynamiquement
    loadTooltipContent('tooltip-contents.html', '#tooltip-content-ddBeyond', (content) => {
        tippy(ddBeyond, {
            content: content,
            render(instance) {
                return createTooltip(instance.props.content, instance.props);
            },
            allowHTML: true,
            animation: 'fade',
            arrow: true,
            theme: 'ddBeyond',
            trigger: 'mouseenter focus',
            touch: ['hold', 500],
            followCursor: true,
        });
    });
});