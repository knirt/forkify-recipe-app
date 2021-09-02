import View from './view.js';
// import icons from 'url:../../img/icons.svg';

class SearchResultsView extends View {
  constructor() {
    super();
    this._searchBtn = document.querySelector('.search__btn');
    this._parentElement = document.querySelector('.results');
    this._errorMessage =
      'Sorry, we could not find any results for that search, try searching with another term.';
  }

  _getSearch() {
    return document.querySelector('.search__field').value;
  }

  clearSearch() {
    document.querySelector('.search__field').value = '';
  }

  addHandler(handler) {
    this._searchBtn.addEventListener('click', e => {
      e.preventDefault();
      handler(this._getSearch());
    });
  }

  _generateMarkup(data) {
    //prettier-ignore
    const html = `${data.map(item => {
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
      </li>`
    }).join('')}`;

    return html;
  }
}

export default new SearchResultsView();
