document.addEventListener('DOMContentLoaded', function() {
  // Configura o efeito de arrastar mais suave
  const labGrid = document.getElementById('labGrid');
  
  if (labGrid) {
    let dragOverTimeout;
    
    labGrid.addEventListener('dragover', function(e) {
      e.preventDefault();
      clearTimeout(dragOverTimeout);
      
      const afterElement = getDragAfterElement(labGrid, e.clientY);
      const draggable = document.querySelector('.arrastando');
      
      if (!draggable) return;
      
      if (afterElement) {
        labGrid.insertBefore(draggable, afterElement);
      } else {
        labGrid.appendChild(draggable);
      }
    });
    
    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.lab-card:not(.arrastando)')];
      
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
  }
});