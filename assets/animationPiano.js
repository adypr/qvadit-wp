
export default  (piano) => {

  if (!piano) return;
  
  piano.addEventListener('mousedown', (event) => {
    if (event.target.closest('.key')) {
        const key = event.target.closest('.key');
        key.style.transformOrigin = 'right';
        key.style.transform = 'perspective(500px) rotateY(-5deg)';
  }
  });

  piano.addEventListener('mouseup', (event) => {
    if (event.target.closest('.key')) {
        const key = event.target.closest('.key');
        key.style.transform = '';
  }
  });

  piano.addEventListener('mouseout', (event) => {
    if (event.target.closest('.key')) {
        const key = event.target.closest('.key');
        key.style.transform = '';
  }
  });

  piano.addEventListener('click', (event) => {
    if (event.target.closest('.key')) {
  }
  });

  piano.addEventListener('click', function(event) {
    const listItem = event.target.closest('.sheets__item.white');
    if (listItem) {
      const link = listItem.querySelector('a');
      if (link) {
        window.location.href = link.href;
      }
    }
  });
}
