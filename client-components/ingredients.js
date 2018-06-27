import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Picker,
} from 'react-native';

import IP from '../IP.js'
import { List, ListItem } from 'react-native-elements';
import axios from 'axios'

import Ionicons from 'react-native-vector-icons/Ionicons';
//==================================================== 'index' state is required for refreshing the ingredient's list; <FlatList /> is a pure component so it will not auto refresh normally
class Ingredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      numbers: [0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        73,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        82,
        83,
        84,
        85,
        86,
        87,
        88,
        89,
        90,
        91,
        92,
        93,
        94,
        95,
        96,
        97,
        98,
        99],
      quantity: 0,
      units: [
        {
          name: 'unit',
          abrv: null
        },
        {
          name: 'tablespoon',
          abrv: 'tsp',
        },
        {
          name: 'fluid ounce',
          abrv: 'fl-oz',
        },
        {
          name: 'cup',
          abrv: 'cup',
        },
        {
          name: 'pint',
          abrv: 'pnt',
        },
        {
          name: 'quart',
          abrv: 'qt',
        },
        {
          name: 'gallon',
          abrv: 'gal',
        },
        {
          name: 'ounce',
          abrv: 'oz',
        },
        {
          name: 'pound',
          abrv: 'lb',
        },
        {
          name: 'liter',
          abrv: 'l',
        }
      ],
      selectedUnit: '',
      name: ''
    }

  }
  //==================================================== NavBar component
  static navigationOptions = {
    tabBarColor: 'green',
    tabBarIcon: () => {
      return <Ionicons name='ios-basket' size={25} color='white' />;
    },
  }
  //====================================================
  componentDidMount() {
  }

  submitIngredient() {
    // console.log('Submitting new Ingredient...')
    let newIngredient = {
      email: this.props.screenProps.email,
      shouldReplace: false,
      ingredients: [
        {
          ingredient: this.state.name,
          quantity: this.state.quantity,
          unit: this.state.selectedUnit
        }
      ]
    };
    console.log(newIngredient);

    axios.post(`http://${IP}/api/ingredients`, newIngredient)
      .then((response) => {
        console.log(response.data);
        this.props.screenProps.getIngredients();
        this.setState({
          index: this.state.index + 1
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  //====================================================
  render() {
    return (
      <View style={styles.container}>
        <Text>Here are your Ingredients:</Text>
        <FlatList
          style={styles.list}
          data={this.props.screenProps.ingredients}
          extraData={this.state.index}
          renderItem={
            ({ item }) =>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text
                  style={{ flex: 1, flexDirection: 'row', backgroundColor: 'yellow' }}
                >{item.quantity}{item.unit}</Text>
                <Text
                  style={{ flex: 1, flexDirection: 'row', backgroundColor: 'gold' }}
                >{item.ingredient}</Text>
              </View>
          }
          keyExtractor={(item, index) => item.ingredient}
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Picker
            selectedValue={this.state.quantity}
            style={{
              height: 40,
              width: 50,
              backgroundColor: 'gray'
            }}
            mode='dropdown'
            onValueChange={(itemValue, itemIndex) => this.setState({ quantity: itemValue })}>
            {this.state.numbers.map((item, index) =>
              <Picker.Item
                key={index}
                label={item.toString()}
                value={item}
              />
            )}

          </Picker>
          <Picker
            selectedValue={this.state.selectedUnit}
            style={{
              height: 40,
              width: 50,
              backgroundColor: 'lightgray'
            }}
            mode='dropdown'
            onValueChange={(itemValue, itemIndex) => this.setState({ selectedUnit: itemValue })}>
            {this.state.units.map((item, index) =>
              <Picker.Item
                key={index}
                label={item.name}
                value={item.abrv}
              />
            )}
          </Picker>
          <TextInput
            style={{
              height: 40,
              width: 200
            }}
            placeholder='Add an Ingredient'
            onChangeText={(text) => {
              this.setState({ name: text })
            }
            }
          />
          <Button
            title="Add"
            onPress={() => {
              this.submitIngredient();
            }}
          />
        </View>
      </View>
    )
  }
}
//==================================================== 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  list: {
    width: 350,
    backgroundColor: 'white'
    // justifyContent: 'center',
  }
});

export default Ingredients;