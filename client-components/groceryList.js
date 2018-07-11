import React from 'react';
import axios from 'axios';

import IP from '../IP.js';
import GroceryListEntry from './groceryList-components/groceryListEntry.js'
import GroceryEditor from './groceryList-components/groceryEditor.js'
import GroceryListAdder from './groceryList-components/groceryListAdder.js'

import { Text, View, Animated, FlatList, Modal, Dimensions, KeyboardAvoidingView, Alert, ImageBackground, RefreshControl } from 'react-native';
import { Button, Icon } from 'react-native-elements';

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
      quantity: '',
      editMode: false,
      refreshing: false,
      groceryCopy: []
    };
    this.addToCart = this.addToCart.bind(this);
    this.purchaseIngredients = this.purchaseIngredients.bind(this);
    this.editIngredients = this.editIngredients.bind(this);
    this.deleteIngredients = this.deleteIngredients.bind(this);
    this.saveCheckboxes = this.saveCheckboxes.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.editMode = this.editMode.bind(this)
  }
  //====================================================
  static navigationOptions = {
    tabBarColor: 'deepskyblue',
    tabBarIcon: () => {
      return <Ionicons name='ios-cart' size={25} color='white' />;
    },
  }
  //====================================================
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 1000 }).start();
  }
  //====================================================
  onRefresh() {
    this.props.screenProps.getIngredients();
    this.props.screenProps.getUserRecipes();
    this.props.screenProps.getUserGroceries();
    this.setState({refreshing: false});
  }

  purchaseIngredients(ingredients = this.props.screenProps.userGroceries) {
    let purchased = {
      email: this.props.screenProps.email,
      shouldReplace: true,
      ingredients: ingredients
    };
    console.log(purchased);
    axios.post(`http://${IP}/api/grocerylistintopantry`, purchased)
      .then((response) => {
        this.props.screenProps.getIngredients();
        this.props.screenProps.getUserGroceries();
      })
      .catch((err) => {
        if (err.request._hasError || err.response.request.status === 404) {
          console.log('ERROR purchasing ingredients', err);
          Alert.alert('Trouble connecting to server', 'Please try again later');
        }
        else if (err.response) {
          console.log('ERROR converting units', err.response.request.response);
          Alert.alert('Invalid unit conversion', err.response.request.response);
        }
      });
  }

  editIngredients(ingredients = this.props.screenProps.userGroceries) {
    let edited = {
      email: this.props.screenProps.email,
      shouldReplace: true,
      ingredients: ingredients,
    }
    axios.post(`http://${IP}/api/grocerylist`, edited)
      .then((response) => {
        this.props.screenProps.getIngredients();
        this.props.screenProps.getUserGroceries();
      }).catch((err) => {
        console.log('ERROR editing cart', err);
        if (err.request._hasError || err.response.request.status === 404) {
          Alert.alert('Trouble connecting to server', 'Please try again later');
        }
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
      }).catch((err) => {
        if (err.request._hasError || err.response.request.status === 404) {
          console.log('ERROR purchasing ingredients', err);
          Alert.alert('Trouble connecting to server', 'Please try again later');
        }
        else {
          Alert.alert('Error deleting groceries');
        }
      });
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
        console.log('ERROR saving ispurchased', err);
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
          .catch((err) => {
            console.log('ERROR converting units', err.response.request.response);
            Alert.alert('Invalid unit conversion', err.response.request.response);
          })
      })
      .catch((err) => {
        console.log('ERROR adding to cart', err);
        if (err.request._hasError || err.response.request.status === 404) {
          Alert.alert('Trouble connecting to server', 'Please try again later');
        }
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
      .catch((err) => {
        console.log('ERROR removing from cart', err);
        if (err.request._hasError || err.response.request.status === 404) {
          Alert.alert('Trouble connecting to server', 'Please try again later');
        }
      })
  }

  editMode() {
    this.setState({
      editMode: true
    })
  }
  //====================================================
  render() {
    return (
      <ImageBackground
        style={[styles.container, {
          backgroundColor: 'white',
          justifyContent: 'center'
        }]}
        source={require('../media/4.jpg')}
        blurRadius={0}
        onLayout={() => {
          this.forceUpdate();
        }}
      >
        <Animated.View style={{ ...this.props.style, opacity: this.state.fadeAnim }}>
          <Text style={{ fontSize: 22, paddingBottom: 10 }}>Welcome {this.props.screenProps.name}!</Text>
          <View flexDirection='row' justifyContent='space-between'>
            <Text onLongPress={() => { this.setState({ groceryCopy: JSON.parse(JSON.stringify(this.props.screenProps.userGroceries)) }); this.editMode() }} style={{ fontSize: 20, fontWeight: 'bold' }}>Your Saved Grocery List</Text>
            <Icon name='ios-more' type='ionicon' onPress={() => { this.setState({ groceryCopy: JSON.parse(JSON.stringify(this.props.screenProps.userGroceries)) }); this.editMode() }} />
          </View>
          <FlatList
            style={[styles.list, { width: Dimensions.get('window').width / 1.1 }]}
            data={this.props.screenProps.userGroceries}
            renderItem={({ item, index }) => <GroceryListEntry item={item} index={index} editIngredients={this.editIngredients} removeFromCart={this.removeFromCart} closeAdd={this.closeAdd} saveCheckboxes={this.saveCheckboxes} editMode={this.editMode} purchaseIngredients={this.purchaseIngredients} />}
            keyExtractor={(item) => item.ingredient}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
                colors={['orange']}
                progressBackgroundColor='transparent'
              />
            }
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
              editMode: false,
              groceryCopy: JSON.parse(JSON.stringify(this.props.screenProps.userGroceries))
            })
          }}>
          <ImageBackground
            style={[styles.container, {
            }]}
            source={require('../media/4.jpg')}
            blurRadius={0}
            onLayout={() => {
              this.forceUpdate();
            }}
          >
            <Text style={{
              fontSize: 22,
              paddingBottom: 10
            }}>Grocery List Editing Mode</Text>
            <FlatList
              style={[styles.list, { width: Dimensions.get('window').width / 1.1 }]}
              data={
                this.state.groceryCopy
              }
              extraData={this.state.index}
              renderItem={({ item }) => <GroceryEditor item={item} units={this.state.units} />}
              keyExtractor={(item) => item.ingredient}
            />
            <Button
              title='Confirm'
              backgroundColor='limegreen'
              rounded={true}
              onPress={() => {
                this.editIngredients(this.state.groceryCopy);
                this.setState({
                  editMode: false,
                  groceryCopy: JSON.parse(JSON.stringify(this.props.screenProps.userGroceries))
                })
              }} />
          </ImageBackground>
        </Modal>
      </ImageBackground>
    )
  }
}
export default GroceryList;