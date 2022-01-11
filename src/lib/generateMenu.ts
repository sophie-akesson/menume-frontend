import countRecipes from './countRecipes';
import getRecipes from './getRecipes';
import { previousMonday, isMonday, addDays, parseISO, format } from 'date-fns';
import getMenu from './getMenu';
import deleteMenu from './deleteMenu';
import postMenu from './postMenu';

const generateMenu = async (token, username) => {
  let shouldGenerateMenu = false;

  const numberOfRecipes = await countRecipes(token, username);

  if (numberOfRecipes < 14)
    return `Du måste lägga in fler recept innan vi kan ge dig din meny. Just nu har du ${numberOfRecipes} av minimum 14 recept.`;

  const currentMenu = await getMenu(token);

  if (!currentMenu.length) {
    shouldGenerateMenu = true;
  } else {
    //See if we should generate a menu for this week by checking for dates
    shouldGenerateMenu = currentMenu.some(
      recipe =>
        format(parseISO(recipe.date), 'yyyy-MM-dd') <
        format(previousMonday(new Date()), 'yyyy-MM-dd')
    );

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

const createMenu = async (username, token, menu) => {
  let recipesToPost = [];
  let createdMenu = [];
  let monday = new Date();

  if (!isMonday(new Date())) monday = previousMonday(new Date());

  const recipes = await getRecipes(username, token);

  const recipeIds = recipes.reduce((a, recipe) => {
    a.push(recipe.id);
    return a;
  }, []);

  const shuffeledRecipes = shuffleRecipes(recipeIds);

  if (menu.length) {
    await deleteMenu(token, username);

    recipesToPost = shuffeledRecipes.filter(recipe => {
      menu.includes(!recipe.recipe);
    });
  } else {
    recipesToPost = shuffeledRecipes;
  }

  const menuForSevenDays = recipesToPost.slice(0, 7);

  // Post each item to Strapi along with a date starting on the last monday
  // ..or today if it is a monday today.
  // Why in a for loop? Strapi does not support bulk POSTing
  for (let i = 0; i < menuForSevenDays.length; i++) {
    const date = addDays(monday, i);
    await postMenu(token, date, menuForSevenDays[i]);
  }

  createdMenu = await getMenu(token);

  return createdMenu;
};

const shuffleRecipes = recipes => {
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
