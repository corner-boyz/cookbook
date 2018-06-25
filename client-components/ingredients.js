import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { parse } from 'recipe-ingredient-parser';

class Ingredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      text: ''
    }
  }

  addIngredient(){
    let newIngredients = this.state.ingredients.concat(parse(this.state.text));
    this.setState({
      ingredients: newIngredients,
      text: '',
    });
  }

  static navigationOptions = {
    tabBarColor: 'green',
    tabBarIcon: () => {

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name='ios-basket' size={25} color='white' />;
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Here are your Ingredients</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
            onPress={this.addIngredient}
            title="Add Ingredient"
            color="#841584"
            accessibilityLabel="Add Ingredient"
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Ingredients;