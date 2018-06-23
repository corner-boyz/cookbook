import React from 'react';
import IP from '../IP.js';
import axios from 'axios';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      text: ''
    }

    this.getIngredients = this.getIngredients.bind(this);
  }
  getIngredients() {
    axios.get(`http://${IP}/api/ingredients`)
      .then(results => {
        //console.log(results.data);
        this.setState({
          ingredients: results.data,
        });
      }).catch(error => {
        console.log('Error in retrieving ingredients:', error);
      });
  }

  static navigationOptions = {
    tabBarColor: 'red',
    tabBarIcon: () => {
      return <Ionicons name='ios-home' size={25} color='white' />;
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to your CookBook, what would you like to do?</Text>
        {/* <Text>IP: {IP}</Text> */}
        {/* <Button
          onPress={this.getIngredients}
          title="Test Server"
          color="#841584"
          accessibilityLabel="Test Server"
        /> */}
        {this.state.ingredients.map((ingredient, index) => {
          return <Text key={index}>{ingredient}</Text>
        })}
      </View>
    );
  };
}
//============================================================= Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;