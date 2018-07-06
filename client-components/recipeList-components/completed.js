import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

import IP from '../../IP.js';
class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log(props.recipeIngredients);
  }
  removeIngredientsFromCart() {
    this.props.ingredients.forEach((ingredient) => {
      ingredient.quantity = -ingredient.quantity;
    })
    axios.post(`http://${IP}/api/groceryList`, {
      email: this.props.email,
      shouldReplace: false,
      ingredients: this.props.ingredients
    })
      .then(() => {
        // this.props.closeMissing();
        this.props.getUserGroceries();
      })
      .catch((err, a) => {
        console.log('ERROR converting units', err.response.request.response);
        Alert.alert('Invalid unit conversion', err.response.request.response);
      });
  }
  render() {
    console.log(`Render Complete`, this.props);
    return (
      <View>
        <Text>Remove following from your Pantry?</Text>
        {this.props.ingredients.map((item, i) =>
          <Text key={i}>{item.original}</Text>
        )}
        <View
          flexDirection='row'
        >
          <Button
            title="Yes"
            onPress={() => {
              console.log('Yes');
              this.removeIngredientsFromCart();
            }}
          />
          <Button
            title="No"
            buttonStyle={{
              backgroundColor: 'red'
            }}
            onPress={() => {
              console.log('No');
            }}
          />

        </View>
      </View>
    )
  }
}
export default Complete;