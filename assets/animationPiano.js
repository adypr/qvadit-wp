
export default  (piano) => {
  
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

    event.preventDefault();
  }
  });
}
