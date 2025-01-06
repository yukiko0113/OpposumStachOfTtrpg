document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#myButton');
  const ddBeyond = document.querySelector('#ddBeyond');

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

  // Appliquer Tippy.js au bouton spécifique avec contenu chargé dynamiquement
  loadTooltipContent('tooltip-content.html', '#tooltip-content-button', (content) => {
      tippy(button, {
          content: content,
          allowHTML: true,
          animation: 'fade',
          arrow: false,
          trigger: 'mouseenter focus', // Ajoutez 'focus' pour les appareils tactiles
          touch: ['hold', 500], // 'hold' avec un délai de 500ms
      });
  });

  // Appliquer Tippy.js à l'élément avec l'ID ddBeyond avec contenu chargé dynamiquement
  loadTooltipContent('tooltip-content.html', '#tooltip-content-ddBeyond', (content) => {
      tippy(ddBeyond, {
          theme: 'ddBeyond',
          content: content,
          allowHTML: true,
          animation: 'fade',
          arrow: false,
          trigger: 'mouseenter focus', // Ajoutez 'focus' pour les appareils tactiles
          touch: ['hold', 500], // 'hold' avec un délai de 500ms
      });
  });
});