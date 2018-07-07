import React from 'react';
import { View, Text, ScrollView, Dimensions, Alert, TextInput, Picker } from 'react-native';
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
        alert('Ingredients removed from Pantry!')
      })
      .catch((err) => {
        console.log('ERROR converting units', err.response.request.response);
        Alert.alert('Invalid unit conversion', err.response.request.response);
      });
  }
  render() { //recipeIngredients
    return (
      <ScrollView
        width={Dimensions.get('window').width / 1.2}
        alignSelf='center'
        flex={0.8}
        onLayout={() => { this.forceUpdate() }}
      >
        <Text
          style={{
            fontSize: 17,
            paddingBottom: 10
          }}
        >Remove following from your Pantry?
        </Text>
        {this.props.recipeIngredients.map((item, i) =>
          <View
            flexDirection='row'
            key={i}
          >
            <TextInput
              placeholder={item.quantity}
              value={this.state.quantity}
              width={Dimensions.get('window').width / 10}
              onChangeText={(quantity) => {
                item.quantity = quantity
              }}
              paddingLeft={10}
            />
            <Picker
              selectedValue={item.unit}
              style={{
                height: 35,
                width: 100,
                backgroundColor: 'transparent',
              }}
              mode='dropdown'
              onValueChange={(itemValue) => {
                item.unit = itemValue
                this.forceUpdate();
              }}
            >
              {this.state.units.map((item, index) =>
                <Picker.Item
                  key={index}
                  label={item.name}
                  value={item.abrv}
                />
              )}
            </Picker>
            <TextInput
              width={Dimensions.get('window').width / 3}
              placeholder={item.ingredient}
              value={this.state.ingredient}
              onChangeText={(ingredient) => {
                item.ingredient = ingredient
              }}
              paddingLeft={10}
            />
          </View>
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
              backgroundColor: 'red',
            }}
            onPress={() => {
              this.props.closeCompleted();
            }}
          />
        </View>
      </ScrollView>
    )
  }
}
export default Complete;