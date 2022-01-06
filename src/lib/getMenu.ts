import getRecipes from './getRecipes';
import { previousMonday, isMonday, addDays, parseISO } from 'date-fns';

const getMenu = async (token, username) => {
  let shouldGenerateMenu = false;

  try {
    const numberOfRecipes = await countRecipes(token, username);

    if (numberOfRecipes < 14)
      return `Du måste lägga in fler recept innan vi kan ge dig din meny. Just nu har du ${numberOfRecipes} av minimum 14 recept.`;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status != 200) throw new Error();

    const currentMenu = await response.json();

    if (!currentMenu.length) {
      shouldGenerateMenu = true;
    } else {
      //See if we should generate a menu for this week by checking for dates
      shouldGenerateMenu = currentMenu.some(
        recipe =>
          parseISO(recipe.date) < previousMonday(new Date()) ||
          isMonday(new Date())
      );
    }

    if (!shouldGenerateMenu) return currentMenu;

    const newMenu = await generateMenu(username, token, currentMenu);

    return newMenu;
  } catch (error) {
    console.log(error);
  }
};

const countRecipes = async (token, username) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/recipes/count?author.username=${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status != 200) throw new Error();

    const numberOfRecipes = await response.json();

    return numberOfRecipes;
  } catch (error) {
    console.log(error);
  }
};

const generateMenu = async (username, token, menu) => {
  const recipes = await getRecipes(username, token);
  const shuffeledRecipes = shuffleRecipes(recipes);
  let createdMenu = [];

  if (menu.length) {
    await deleteMenu(token, username);

    const recipesNotInMenu = shuffeledRecipes.filter(recipe => {
      menu.includes(!recipe.name);
    });

    createdMenu = await createMenu(token, recipesNotInMenu);
  } else {
    createdMenu = await createMenu(token, shuffeledRecipes);
  }

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

const deleteMenu = async (token, username) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menus?recipe.author.name=${username}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status != 200) throw new Error();

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const createMenu = async (token, recipesNotInMenu) => {
  const menuForSevenDays = recipesNotInMenu.slice(0, 7);
  let menu = [];
  let monday = new Date();

  if (!isMonday(new Date())) monday = previousMonday(new Date());

  //Post each item to Strapi along with a date starting on the last monday
  //..or today if it is a monday today.
  //Why in a for loop? Strapi does not support bulk POSTing
  for (let i = 0; i < menuForSevenDays.length; i++) {
    const date = addDays(monday, i);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: date.toUTCString(),
          recipe: menuForSevenDays[i],
        }),
      });

      if (response.status != 200) throw new Error();

      const data = await response.json();

      menu.push(data);
    } catch (error) {
      console.log(error);
    }
  }

  return menu;
};

export default getMenu;
