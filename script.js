import {computePosition, shift, offset} from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.12/+esm';

document.addEventListener('DOMContentLoaded', () => {
    const ddBeyond = document.querySelector('#ddBeyond');
    const teste = document.querySelector('#teste');

    // Error handling for missing elements
    if (!ddBeyond || !teste) {
        console.error('Required elements not found');
        return;
    }

    function createTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);
        return tooltip;
    }

    function loadTooltipContent(url, selector, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = xhr.responseText;
                        const contentElement = tempDiv.querySelector(selector);
                        if (contentElement) {
                            callback(contentElement.innerHTML);
                        } else {
                            console.error(`Element with selector "${selector}" not found`);
                        }
                    } catch (error) {
                        console.error('Error processing tooltip content:', error);
                    }
                } else {
                    console.error(`Failed to load tooltip content: ${xhr.status}`);
                }
            }
        };
        xhr.onerror = () => console.error('Request failed');
        xhr.send();
    }

    function updatePosition(tooltip, reference, x, y) {
        // Create virtual element for cursor position
        const virtualEl = {
            getBoundingClientRect() {
                return {
                    width: 0,
                    height: 0,
                    top: y,
                    right: x,
                    bottom: y,
                    left: x,
                    x: x,
                    y: y,
                };
            },
        };

        // Calculate position with middleware
        computePosition(virtualEl, tooltip, {
            placement: 'top',
            middleware: [
                offset({
                    mainAxis: 5,
                    crossAxis: 0,
                }),
                shift({padding: 5}),
            ]
        }).then(({x, y}) => {
            Object.assign(tooltip.style, {
                left: `${x}px`,
                top: `${y}px`,
                position: 'absolute'
            });
        }).catch(error => {
            console.error('Error updating tooltip position:', error);
        });
    }

    return {createTooltip, loadTooltipContent, updatePosition};
});