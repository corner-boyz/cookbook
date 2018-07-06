import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

import IP from '../../IP.js';
class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [
        {
          name: 'Count',
          abrv: null
        },
        {
          name: 'Teaspoon',
          abrv: 'tsp',
        },
        {
          name: 'Tablespoon',
          abrv: 'Tbs',
        },
        {
          name: 'Fluid ounce',
          abrv: 'fl-oz',
        },
        {
          name: 'Cup',
          abrv: 'cup',
        },
        {
          name: 'Pint',
          abrv: 'pnt',
        },
        {
          name: 'Quart',
          abrv: 'qt',
        },
        {
          name: 'Gallon',
          abrv: 'gal',
        },
        {
          name: 'Milliliter',
          abrv: 'ml',
        },
        {
          name: 'Liter',
          abrv: 'l',
        }, {
          name: 'Kiloliter',
          abrv: 'kl',
        },
        {
          name: 'Ounce',
          abrv: 'oz',
        },
        {
          name: 'Pound',
          abrv: 'lb',
        },
        {
          name: 'Gram',
          abrv: 'g',
        },
        {
          name: 'Kilogram',
          abrv: 'kg',
        }
      ],
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
    return (
      <ScrollView
        width={Dimensions.get('window').width / 1.2}
        alignSelf='center'
        flex={0.8}
        onLayout={() => { this.forceUpdate() }}
      >
        <Text
          style={{
            fontSize: 17
          }}
        >Remove following from your Pantry?</Text>
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
              backgroundColor: 'red',
            }}
            onPress={() => {
              console.log('No');
            }}
          />
        </View>
      </ScrollView>
    )
  }
}
export default Complete;