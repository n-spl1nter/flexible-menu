# Flexible menu

### Demo 
[GitHub Pages](https://n-spl1nter.github.io/flexible-menu/).
### Install
```javascript
npm install flexible-menu
```
### Usage
```javascript
import FlexibleMenu from './FlexibleMenu';

const fm = new FlexibleMenu({
  containerSelector: '.flexible-menu'
});

fm.init();
```
### Public API
| name | type | description |
| ---- | ---- | ----------- |
| init | method | Initialize plugin, throws error if already initialized |  
| destroy | method | Destroy plugin, throws error if not initialized |  
| isInitialized | property | Return *true* if initialized |  