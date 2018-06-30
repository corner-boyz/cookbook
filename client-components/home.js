import React from 'react';
import axios from 'axios';
import IP from '../IP.js';
import { Text, View, Animated, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from '../styles';
//====================================================
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      recipes: [],
      text: '',
      fadeAnim: new Animated.Value(0),
      yPosition: new Animated.Value(0),
    }
  }
  //====================================================
  static navigationOptions = {
    tabBarColor: 'darkturquoise',
    tabBarIcon: () => {
      return <Ionicons name='ios-home' size={25} color='white' />;
    },
  }
  //====================================================
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 3500 }).start();
    Animated.timing(this.state.yPosition, { toValue: 200, easing: Easing.back(), duration: 3500 })

    setTimeout(() => {
      this.getUserRecipes();
    }, 3000);
  }
  //====================================================
  getUserRecipes() {
    return axios.get(`http://${IP}/api/userRecipes/${this.props.screenProps.email}`, {})
      .then((response) => {
        console.log(response.data);
        this.setState({
          recipes: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //====================================================
  render() {
    let { fadeAnim } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: 'white', justifyContent: 'center' }]}>
        <Animated.View style={{ ...this.props.style, opacity: fadeAnim }}>
          <Text>Welcome {this.props.screenProps.name}, what would you like to do?</Text>
          <Text>Here are your recipes:</Text>
          {this.state.recipes.map((item, index) =>
            <Text key={index}>{item.title}</Text>
          )}
        </Animated.View>
      </View>
    );
  };
}

export default Home;