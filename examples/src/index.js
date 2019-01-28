import '@babel/polyfill';
import FlexibleMenu from '../../src';

const fm = new FlexibleMenu({
  containerSelector: '.flexible-menu'
});

fm.init();
