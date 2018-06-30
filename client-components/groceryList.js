import React from 'react';
import axios from 'axios';
import IP from '../IP.js';
import GroceryListEntry from './groceryList-components/groceryLIstEntry.js'
import { Text, View, Animated, FlatList } from 'react-native';
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
  }
  //====================================================
  static navigationOptions = {
    tabBarColor: 'mediumblue',
    tabBarIcon: () => {
      return <Ionicons name='ios-cart' size={25} color='white' />;
    },
  }
  //====================================================
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 3500 }).start();
    // console.log('Testing: ', this.props.screenProps.userGroceries);
    setTimeout(() => {

      console.log(this.props.screenProps.userGroceries);
      // console.log(typeof this.props.screenProps.userGroceries[0].ispurchased);
    }, 2000)
  }

  purchaseIngredients() {
    // console.log(this.props.screenProps.userGroceries);

    let purchased = {
      email: this.props.screenProps.email,
      shouldReplace: true,
      ingredients: this.props.screenProps.userGroceries
    };
    console.log(purchased);
    axios.post(`http://${IP}/api/grocerylist`, purchased)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  addToCart() {

  }
  //====================================================
  render() {
    // console.log(`Render GroceryList`, this.props);
    return (
      <View style={[styles.container, { backgroundColor: 'white', justifyContent: 'center' }]}>
        <Animated.View style={{ ...this.props.style, opacity: this.state.fadeAnim }}>
          <Text style={{ fontSize: 18 }}>Here is your shopping cart</Text>

          <FlatList
            style={[styles.list, { width: 350 }]}
            data={this.props.screenProps.userGroceries}
            // extraData={this.state.index}
            renderItem={({ item, index }) => <GroceryListEntry item={item} index={index} editIngredients={this.editIngredients} />}
            keyExtractor={(item) => item.ingredient}
          />
          <Button
            title='Add to cart'
            rounded={true}
            backgroundColor='orange'
            onPress={() => {
              this.setState({
                showAdd: true
              })
            }}
          />
          <Button
            title='Purchased'
            rounded={true}
            backgroundColor='limegreen'
            onPress={() => {
              this.purchaseIngredients();
            }}
          />
        </Animated.View>
      </View>
    )
  }
}
export default GroceryList;