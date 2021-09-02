import * as model from './model.js';
import recipeView from './views/recipe-view.js';
import searchResultsView from './views/searchresults-view.js';
import topBar from './views/topBar-view.js';
import pageView from './views/page-view.js';
import bookmarksView from './views/bookmarks-view.js';
import addRecipeView from './views/add-recipe-view.js';
// import bookmarksView from './views/bookmarks-view.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

//API_KEY: 7347745a-dee7-4f45-81eb-3df71e07a395

const controlRecipe = async function () {
  try {
    //generating getting id and generating spinner

    let id = window.location.hash.slice(1);

    if (!id) {
      return;
    }
    recipeView.renderSpinner();

    //loading and rendering recipe

    await model.loadRecipe(id);

    if (!model.state.recipe) {
      throw new Error('unable to retreive recipe');
    }
    if (typeof model.state.recipe !== 'object') {
      throw new Error('could not display recipe');
    }

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};

const controlSearchResults = async function (searchValue) {
  try {
    searchResultsView.renderSpinner();

    if (!searchValue || typeof searchValue !== 'string') {
      throw new Error('invalid search, search must be of string type');
    }

    await model.loadSearchResults(searchValue);

    if (!model.state.searchResult) {
      throw new Error('search could not retreive any data');
    }

    searchResultsView.render(model.pages(model.state.searchResult.pageNumber));

    pageView.render(
      model.state.searchResult.quantity,
      model.state.searchResult.pageNumber
    );

    searchResultsView.clearSearch();
  } catch (err) {
    searchResultsView.renderError();
    console.log(err);
  }
};

const controlPages = async function (gotoData) {
  try {
    model.state.searchResult.pageNumber = parseInt(gotoData);
    searchResultsView.render(model.pages(model.state.searchResult.pageNumber));
    pageView.render(
      model.state.searchResult.quantity,
      model.state.searchResult.pageNumber
    );
  } catch (err) {
    pageView.renderError();
    console.log(err);
  }
};

const controlServings = async function (goToData) {
  //update servings in state
  try {
    model.updateServings(goToData);
    //update view to reflect new state (recipe view)

    recipeView.update(model.state.recipe);
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

const controlBookmarks = async function () {
  try {
    if (
      model.state.bookmarks.some(recipe => recipe.id === model.state.recipe.id)
    ) {
      model.removeBookmark(model.state.recipe);
    } else {
      model.addBookmark(model.state.recipe);
    }
    recipeView.update(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    console.log(err);
  }
};

const controlUserCreateRecipe = async function (data) {
  try {
    await model.createUserRecipe(data);
    recipeView.render(model.state.recipe);
    controlBookmarks();
  } catch (err) {
    addRecipeView.renderError();
    console.log(err);
  }
};

const init = function () {
  model.init();
  recipeView.addHandler(controlRecipe);
  bookmarksView.loadBookmarksHandler(model.state.bookmarks);
  recipeView.addBookmarkHandler(controlBookmarks);
  recipeView.addServingsHandler(controlServings);
  searchResultsView.addHandler(controlSearchResults);
  pageView.addHandler(controlPages);
  addRecipeView.addUploadHandler(controlUserCreateRecipe);
};

init();
