import React from 'react';
import axios from 'axios';
import IP from '../IP';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
//====================================================
class Recipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [{title: 'hello'}]
    }
  }

  static navigationOptions = {
    tabBarColor: 'blue',
    tabBarIcon: () => {
      return <Ionicons name='ios-list' size={25} color='white' />;
    },
  }
  //====================================================
  componentDidMount() {
    this.findRecipes();
  }

//====================================================
  findRecipes() {
    axios.post(`http://${IP}/api/recipes`).then((results) => {
      this.setState({
        recipes: results.data
      });
      setTimeout(() => console.log('RECIPES', this.state.recipes[0].title), 1000)
    });
  }
  //====================================================
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.recipes[0].title}</Text>
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
  },
});

export default Recipes;

