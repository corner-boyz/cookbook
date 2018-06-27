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
      isLoggedIn: false,
      signUp: false,
      email: '',
    }
    this.getIngredients = this.getIngredients.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.switchToSignUp = this.switchToSignUp.bind(this);
    this.switchToLogin = this.switchToLogin.bind(this);
  }
  //====================================================
  componentDidMount() {
  };

  getIngredients() {
    console.log('Testing: ', this.state.email);
    axios.get(`http://${IP}/api/ingredients/${this.state.email}`)
      .then(results => {
        this.setState({
          ingredients: results.data,
        });
      }).catch(error => {
        console.log('Error in retrieving ingredients:', error);
      });
  }

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
            text: '',
          }} />
      }

    }
  }
}

// open application 'Nox'
// npm start

//npm run server

