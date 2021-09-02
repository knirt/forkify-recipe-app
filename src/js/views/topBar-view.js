import icons from 'url:../../img/icons.svg';

class TopBar {
  constructor() {
    this._searchBtn = document.querySelector('.search__btn');
    this._bookmarkBtn = document.querySelector('.nav__btn--bookmarks');
    this._addRecipeBtn = document.querySelector('.nav__btn--add-recipe');
    this._searchSvg = this._searchBtn.querySelector('svg');
    this._bookmarkSvg = this._bookmarkBtn.querySelector('svg');
    this._addSvg = this._addRecipeBtn.querySelector('svg');
    this._addAllIcons();
  }

  _addIcons(parent, markup, removedEl) {
    removedEl.remove();
    parent.insertAdjacentHTML('afterbegin', markup);
  }

  _addAllIcons() {
    this._addIcons(
      this._searchSvg,
      `<use href="${icons}#icon-search"></use>`,
      this._searchSvg.querySelector('use')
    );
    this._addIcons(
      this._bookmarkSvg,
      `<use href="${icons}#icon-bookmark"></use>`,
      this._bookmarkSvg.querySelector('use')
    );
    this._addIcons(
      this._addSvg,
      `<use href="${icons}#icon-edit"></use>`,
      this._addSvg.querySelector('use')
    );
  }
}

export default new TopBar();
