import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
class Recipes extends React.Component {
  static navigationOptions = {
    tabBarColor: 'purple',
    tabBarIcon: () => {

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name='ios-list' size={25} color='white' />;
    },
  }

  componentDidMount() {
    console.log('recipes mounted')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Here are some recipes for you</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Recipes;

