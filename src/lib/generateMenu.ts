import countRecipes from './countRecipes';
import getRecipes from './getRecipes';
import { previousMonday, isMonday, addDays, parseISO, format } from 'date-fns';
import getMenu from './getMenu';
import deleteMenu from './deleteMenu';
import postMenu from './postMenu';
import checkGrocery from './checkGrocery';
import { IMenu } from '@interfaces/menu';
import { IRecipe } from '@interfaces/recipe';

const generateMenu = async (token: string, username: string) => {
  let shouldGenerateMenu = false;

  const numberOfRecipes = await countRecipes(token, username);

  if (numberOfRecipes < 14)
    return `Du måste lägga in fler recept innan vi kan ge dig din meny. Just nu har du ${numberOfRecipes} av minimum 14 recept.`;

  const currentMenu: IMenu[] = await getMenu(token, username);

  if (!currentMenu.length) {
    shouldGenerateMenu = true;
  } else {
    //See if we should generate a menu for this week by checking for dates
    //Is the recipe date in the menu older than the latest Monday?
    shouldGenerateMenu = currentMenu.some(
      recipe =>
        format(parseISO(recipe.date), 'yyyy-MM-dd') <
        format(previousMonday(new Date()), 'yyyy-MM-dd')
    );

    //Another check incase it's a Monday today
    //Does the first recipe (always a Monday) differ from today?
    if (
      isMonday(new Date()) &&
      format(parseISO(currentMenu[0].date), 'yyyy-MM-dd') !=
        format(new Date(), 'yyyy-MM-dd')
    )
      shouldGenerateMenu = true;
  }

  if (!shouldGenerateMenu) return currentMenu;

  return await createMenu(username, token, currentMenu);
};

const createMenu = async (username: string, token: string, menu: IMenu[]) => {
  let recipesToPost: number[] = [];
  let createdMenu: IMenu[] = [];
  let monday = new Date();

  //We want the first date to be the latest Monday
  if (!isMonday(new Date())) monday = previousMonday(new Date());

  const recipes: IRecipe[] = await getRecipes(username, token);

  //Extract recipeIds, since menu uses relations to recipes in Strapi
  const recipeIds: number[] = recipes.reduce((a, recipe) => {
    a.push(recipe.id);
    return a;
  }, []);

  const menuRecipeIds: number[] = menu.reduce((a, menuItem) => {
    a.push(menuItem.recipe.id);
    return a;
  }, []);

  //Shuffle the ids
  const shuffeledRecipes: number[] = shuffleRecipes(recipeIds);

  //If there's a current menu, delete it first
  if (menu.length) {
    await deleteMenu(token, username);

    //If there's a previous menu we also need to uncheck
    //all ingredients from the grocery list
    menu.forEach(async menuItem => {
      menuItem.recipe.ingredients.forEach(async ingredient => {
        await checkGrocery(ingredient.id as number, token, false);
      });
    });

    //Make sure that the recipes eligable for a new menu
    //isn't in the previous menu to avoid having the same recipe
    //in the menu two weeks in a row.
    recipesToPost = shuffeledRecipes.filter(recipeId => {
      !menuRecipeIds.includes(recipeId);
    });
  } else {
    recipesToPost = shuffeledRecipes;
  }

  //Only pick 7 recipes as we only create a menu for 7 days
  const menuForSevenDays = recipesToPost.slice(0, 7);

  // Post each item to Strapi along with a date starting on the last monday
  // ..or today if it is a monday today.
  // Why in a forEach? Strapi does not support bulk POSTing
  menuForSevenDays.forEach(async (recipe, index) => {
    const date = addDays(monday, index);
    await postMenu(token, date, recipe);
  });

  createdMenu = await getMenu(token, username);

  return createdMenu;
};

const shuffleRecipes = (recipes: number[]) => {
  //Shuffle recipes using Fisher-Yates algorithm
  let currentIndex = recipes.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [recipes[currentIndex], recipes[randomIndex]] = [
      recipes[randomIndex],
      recipes[currentIndex],
    ];
  }

  return recipes;
};

export default generateMenu;
