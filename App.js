import React from 'react';
import Home from './client-components/home.js'
import Ingredients from './client-components/ingredients.js';
import Recipes from './client-components/recipes.js';
import Signup from './client-components/signup.js';
import Login from './client-components/login.js';

import axios from 'axios';
import IP from './IP.js';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
//==================================================== this is the navigation bar at the bottom of the screen
const Root = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
    },
    Pantry: {
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
//==================================================== this is the top level parent component, it contains the states that are passed around
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      text: '',
      isLoggedIn: false,
    }
    this.getIngredients = this.getIngredients.bind(this);
  }
//====================================================
  componentDidMount() {
    this.getIngredients();
  };

  getIngredients() {
    axios.get(`http://${IP}/api/ingredients`)
      .then(results => {
        this.setState({
          ingredients: results.data,
        });
      }).catch(error => {
        console.log('Error in retrieving ingredients:', error);
      });
  }
//==================================================== screenProps is the global state property!
  render() {
    let mainView = this.state.isLoggedIn ? 
    <Root screenProps={{
      ingredients: this.state.ingredients,
      text: '',
    }} />
    : <Login/>;
    return mainView;
  }
}

// open application 'Nox'
// npm start

//npm run server
