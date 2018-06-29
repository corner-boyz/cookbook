import React from 'react';
import { Text, View, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button } from 'react-native-elements';

import { styles } from '../styles';
//====================================================
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      text: '',
      fadeAnim: new Animated.Value(0),
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
    Animated.timing(this.state.fadeAnim,
      {
        toValue: 1,
        duration: 3500
      }
    ).start();
  }
  //====================================================
  render() {
    let { fadeAnim } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: 'white', justifyContent: 'center' }]}>
        <Animated.View style={{ ...this.props.style, opacity: fadeAnim }}>
          <Text>Welcome to your CookBook, what would you like to do?</Text>
        </Animated.View>
      </View>
    );
  };
}

export default Home;