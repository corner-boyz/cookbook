import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

import IP from '../../IP.js';
class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  removeIngredientsFromPantry() {
    let negativeRecipeIngredients = [];
    this.props.recipeIngredients.forEach((ingredient) => {
      let negativeIngredient = {
        ingredient: ingredient.ingredient,
        quantity: -ingredient.quantity,
        unit: ingredient.unit
      };
      negativeRecipeIngredients.push(negativeIngredient);
    });
    axios.post(`http://${IP}/api/ingredients`, {
      email: this.props.email,
      shouldReplace: false,
      ingredients: negativeRecipeIngredients
    })
      .then(() => {
        this.props.closeCompleted();
        this.props.getIngredients().then(() => {
          this.props.searchRecipes();
        });
      })
      .catch((err) => {
        console.log('ERROR converting units', err.response.request.response);
        Alert.alert('Invalid unit conversion', err.response.request.response);
      });
  }
  render() {
    console.log(`Render Complete`, this.props);
    return (
      <View>
        <Text>Remove following from your Pantry?</Text>
        {this.props.recipeIngredients.map((item, i) =>
          <Text key={i}>{item.quantity}{item.unit} {item.ingredient}</Text>
        )}
        <View
          flexDirection='row'
        >
          <Button
            title="Yes"
            onPress={() => {
              console.log('Yes');
              this.removeIngredientsFromPantry();
            }}
          />
          <Button
            title="No"
            buttonStyle={{
              backgroundColor: 'red'
            }}
            onPress={() => {
              this.props.closeMissing();
            }}
          />

        </View>
      </View>
    )
  }
}
export default Complete;