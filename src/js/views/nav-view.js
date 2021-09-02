import View from './view.js';
import icons from 'url:../../img/icons.svg';

class NavView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.bookmarks');
  }

  addHandler(handler) {
    this._parentElement.addEventListener('mouseover', () => {
      handler();
    });
  }

  _generateMarkup(data) {
    return `<li class="preview">
        <a class="preview__link" href="#${data.id}">
          <figure class="preview__fig">
            <img ${data.image}" alt="${data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__name">
              Pasta with Tomato Cream ...
            </h4>
            <p class="preview__publisher">${data.publisher}</p>
          </div>
        </a>
      </li>`;
  }
}
