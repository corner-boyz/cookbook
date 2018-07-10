import React from 'react';
import { AsyncStorage, Alert } from "react-native";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import axios from 'axios';

import Home from './client-components/home.js'
import Ingredients from './client-components/ingredients.js';
import RecipeList from './client-components/recipeList';
import GroceryList from './client-components/groceryList';
import LandingPage from './client-components/landingPage.js';

import IP from './IP.js';
//==================================================== this is the navigation bar at the bottom of the screen
const Root = createMaterialBottomTabNavigator(
  {
    "Home": {
      screen: Home,
    },
    "Grocery List": {
      screen: GroceryList,
    },
    "Pantry": {
      screen: Ingredients,
    },
    "Recipes": {
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
      recipeListIndex: 0,
      ingredients: [],
      text: '',
      signUp: false,
      name: '',
      userRecipes: [],
      userExtensionRecipes: [],
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
    this.getUserExtensionRecipes = this.getUserExtensionRecipes.bind(this);
    this.getUserGroceries = this.getUserGroceries.bind(this);
  }
  //====================================================
  componentDidMount() {
    this.retrieveLogin().then(() => {
      if (this.state.isLoggedIn) {
        this.retrieveIngredients();
        this.getIngredients();
        this.retrieveUserRecipes();
        this.getUserRecipes();
        this.retrieveUserGroceries();
        this.getUserGroceries();
      }
    });
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

  removeFood = async () => {
    const foodKeys = ['cbIngredients', 'cbUserGroceries', 'cbUserRecipes', 'cbUserExtensionRecipes'];
    AsyncStorage.multiRemove(foodKeys, (err) => {
      if (err) {
        console.error('ERROR removing ingredient keys', err);
      }
    });
  }

  retrieveIngredients = async () => {
    return await AsyncStorage.getItem('cbIngredients').then((ingredients) => {
      if (ingredients) {
        this.setState({ ingredients: JSON.parse(ingredients) });
      }
    });
  }

  retrieveUserGroceries = async () => {
    return await AsyncStorage.getItem('cbUserGroceries').then((groceryList) => {
      if (groceryList) {
        this.setState({ userGroceries: JSON.parse(groceryList) });
      }
    });
  }

  retrieveUserRecipes = async () => {
    return await AsyncStorage.getItem('cbUserRecipes').then((recipes) => {
      if (recipes) {
        this.setState({ userRecipes: JSON.parse(recipes) });
      }
      return recipes;
    }).then(() => {
      this.retrieveUserExtensionRecipes();
    });
  }

  retrieveUserExtensionRecipes = async () => {
    return await AsyncStorage.getItem('cbUserExtensionRecipes').then((recipes) => {
      if (recipes) {
        this.setState({ userExtensionRecipes: JSON.parse(recipes) });
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
        AsyncStorage.setItem('cbIngredients', JSON.stringify(results.data));
        return results;
      }).catch((err) => {
        console.log('ERROR in retrieving ingredients:', err);
        if (err.request._hasError || err.response.request.status === 404) {
          Alert.alert('Trouble connecting to server', 'Please try again later');
        }
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
      console.log('ERROR in searching recipes', err);
      if (err.response && err.response.request.status === 404) {
        Alert.alert('Trouble connecting to recipe database', 'Please try again later')
      }
      if (err.request._hasError) {
        Alert.alert('Trouble connecting to server', 'Please try again later');
      }
    });
  }

  getUserRecipes() {
    return axios.get(`http://${IP}/api/userrecipes/${this.state.email}`)
      .then((response) => {
        this.setState({
          userRecipes: response.data,
        });
        AsyncStorage.setItem('cbUserRecipes', JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log("ERROR getting user's recipes", err);
      });
  }

  getUserExtensionRecipes() {
    return axios.get(`http://${IP}/api/userextensionrecipes/${this.state.email}`)
      .then((response) => {
        this.setState({
          userExtensionRecipes: response.data,
        });
        AsyncStorage.setItem('cbUserExtensionRecipes', JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log("ERROR getting user's extension recipes", err);
      });
  }

  getUserGroceries() {
    return axios.get(`http://${IP}/api/grocerylist/${this.state.email}`, {})
      .then((response) => {
        this.setState({
          userGroceries: response.data
        });
        AsyncStorage.setItem('cbUserGroceries', JSON.stringify(response.data));
      })
      .then(() => {
        this.getUserExtensionRecipes();
      })
      .catch((err) => {
        console.log("ERROR getting user's recipes", err);
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
    this.getUserGroceries();
    this.getUserRecipes();
  }

  logOut() {
    this.setState({
      isLoggedIn: false,
      email: '',
      name: ''
    });
    this.removeLogin();
    this.removeFood();
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
      if (this.state.isLoggedIn === false) {
        return <LandingPage logIn={this.logIn} />
      }
      if (this.state.isLoggedIn === true) {
        return <Root
          screenProps={{
            logOut: this.logOut,
            recipeListIndex: this.state.recipeListIndex,
            ingredients: this.state.ingredients,
            getIngredients: this.getIngredients,
            recipes: this.state.recipes,
            userRecipes: this.state.userRecipes,
            userExtensionRecipes: this.state.userExtensionRecipes,
            getUserRecipes: this.getUserRecipes,
            getUserExtensionRecipes: this.getUserExtensionRecipes,
            userGroceries: this.state.userGroceries,
            getUserGroceries: this.getUserGroceries,
            searchRecipes: this.searchRecipes,
            text: '',
            email: this.state.email,
            name: this.state.name
          }} />
      }
    }
  }
}
//npm start
//npm run server
//npm run build 