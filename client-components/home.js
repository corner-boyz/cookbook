import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from '../styles';
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
  render() {
    return (
      <View style={[styles.container, {backgroundColor:'white', justifyContent:'center'}]}>
        <Text>Welcome to your CookBook, what would you like to do?</Text>
        <Button
          title='Testing'
          icon={{
            name: 'cloud'
          }}

          // backgroundColor='green'

          onPress={() => { console.log('hello world') }}
        />
      </View>
    );
  };
}

export default Home;