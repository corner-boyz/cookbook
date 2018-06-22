import React from 'react';
import Ingredients from './client-components/ingredients.js'
import Recipes from './client-components/recipes.js'
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
} from 'react-navigation'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
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

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to your CookBook, what would you like to do?</Text>
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