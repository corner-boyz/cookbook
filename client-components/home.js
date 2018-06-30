import React from 'react';
import axios from 'axios';
import IP from '../IP.js';

import HomeRecipes from './home-components/homeRecipes.js'
import { Text, View, Animated, Easing, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from '../styles';
//====================================================
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      text: '',
      fadeAnim: new Animated.Value(0),
      // yPosition: new Animated.Value(0),
    }
    // console.log(this.props.screenProps.email)
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
  }
  //====================================================
  render() {
    let { fadeAnim } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: 'white', justifyContent: 'center' }]}>
        <Animated.View style={{ ...this.props.style, opacity: fadeAnim }}>
          <Text style={{ fontSize: 18 }}>Welcome {this.props.screenProps.name}</Text>
          <Text style={{ fontSize: 16 }}>Here are your saved recipes:</Text>

          <FlatList
            data={this.props.screenProps.userRecipes}
            extraData={this.state.index}
            renderItem={({ item, index }) => <HomeRecipes item={item} index={index} email={this.props.screenProps.email} getUserRecipes={this.props.screenProps.getUserRecipes} />}
            keyExtractor={(item) => item.title}
          />



        </Animated.View>
      </View>
    );
  };
}

export default Home;