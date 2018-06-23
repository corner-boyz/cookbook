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
      return <Ionicons name='ios-list' size={25} color='white' />;
    },
  }

  componentDidMount() {
    
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

