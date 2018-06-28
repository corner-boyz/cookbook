import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import axios from 'axios';

import Home from './client-components/home.js'
import Ingredients from './client-components/ingredients.js';
import RecipeList from './client-components/recipeList';
import Signup from './client-components/signup.js';
import Login from './client-components/login.js';

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
    }
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
      // isLoggedIn: false,
      isLoggedIn: true, //uncomment for debugging
      signUp: false,
      // email: '',
      email: 'a@a.com', //uncomment for debugging
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
    // console.log('App Mounted');
    this.getIngredients(); //uncomment for debugging
  };
  //====================================================
  getIngredients() {
    // axios.get(`http://${IP}/api/ingredients/${this.state.email}`)
    axios.get(`http://${IP}/api/ingredients/a@a.com`) //uncomment for debugging
      .then(results => {
        this.setState({
          ingredients: results.data,
          recipes: undefined
        });
      }).catch(error => {
        console.log('Error in retrieving ingredients:', error);
      });
  }

  searchRecipes() {
    axios.post(`http://${IP}/api/recipelist`, this.state.ingredients).then((results) => {
      this.setState({
        recipes: results.data
      });
    });
  }
  //====================================================
  logIn(email) {
    this.setState({
      isLoggedIn: true,
      email: email
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
            email: this.state.email
          }} />
      }
      if (this.state.isLoggedIn === true) {
        return <Root
          screenProps={{
            ingredients: this.state.ingredients,
            getIngredients: this.getIngredients,
            recipes: this.state.recipes,
            searchRecipes: this.searchRecipes,
            text: '',
            email: this.state.email,
          }} />
      }

    }
  }
}

// open application 'Nox'
// npm start

//npm run server

