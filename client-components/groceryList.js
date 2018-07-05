import React from 'react';
import axios from 'axios';
import IP from '../IP.js';
import GroceryListEntry from './groceryList-components/groceryListEntry.js'
import GroceryEditor from './groceryList-components/groceryEditor.js'
import GroceryListAdder from './groceryList-components/groceryListAdder.js'

import { Text, View, Animated, FlatList, Modal, Dimensions, KeyboardAvoidingView, Alert, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';

import { styles } from '../styles.js';

import Ionicons from 'react-native-vector-icons/Ionicons';
//====================================================
class GroceryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      index: 0,
      showAdd: false,
      ingredient: '',
      unit: '',
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
          name: 'Liter',
          abrv: 'l',
        },{
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
      quantity: '',
      editMode: false,
    };
    this.addToCart = this.addToCart.bind(this);
    this.purchaseIngredients = this.purchaseIngredients.bind(this);
    this.editIngredients = this.editIngredients.bind(this);
    this.deleteIngredients = this.deleteIngredients.bind(this);
    this.saveCheckboxes = this.saveCheckboxes.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }
  //====================================================
  static navigationOptions = {
    tabBarColor: 'dodgerblue',
    tabBarIcon: () => {
      return <Ionicons name='ios-cart' size={25} color='white' />;
    },
  }
  //====================================================
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 1000 }).start();
  }

  purchaseIngredients() {
    let purchased = {
      email: this.props.screenProps.email,
      shouldReplace: true,
      ingredients: this.props.screenProps.userGroceries
    };
    console.log(purchased);
    axios.post(`http://${IP}/api/grocerylistintopantry`, purchased)
      .then((response) => {
        this.props.screenProps.getIngredients();
        this.props.screenProps.getUserGroceries();
      })
      .catch((err) => {
        console.log('ERROR converting units', err.response.request.response);
        Alert.alert('Invalid unit conversion', err.response.request.response);
      })
  }

  editIngredients() {
    let edited = {
      email: this.props.screenProps.email,
      shouldReplace: true,
      ingredients: this.props.screenProps.userGroceries,
    }
    axios.post(`http://${IP}/api/grocerylist`, edited)
      .then((response) => {
        this.props.screenProps.getIngredients();
        this.props.screenProps.getUserGroceries();
      })
  }

  deleteIngredients() {
    console.log(this.props.screenProps.userGroceries);
    let temp = this.props.screenProps.userGroceries;
    temp.map((item) => {
      if (item.ispurchased === true) {
        item.quantity = 0;
      }
    })
    let deleted = {
      email: this.props.screenProps.email,
      shouldReplace: true,
      ingredients: temp
    };
    console.log(deleted);
    axios.post(`http://${IP}/api/grocerylist`, deleted)
      .then((response) => {
        this.props.screenProps.getIngredients();
        this.props.screenProps.getUserGroceries();
      })
  }

  saveCheckboxes() {
    let purchased = {
      email: this.props.screenProps.email,
      shouldReplace: true,
      ingredients: this.props.screenProps.userGroceries
    };
    console.log(purchased);
    axios.post(`http://${IP}/api/grocerylistcheckboxes`, purchased)
      .then((response) => {
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addToCart(newIngredient) {
    const ingArr = [newIngredient]
    axios.post(`http://${IP}/api/parse`, { ingredients: ingArr })
      .then((response) => {
        response.data[0].ispurchased = false
        axios.post(`http://${IP}/api/groceryList`, {
          email: this.props.screenProps.email,
          shouldReplace: false,
          ingredients: [response.data[0]]
        })
          .then(() => {
            this.props.screenProps.getUserGroceries();
          })
          .catch((err, a) => {
            console.log('ERROR converting units', err.response.request.response);
            Alert.alert('Invalid unit conversion', err.response.request.response);
          })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  removeFromCart(ingredient) {
    ingredient.quantity = 0
    const obj = {
      email: this.props.screenProps.email,
      shouldReplace: true,
      ingredients: [ingredient]
    }
    axios.post(`http://${IP}/api/grocerylist`, obj)
      .then(() => {
        this.props.screenProps.getUserGroceries();
      })
      .catch((error) => {
        console.log(error);
      })
  }
  //====================================================
  render() {
    return (
      <ImageBackground
        style={[styles.container, {
          backgroundColor: 'white',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          justifyContent: 'center'
        }]}
        source={require('../media/grocery.jpg')}
        blurRadius={1}
      >
        <Animated.View style={{ ...this.props.style, opacity: this.state.fadeAnim }}>
          <Text onLongPress={() => { this.setState({ editMode: true }) }} style={{ fontSize: 18 }}>Here is your Grocery List</Text>
          <FlatList
            style={[styles.list, { width: 350 }]}
            data={this.props.screenProps.userGroceries}
            // extraData={this.state.index}
            renderItem={({ item, index }) => <GroceryListEntry item={item} index={index} editIngredients={this.editIngredients} removeFromCart={this.removeFromCart} closeAdd={this.closeAdd} saveCheckboxes={this.saveCheckboxes} />}
            keyExtractor={(item) => item.ingredient}
          />
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} enabled>

            <GroceryListAdder addToCart={this.addToCart} purchaseIngredients={this.purchaseIngredients} deleteIngredients={this.deleteIngredients} />
          </KeyboardAvoidingView>
        </Animated.View>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.editMode}
          onRequestClose={() => {
            this.setState({
              editMode: false
            })
          }}>
          <View style={[styles.container, { backgroundColor: 'white', }]}>
            <Text style={{ fontSize: 17 }}>Editing Mode</Text>
            <FlatList
              style={[styles.list, { width: 350 }]}
              data={this.props.screenProps.userGroceries}
              extraData={this.state.index}
              renderItem={({ item }) => <GroceryEditor item={item} units={this.state.units} />}
              keyExtractor={(item) => item.ingredient}
            />
            <Button
              title='Confirm'
              backgroundColor='limegreen'
              rounded={true}
              onPress={() => {
                this.editIngredients();
                this.setState({
                  editMode: false,
                })
              }} />
          </View>
        </Modal>
      </ImageBackground>
    )
  }
}
export default GroceryList;