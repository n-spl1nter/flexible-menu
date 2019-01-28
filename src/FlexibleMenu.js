export default class FlexibleMenu {
  config = {
    containerSelector: null,
    buttonText: 'More',
  };
  container = null;
  menuItems = [];
  button = null;
  hiddenItemsContainer = null;
  _isInitialized = false;

  constructor(props = {}) {
    this.config = {...this.config, ...props};
    if (!this.config.containerSelector) {
      throw new Error('No container option');
    }
    this.container = document.querySelector(this.config.containerSelector);
    if (!this.container) {
      throw new Error('Container not found');
    }
  }

  init() {
    if (this.isInitialized) {
      throw new Error('Flexible menu is already initialized');
    }
    this.menuItems = [...this.container.children];
    this.button = document.createElement('li');
    this.button.classList.add('flexible-menu__more-button');
    const buttonText = document.createElement('span');
    buttonText.innerText = this.config.buttonText;
    this.hiddenItemsContainer = document.createElement('ul');
    this.hiddenItemsContainer.classList.add('flexible-menu__hidden-items');

    this.button.appendChild(buttonText);
    this.button.appendChild(this.hiddenItemsContainer);
    this.container.appendChild(this.button);
    this._updateMenu();
    window.addEventListener('resize', this.handleWindowResize);
    this._isInitialized = true;
  }

  destroy() {
    if (!this.isInitialized) {
      throw new Error('Flexible menu is not initialized');
    }
    this.menuItems.forEach(menuItem => {
      menuItem.style.display = 'block';
    });
    this.button.parentNode.removeChild(this.button);
    this.button = null;
    this.hiddenItemsContainer = null;
    window.removeEventListener('resize', this.handleWindowResize);
    this._isInitialized = false;
  }


  get isInitialized() {
    return this._isInitialized;
  }

  _updateMenu() {
    this.button.style.display = 'block';
    const buttonWidth = this._getItemFullWidth(this.button);
    this.button.style.display = 'none';
    const containerWidth =
      this.container.offsetWidth
      - (parseFloat(window.getComputedStyle(this.container).paddingLeft) || 0)
      - (parseFloat(window.getComputedStyle(this.container).paddingRight) || 0);
    const containerWithButtonWidth = containerWidth - buttonWidth;
    let hiddenItems = [];
    this.menuItems.reduce((visibleItemsWidth, item) => {
      item.style.display = 'block';
      const itemWidth = this._getItemFullWidth(item);
      if (visibleItemsWidth + itemWidth >= containerWithButtonWidth) {
        item.style.display = 'none';
        hiddenItems.push(item);
      }
      return visibleItemsWidth + itemWidth;
    }, 0);

    this.toggleButton(hiddenItems);
  }

  _getItemFullWidth(item) {
    const style = item.currentStyle || window.getComputedStyle(item);
    const width = parseFloat(item.offsetWidth);
    const margin = (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
    const padding = (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0);
    const border = (parseFloat(style.borderLeftWidth) || 0) + (parseFloat(style.borderRightWidth) || 0);

    // тут костыль с четверкой, браузер направильно дробную ширину считает
    return width + margin - padding + border + 4;
  }

  toggleButton(items) {
    while (this.hiddenItemsContainer.firstChild) {
      this.hiddenItemsContainer.removeChild(this.hiddenItemsContainer.firstChild);
    }
    if (items.length === 0) {
      this.button.style.display = 'none';
      return void 0;
    }

    this.button.style.display = 'block';
    items.forEach(item => {
      const clonedItem = item.cloneNode(true);
      clonedItem.style.display = 'block';
      this.hiddenItemsContainer.appendChild(clonedItem);
    });
  }

  handleWindowResize = () => {
    this._updateMenu();
  };

}
