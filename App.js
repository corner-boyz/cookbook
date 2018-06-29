import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import axios from 'axios';

import Home from './client-components/home.js'
import Ingredients from './client-components/ingredients.js';
import RecipeList from './client-components/recipeList';
import Signup from './client-components/auth.js/signup';
import Login from './client-components/auth.js/login';
import Debug from './client-components/debug.js';

import IP from './IP.js';
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
    // Debug: {
    //   screen: Debug,
    // }
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
      recipeListIndex: 0,
      ingredients: [],
      text: '',
      signUp: false,
      name: '',
      isLoggedIn: false,
      email: '',
      // isLoggedIn: true, //uncomment for development
      // email: 'a@a.com', //uncomment for development
      // name: 'a'         //uncomment for development
    }
    this.getIngredients = this.getIngredients.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.switchToSignUp = this.switchToSignUp.bind(this);
    this.switchToLogin = this.switchToLogin.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);
  }
  //====================================================
  componentDidMount() {
    // this.getIngredients(); //uncomment for development
  };
  //====================================================
  getIngredients() {
    return axios.get(`http://${IP}/api/ingredients/${this.state.email}`)
      .then((results) => {
        this.setState({
          ingredients: results.data,
          recipes: undefined
        });
        return results;
      }).catch((err) => {
        console.error('ERROR in retrieving ingredients:', err);
      });
  }

  searchRecipes(ingredients = this.state.ingredients) {
    this.setState({
      recipeListIndex: this.state.recipeListIndex + 1
    });
    return axios.post(`http://${IP}/api/recipelist`, ingredients).then((results) => {
      this.setState({
        recipes: results.data
      });
      return results.data;
    }).catch((err) => {
      console.error('ERROR in searching recipes', err);
    });;
  }
  //====================================================
  logIn(email, name) {
    this.setState({
      isLoggedIn: true,
      email: email,
      name: name
    })
    this.getIngredients();
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
  switchToLogin() {
    this.setState({
      signUp: false
    })
  }
  //==================================================== screenProps is the global state property!
  render() {
    {
      if (this.state.signUp === true) {
        return <Signup
          screenProps={{
            switchToLogin: this.switchToLogin
          }}
        />
      }
      if (this.state.isLoggedIn === false) {
        return <Login
          screenProps={{
            logIn: this.logIn,
            switchToSignUp: this.switchToSignUp,
            // email: this.state.email
          }} />
      }
      if (this.state.isLoggedIn === true) {
        return <Root
          screenProps={{
            recipeListIndex: this.state.recipeListIndex,
            ingredients: this.state.ingredients,
            getIngredients: this.getIngredients,
            recipes: this.state.recipes,
            searchRecipes: this.searchRecipes,
            text: '',
            email: this.state.email,
            name: this.state.name
          }} />
      }
    }
  }
}

// open application 'Nox'
// npm start

//npm run server

