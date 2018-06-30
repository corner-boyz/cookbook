import React from 'react';
import { AsyncStorage } from "react-native";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import axios from 'axios';

import Home from './client-components/home.js'
import Ingredients from './client-components/ingredients.js';
import RecipeList from './client-components/recipeList';
import GroceryList from './client-components/groceryList';
import Signup from './client-components/auth-components/signup';
import Login from './client-components/auth-components/login';
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
    GroceryList: {
      screen: GroceryList,
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
      recipeListIndex: 0,
      ingredients: [],
      text: '',
      signUp: false,
      name: '',
      userRecipes: [],
      userGroceries: [],
      //Initially set to true so doesn't render login page briefly when stored logged in is true
      //If stored logged in is false it will still redirect to login page
      isLoggedIn: true,
      email: ''
    }
    this.getIngredients = this.getIngredients.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.switchToSignUp = this.switchToSignUp.bind(this);
    this.switchToLogin = this.switchToLogin.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);
    this.getUserRecipes = this.getUserRecipes.bind(this);
  }
  //====================================================
  componentDidMount() {
    this.retrieveLogin().then(() => {
      if (this.state.isLoggedIn) {
        this.getIngredients();
      }
    });
    setTimeout(() => {
      this.getUserRecipes();
      this.getUserGroceries();
    }, 3000)
  };
  //AsyncStorage====================================================
  storeLogin = async (email, name) => {
    const loginKeyValuePairs = [
      ['cbIsLoggedIn', 'true'],
      ['cbEmail', email],
      ['cbName', name]
    ];
    await AsyncStorage.multiSet(loginKeyValuePairs);
  }

  removeLogin = async () => {
    const loginKeys = ['cbIsLoggedIn', 'cbEmail', 'cbName'];
    AsyncStorage.multiRemove(loginKeys, (err) => {
      if (err) {
        console.error('ERROR removing login', err);
      }
    });
  }

  retrieveLogin = async () => {
    const loginKeys = ['cbIsLoggedIn', 'cbEmail', 'cbName'];
    return await AsyncStorage.multiGet(loginKeys).then((keyValues) => {
      keyValues.forEach((keyValue) => {
        if (keyValue[0] === 'cbIsLoggedIn') {
          this.setState({ isLoggedIn: keyValue[1] === 'true' });
        }
        if (keyValue[0] === 'cbEmail') {
          this.setState({ email: keyValue[1] });
        }
        if (keyValue[0] === 'cbName') {
          this.setState({ name: keyValue[1] });
        }
      })
    });
  }
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
    });
  }

  getUserRecipes() {
    // console.log('Firing');
    return axios.get(`http://${IP}/api/userRecipes/${this.state.email}`, {})
      .then((response) => {
        this.setState({
          userRecipes: response.data,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUserGroceries() {
    return axios.get(`http://${IP}/api/grocerylist/${this.state.email}`, {})
      .then((response) => {
        this.setState({
          userGroceries: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //====================================================
  logIn(email, name) {
    this.setState({
      isLoggedIn: true,
      email: email,
      name: name
    });
    this.storeLogin(email, name);
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
            userRecipes: this.state.userRecipes,
            getUserRecipes: this.getUserRecipes,
            userGroceries: this.state.userGroceries,
            getUserGroceries: this.state.getUserGroceries,
            searchRecipes: this.searchRecipes,
            text: '',
            email: this.state.email,
            name: this.state.name
          }} />
      }
    }
  }
}