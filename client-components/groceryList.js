import React from 'react';
import axios from 'axios';
import IP from '../IP.js';
import GroceryListEntry from './groceryList-components/groceryListEntry.js'
import GroceryListAdder from './groceryList-components/groceryListAdder.js'
import { Text, View, Animated, FlatList, Modal, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';

import { styles } from '../styles.js';

import Ionicons from 'react-native-vector-icons/Ionicons';
//====================================================
class GroceryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      showAdd: false,
      ingredient: '',
      unit: '',
      quantity: '',
    };
    this.addToCart = this.addToCart.bind(this);
    this.closeAdd = this.closeAdd.bind(this);
    this.purchaseIngredients = this.purchaseIngredients.bind(this);
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
    Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 3500 }).start();
  }

  closeAdd() {
    this.setState({
      showAdd: false
    })
  }

  purchaseIngredients() {
    let purchased = {
      email: this.props.screenProps.email,
      shouldReplace: true,
      ingredients: this.props.screenProps.userGroceries
    };
    console.log(purchased);
    axios.post(`http://${IP}/api/grocerylist`, purchased)
      .then((response) => {
        this.props.screenProps.getIngredients();
        this.props.screenProps.getUserGroceries();
      })
      .catch((err) => {
        console.error(err);
      })
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
          .catch((err) => {
            console.error(err);
          })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  removeFromCart(ingredient) {
    ingredient.quantity = 0
    // console.log('Testing:', ingredient);
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
      <View style={[styles.container, { backgroundColor: 'white', }]}>
        <Animated.View style={{ ...this.props.style, opacity: this.state.fadeAnim }}>
          <Text style={{ fontSize: 18 }}>Here is your Grocery List</Text>
          <FlatList
            style={[styles.list, { width: 350 }]}
            data={this.props.screenProps.userGroceries}
            // extraData={this.state.index}
            renderItem={({ item, index }) => <GroceryListEntry item={item} index={index} editIngredients={this.editIngredients} removeFromCart={this.removeFromCart} closeAdd={this.closeAdd} />}
            keyExtractor={(item) => item.ingredient}
          />
          {/* <Button
            title='Selected to cart'
            rounded={true}
            backgroundColor='orange'
            onPress={() => {
              this.purchaseIngredients();
            }}
          /> */}
          <KeyboardAvoidingView behavior="padding" enabled>
            <GroceryListAdder addToCart={this.addToCart} closeAdd={this.closeAdd} purchaseIngredients={this.purchaseIngredients}/>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    )
  }
}
export default GroceryList;