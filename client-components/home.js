import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
//====================================================
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      text: ''
    }

  }
  //====================================================
  static navigationOptions = {
    tabBarColor: 'red',
    tabBarIcon: () => {
      return <Ionicons name='ios-home' size={25} color='white' />;
    },
  }
  //====================================================
  componentDidMount() {
    console.log(this.props.navigation)
    setTimeout(() => {
      this.props.navigation.actions.goBack();
    }, 2000)
  }

  //====================================================
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to your CookBook, what would you like to do?</Text>
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