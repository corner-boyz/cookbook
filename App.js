import React from 'react';
import Home from './client-components/home.js'
import Ingredients from './client-components/ingredients.js';
import Recipes from './client-components/recipes.js';

import {
  createMaterialBottomTabNavigator
} from 'react-navigation-material-bottom-tabs';

const RootStack = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
    },
    Ingredients: {
      screen: Ingredients,
    },
    Recipes: {
      screen: Recipes,
    },
  },
  {
    initialRouteName: 'Home',
    shifting: true,
  }
)
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
// open application 'Nox'
// exp start
// npm start