import React from 'react';
import { View, Text, ScrollView, Dimensions, Alert, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

import IP from '../../IP.js';
class AddMissing extends React.Component {
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
      quantity: this.props.missing.quantity,
      ingredient: this.props.missing.ingredient
    };
  }
  addMissingToCart() {
    axios.post(`http://${IP}/api/groceryList`, {
      email: this.props.email,
      shouldReplace: false,
      ingredients: this.props.missing
    })
      .then(() => {
        this.props.closeMissing();
        this.props.getUserGroceries();
        alert('Ingredients added your Grocery List!')
      })
      .catch((err) => {
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
            fontSize: 17,
            paddingBottom: 10
          }}
        >You are missing the following from your pantry.
          </Text>
        {this.props.missing.map((item, i) =>
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
            title="Add to Grocery List"
            onPress={() => {
              this.addMissingToCart();
            }}
          />
          <Button
            title="Go Back"
            buttonStyle={{
              backgroundColor: 'red'
            }}
            onPress={() => {
              this.props.closeMissing();
            }}
          />
        </View>
      </ScrollView>
    )
  }
}
export default AddMissing;