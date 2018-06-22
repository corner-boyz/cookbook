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
  createStackNavigator
} from 'react-navigation'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to your CookBook, what would you like to do?</Text>
        <Button
          title="Go to your pantry"
          onPress={() => this.props.navigation.navigate('Ingredients', {})}
        />
        <Button
          title="Go to your recipes"
          onPress={() => this.props.navigation.navigate('Recipes', {})}
        />
      </View>
    );
  };
}
//============================================================= Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//============================================================= Navigator
const RootStack = createStackNavigator(
  {
    Home: Home,
    Ingredients: Ingredients,
    Recipes: Recipes

  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
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