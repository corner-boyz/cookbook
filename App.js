import React from 'react';
import Home from './client-components/home.js'
import Ingredients from './client-components/ingredients.js';
import RecipeList from './client-components/recipeList';
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
      screen: RecipeList,
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
      signUp: false,
    }
    this.getIngredients = this.getIngredients.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.switchToSignUp = this.switchToSignUp.bind(this);
  }
  //====================================================
  componentDidMount() {
    this.getIngredients();
  };

  getIngredients() {
    // Hardcoded pizza@pizza.com until username is stored
    axios.get(`http://${IP}/api/ingredients/pizza@pizza.com`)
      .then(results => {
        this.setState({
          ingredients: results.data,
        });
        // console.log(this.state.ingredients)
      }).catch(error => {
        console.log('Error in retrieving ingredients:', error);
      });
  }

  logIn() {
    this.setState({
      isLoggedIn: true
    })
  }

  logOut() {
    this.setState({
      isLoggedIn: false
    })
  }

  switchToSignUp() {
    this.setState({
      signUp: true
    })
  }
  //==================================================== screenProps is the global state property!
  render() {
    {
      if (this.state.signUp === true) {
        return <Signup />
      }
      if (this.state.isLoggedIn === false) {
        return <Login
          screenProps={{
            logIn: this.logIn,
            switchToSignUp: this.switchToSignUp,
          }} />
      }
      if (this.state.isLoggedIn === true) {
        return <Root
          screenProps={{
            ingredients: this.state.ingredients,
            text: '',
          }} />
      }

    }
  }
}

// open application 'Nox'
// npm start

//npm run server
