import React from 'react';
import Ingredients from './client-components/ingredients.js';
import Recipes from './client-components/recipes.js';
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

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: ['Salsa', 'Artichoke', 'Flour'],
      API: '',
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
    this.setState({
      API: IP,
    });

    fetch(`http://${IP}/api/ingredients`)
    .then(response => response.text().json())
    .then(results => {
      console.log(results);
      // this.setState({
      //   API: results.data,
      // });
    }).catch(error => {
      console.log('Error in retrieving ingredients:', error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to your CookBook, what would you like to do?</Text>
        <Button
          onPress={this.getIngredients}
          title="Test Server"
          color="#841584"
          accessibilityLabel="Test Server"
        />
        {this.state.ingredients.map((ingredient, index) => {
          return <Text key={index}>{ingredient}</Text>
        })}
        <Text>{this.state.API}</Text>
      </View>
    );
  };
}
//============================================================= Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC300',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//============================================================= Navigator
const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
    },
    Ingredients: {
      screen: Ingredients,
    },
    Recipes: {
      screen: Recipes,
    }

  },
  {
    initialRouteName: 'Home',
    // navigationOptions: {
    //   backgroundColor: '#f4511e'
    // },
    // headerTintColor: '#fff',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
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