import View from './view.js';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class RecipeView extends View {
  constructor() {
    super();
    this._errorMessage =
      'Sorry, there was an issue in finding/loading that recipe, please try another one.';
  }

  addHandler(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  addServingsHandler(handler) {
    this._parentElement.addEventListener('click', e => {
      const currentServingSize = this._parentElement.querySelector(
        '.recipe__info-data--people'
      ).textContent;

      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      const btnType = btn.dataset.goto;
      if (parseInt(currentServingSize) !== 1 || btnType === 'inc') {
        handler(btnType);
      }
    });
  }

  addBookmarkHandler(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--round');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup(data) {
    //prettier-ignore
    return `<figure class="recipe__fig">
    <img src="${data.image}" alt="${data.title}" class="recipe__img"/>
    <h1 class="recipe__title">
      <span>${data.title}</span>
    </h1>
  </figure>
  
  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        data.servings
      }</span>
      <span class="recipe__info-text">servings</span>
  
      <div class="recipe__info-buttons">
        <button data-goto="dec" class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button data-goto="inc" class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
  
    <div class="recipe__user-generated ${this.data.userGenerated ? '' : 'hidden'}">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark${this.data.bookmarked ? '-fill': ''}"></use>
      </svg>
    </button>
  </div>
  
  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
  
    ${data.ingredients
      .map(item => {
        return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        item.quantity ? new Fraction(item.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${item.unit}</span>
        ${item.description}
      </div>
    </li>`
      })
      .join('')}
    
    </ul>
  </div>
  
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
}

export default new RecipeView();
