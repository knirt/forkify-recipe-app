import icons from 'url:../../img/icons.svg';

export default class View {
  constructor() {
    this._data = null;
    this._parentElement = document.querySelector('.recipe');
    this._errorMessage = 'Something went wrong.';
  }

  get data() {
    return this._data;
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.log(`data: ${data}`);
      throw new Error('data passed into render is undefined or empty');
    }
    this._data = data;
    let markup = this._generateMarkup(this.data);
    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    //this method creates new html under the given parent element, find the elements which have changed,
    // and re-renders only those changed elements
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.log(`data: ${data}`);
      throw new Error('data passed into render is undefined or empty');
    }
    this._data = data;
    const newMarkup = this._generateMarkup(this.data);
    //2 vars below grab the updated dom and the current dom and convert to arrays so they can be searched
    const newDOM = Array.from(
      document
        .createRange()
        .createContextualFragment(newMarkup)
        .querySelectorAll('*')
    );
    const oldDOM = Array.from(this._parentElement.querySelectorAll('*'));
    //now compare each element and if it is different set old equal to new :)
    newDOM.forEach((newEl, i) => {
      let oldEl = oldDOM[i];
      if (
        !newEl.isEqualNode(oldEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        oldEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(oldEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          oldEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  showNavItemHandler() {
    const nav = document.querySelectorAll('.nav__item');
    Array.from(nav).forEach(item => {
      item.addEventListener('mouseover', () => {
        this._parentElement.style.opacity = '1';
      });
    });
  }

  _clearHTML() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;
    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
