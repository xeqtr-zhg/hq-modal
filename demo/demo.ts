import HqModal from '../src/index.ts';

const one = new HqModal('one-test', {
  maxWidth: '400px',
  background: 'blue',
  top: '100px',
  bottom: '10px',
  showButtonClose: true,
});

const two = new HqModal('two');

document.getElementById('test-metod-close')?.addEventListener('click', () => {
  two.hide();
});

document.getElementById('test-metod-show')?.addEventListener('click', () => {
  one.show();
});
