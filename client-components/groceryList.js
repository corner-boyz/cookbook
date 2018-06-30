import React from 'react';
import { Text, View, Animated } from 'react-native';

import { styles } from '../styles.js';

import Ionicons from 'react-native-vector-icons/Ionicons';
//====================================================
class GroceryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
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

  //====================================================
  render() {
    console.log(`Render GroceryList`, this.props);
    return (
      <View style={[styles.container, { backgroundColor: 'white', justifyContent: 'center' }]}>
        {/* <Animated.View style={{ ...this.props.style, opacity: fadeAnim }}> */}
        <Text>Grocery List</Text>

        {/* </Animated.View> */}
      </View>
    )
  }
}
export default GroceryList;