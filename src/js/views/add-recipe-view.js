import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.upload');
    this._window = document.querySelector('.add-recipe-window');
    this._overlay = document.querySelector('.overlay');
    this._button = document.querySelector('.nav__btn--add-recipe');
    this._uploadBtn = document.querySelector('.upload__btn');
    this._closeBtn = document.querySelector('.btn--close-modal');
    this._message = `Recipe sucessfully uploaded.`;
    this._errorMessage = 'Sorry, there was a problem uploading your recipe.';
    this._displayRecipeForm();
    this._hideRecipeForm();
    this._addIcon();
  }

  _restoreHTML(html) {
    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  addMessage(message = this._message) {
    let markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
      ${message}
    </p>
  </div>`;

    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _addIcon() {
    const svg = this._uploadBtn.querySelector('svg');
    svg.innerHTML = '';
    svg.insertAdjacentHTML(
      'afterbegin',
      `<use href="${icons}#icon-upload-cloud"></use>`
    );
  }

  _displayRecipeForm() {
    this._button.addEventListener('click', () => {
      [this._window, this._overlay].forEach(el => {
        el.classList.toggle('hidden');
      });
    });
  }

  _hideRecipeForm() {
    this._closeBtn.addEventListener('click', () => {
      [this._window, this._overlay].forEach(el => {
        el.classList.toggle('hidden');
      });
    });
  }
  addUploadHandler(handler) {
    this._uploadBtn.addEventListener('click', e => {
      e.preventDefault();
      const inputs = Array.from(this._parentElement.querySelectorAll('input'));
      handler(inputs);
      const currentHTML = this._parentElement.innerHTML;
      this.addMessage();
      setTimeout(() => {
        this._restoreHTML(currentHTML);
      }, 3000);
    });
  }
}

export default new AddRecipeView();
