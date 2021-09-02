import { API_URL, RESULTS_PER_PAGE, TIMEOUT_SEC, API_KEY } from './config.js';
import { AJAX } from './funcs.js';

export const state = {
  recipe: {},
  searchResult: {},
  // pageNumber: null,
  bookmarks: [],
};

//prettier-ignore
export function Recipe(idd, title, publisher, sourceUrl, image, servings, cookingTime, ingredients) {
    this.id = idd;
    this.title = title;
    this.publisher = publisher;
    this.sourceUrl = sourceUrl;
    this.image = image;
    this.servings = servings;
    this.cookingTime = cookingTime;
    this.ingredients = ingredients;
    this.userGenerated = false;
}

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);

    // console.log(data);

    let { recipe } = data.data;

    state.recipe = new Recipe(
      recipe.id,
      recipe.title,
      recipe.publisher,
      recipe.source_url,
      recipe.image_url,
      recipe.servings,
      recipe.cooking_time,
      recipe.ingredients
    );

    if (recipe.key) state.recipe.userGenerated = true;

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    // if (!state.recipe) {
    //   throw new Error('recipe was not obtained or constructed');
    // }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (search) {
  try {
    const data = await AJAX(`${API_URL}?search=${search}&key=${API_KEY}`);

    const results = data.results;
    let { recipes } = data.data;
    if (results === 0) {
      throw new Error(
        'There are no results for that search, try a different keyword'
      );
    }
    state.searchResult = {
      query: search,
      quantity: results,
      pageNumber: 1,
      results: recipes.map(recipe => {
        return new Recipe(
          recipe.id,
          recipe.title,
          recipe.publisher,
          recipe.source_url,
          recipe.image_url,
          recipe.servings,
          recipe.cooking_time,
          recipe.ingredients
        );
      }),
    };
    if (!state.searchResult) {
      throw new Error('failed search could not get data from api');
    }
  } catch (err) {
    throw err;
  }
};

export const pages = function (page) {
  let startIndex = (page - 1) * RESULTS_PER_PAGE;
  let endIndex = startIndex + RESULTS_PER_PAGE;

  return state.searchResult.results.slice(startIndex, endIndex);
};

export const updateServings = function (goToData) {
  if (goToData === 'inc') {
    state.recipe.ingredients.forEach(ing => {
      ing.quantity =
        ing.quantity * ((state.recipe.servings + 1) / state.recipe.servings);
    });

    state.recipe.servings++;
  } else if (goToData === 'dec') {
    state.recipe.ingredients.forEach(ing => {
      ing.quantity =
        ing.quantity * ((state.recipe.servings - 1) / state.recipe.servings);
    });

    state.recipe.servings--;
  } else {
    alert('Something went wrong, unable not update servings.');
  }
};

const storeBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (state.recipe.id === recipe.id) {
    state.recipe.bookmarked = true;
  }
  storeBookmarks();
};

export const removeBookmark = function (recipe) {
  const index = state.bookmarks.findIndex(
    bookmark => bookmark.id === recipe.id
  );
  state.bookmarks.splice(index, 1);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
  storeBookmarks();
};

export const createUserRecipe = async function (array) {
  try {
    //this takes in an array produced from the submitted form results nodelist and turns it
    //into a recipe object like all the rest
    const data = {};
    data.ingredients = [];
    array.forEach((item, i) => {
      if (i < 6) {
        if (!item.value)
          throw new Error(
            'missing data in form response of user recipe, cannot create'
          );
        data[item.name] = item.value;
      } else {
        if (!item.value) return;
        let ingData = item.value.split(',');
        data.ingredients.push({
          quantity: parseFloat(ingData[0]),
          unit: ingData[1],
          description: ingData[2],
        });
      }
    });

    const recipe = {
      title: data.title,
      source_url: data.sourceUrl,
      image_url: data.image,
      publisher: data.publisher,
      cooking_time: +data.cookingTime,
      servings: +data.servings,
      ingredients: data.ingredients,
    };

    const newData = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    if (!newData) throw new Error('Could not upload to api');
    const newRecipe = newData.data.recipe;
    state.recipe = new Recipe(
      newRecipe.id,
      newRecipe.title,
      newRecipe.publisher,
      newRecipe.source_url,
      newRecipe.image_url,
      newRecipe.servings,
      newRecipe.cooking_time,
      newRecipe.ingredients
    );
    if (state.recipe.id !== newRecipe.id) {
      throw new Error('problem producing new recipe from data');
    }
  } catch (err) {
    throw err;
  }
};

export const init = function () {
  let storage = localStorage.getItem('bookmarks');
  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
};
