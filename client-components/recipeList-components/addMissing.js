import React from 'react';
import { View, Text, ScrollView, Dimensions, TextInput, Picker, ImageBackground, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import axios from 'axios';

import IP from '../../IP.js';

import { styles } from '../../styles.js'
//====================================================
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
      ingredient: this.props.missing.ingredient,
      missingIngredients: this.props.missing
    };
  }
  //====================================================
  addMissingToCart() {
    axios.post(`http://${IP}/api/groceryList`, {
      email: this.props.email,
      shouldReplace: false,
      ingredients: this.state.missingIngredients
    })
      .then(() => {
        this.props.closeMissing();
        this.props.getUserGroceries();
        Alert.alert('Success!', 'Ingredients added your Grocery List!');
      })
      .catch((err) => {
        console.log('ERROR converting units', err.response.request.response);
        Alert.alert('Invalid unit conversion', err.response.request.response);
      });
  }

  removeIngredientFromArray(index) {
    let filteredMissingIngredients = this.state.missingIngredients.filter((item, i) => {
      return !(i === index);
    });
    this.setState({
      missingIngredients: filteredMissingIngredients
    });
  }
  //====================================================
  render() {
    return (
      <ImageBackground
        style={[styles.container, {
        }]}
        source={require('../../media/4.jpg')}
        blurRadius={0}
        onLayout={() => {
          this.forceUpdate();
        }}
      >
        <ScrollView
          width={Dimensions.get('window').width / 1.2}
          alignSelf='center'
          flex={0.8}
          onLayout={() => { this.forceUpdate() }}
        >
          <Text
            style={{
              fontSize: 22,
              paddingBottom: 10
            }}
          >You are missing the following from your pantry.
          </Text>
          {this.state.missingIngredients.map((item, i) =>
            <Swipeout key={i+item.ingredient}
              right={[{text: 'Remove', type: 'delete', onPress: () => {this.removeIngredientFromArray(i)}}]} 
              backgroundColor='transparent'>
              <View
                flexDirection='row'
              >
                <TextInput
                  placeholder={item.quantity}
                  value={this.state.quantity}
                  width={Dimensions.get('window').width / 10}
                  onChangeText={(quantity) => {
                    item.quantity = quantity
                  }}
                  paddingLeft={10}
                  placeholderTextColor='black'
                />
                <Picker
                  selectedValue={item.unit}
                  style={{
                    height: 45,
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
                  placeholderTextColor='black'
                />
              </View>
            </Swipeout>
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
      </ImageBackground>
    )
  }
}
export default AddMissing;