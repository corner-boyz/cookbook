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

class Ingredients extends React.Component {
  static navigationOptions = {
    tabBarColor: 'green',
    tabBarIcon: () => {
      return <Ionicons name='ios-basket' size={25} color='white' />;
    },
  }

  componentDidMount() {
    console.log(this.props.navigation.state)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Here are your Ingredients</Text>
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

export default Ingredients;