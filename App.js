import React from 'react';
import Ingredients from './client-components/ingredients.js';
import Recipes from './client-components/recipes.js';
import Debugger from './client-components/debugging';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
} from 'react-native';

import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import IP from './client-components/IP.js';
import axios from 'axios';

import {
  createMaterialBottomTabNavigator
} from 'react-navigation-material-bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      text: ''
    }

    this.getIngredients = this.getIngredients.bind(this);
  }
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerTitle: "CookBook",
  //     headerRight: <Image
  //       source={require('./hat.png')}
  //       style={{ width: 35, height: 30 }}
  //     />
  //   }
  // }
  getIngredients() {
    axios.get(`http://${IP}/api/ingredients`)
    .then(results => {
      //console.log(results.data);
      this.setState({
        ingredients: results.data,
      });
    }).catch(error => {
      console.log('Error in retrieving ingredients:', error);
    });
  }

  static navigationOptions = {
    tabBarColor: 'red',
    tabBarIcon: () => {

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name='ios-home' size={25} color='white' />;
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to your CookBook, what would you like to do? IP: {IP}</Text>
        <Button
          onPress={this.getIngredients}
          title="Test Server"
          color="#841584"
          accessibilityLabel="Test Server"
        />
        {this.state.ingredients.map((ingredient, index) => {
          return <Text key={index}>{ingredient}</Text>
        })}
      </View>
    );
  };
}
//============================================================= Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//============================================================= Navigator
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
    // Debugger: {
    //   screen: Debugger,
    // }

  },
  {
    initialRouteName: 'Home',
    shifting: true,
    // barStyle: { backgroundColor: 'red' },
    navigationOptions: {

    }
  }
)
//=============================================================
// export default App;
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
// open application 'Nox'
// exp start
// npm start