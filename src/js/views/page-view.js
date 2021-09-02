import View from './view.js';
import icons from 'url:../../img/icons.svg';
import { RESULTS_PER_PAGE } from '../config.js';

class PageView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.pagination');
  }

  addHandler(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = btn.dataset.goto;
      handler(goToPage);
    });
  }

  render(data, pageNum) {
    this._data = data;
    let markup = this._generateMarkup(this.data, pageNum);
    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup(data, pageNum) {
    let totalPages = Math.ceil(data / RESULTS_PER_PAGE);
    if (typeof data !== 'number') {
      throw new Error(
        'problem in pageView buttons, data is wrong type, not a number'
      );
    }

    if (data <= RESULTS_PER_PAGE) {
      return '';
    } else if (pageNum === 1) {
      return `<button data-goto="${
        pageNum + 1
      }" class="btn--inline pagination__btn--next">
    <span>Page 2</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
    } else if (pageNum !== 1 && pageNum < totalPages) {
      return `<button data-goto="${
        pageNum - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${pageNum - 1}</span>
    </button>
    <button data-goto="${
      pageNum + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${pageNum + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    } else if (pageNum === totalPages) {
      return `<button data-goto="${
        pageNum - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${pageNum - 1}</span>
    </button>`;
    }
  }
}
export default new PageView();

/*

onclick:
- tick next button up 1
- render prev button / tick up 1
- pass in new number to controller render func


<button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page 1</span>
  </button>


${Math.ceil(data / 10)}

*/
