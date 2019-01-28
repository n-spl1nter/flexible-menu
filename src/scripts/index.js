import '@babel/polyfill';
import FlexibleMenu from './FlexibleMenu';

const fm = new FlexibleMenu({
  containerSelector: '.flexible-menu'
});

fm.init();

window.fm = fm;
