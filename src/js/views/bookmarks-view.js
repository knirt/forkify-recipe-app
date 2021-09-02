import View from './view.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.bookmarks__list');
    this._parentDiv = document.querySelector('.bookmarks');
    this._renderBookmarkHandler();
  }

  _renderBookmarkHandler() {
    const element = document.querySelector('.nav__btn--bookmarks');
    element.addEventListener('mouseover', () => {
      if ((this._parentElement.style.opacity = '0')) {
        this._parentElement.style.opacity = '1';
      }
    });
    document.querySelector('#mark-list').addEventListener('mouseleave', () => {
      if ((this._parentElement.style.opacity = '1')) {
        this._parentElement.style.opacity = '0';
      }
    });
  }

  render(data) {
    this._data = data;
    let markup;
    if (Array.isArray(data) && data.length === 0) {
      markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>
        No bookmarks yet. Find a nice recipe and bookmark it.
      </p>
    </div>`;
    } else {
      markup = this._generateMarkup(this.data);
    }
    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  loadBookmarksHandler(data) {
    window.addEventListener('load', () => {
      //this is render for bookmarks which will render newly populated state.bookmarks with opacity of 0
      this.render(data);
    });
  }

  _generateMarkup(data) {
    this._parentElement.style.opacity = '0';
    const html = `${data
      .map(item => {
        return `<li class="preview">
              <a class="preview__link" href="#${item.id}">
                <figure class="preview__fig">
                  <img src="${item.image}" alt="${item.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${item.title}</h4>
                  <p class="preview__publisher">${item.publisher}</p>
                </div>
              </a>
            </li>`;
      })
      .join('')}`;

    return html;
  }
}

export default new BookmarksView();
