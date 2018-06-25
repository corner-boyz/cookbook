import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
//==================================================== 
class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
        noEmail: false,
        notMatching: false,
    }

  }
//==================================================== NavBar component
  static navigationOptions = {
    tabBarColor: 'green',
    tabBarIcon: () => {
      return <Ionicons name='ios-basket' size={25} color='white' />;
    },
  }
//====================================================
  componentDidMount() {

  }

  submitSignup() {
    this.setState({
        noEmail: this.state.email.indexOf('@') === -1,
        notMatching: this.state.password !== this.state.confirmedPassword
    });

  }
//====================================================
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign up for CookBook:</Text>
        <TextInput
          style={{ height: 40, width: 250 }}
          placeholder='Name'
          onChangeText={text => this.setState({
              name: text
          })}
        />
        {this.state.noEmail ? 
        <Text style={styles.warningText}>Please enter a valid email address.</Text>
        : (null)}
        <TextInput
          style={{ height: 40, width: 250 }}
          placeholder='Email'
          onChangeText={text => this.setState({
            email: text
          })}
        />
        {this.state.notMatching ? 
        <Text style={styles.warningText}>Passwords do not match.</Text>
        : (null)}
        <TextInput
          style={{ height: 40, width: 250 }}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({
            password: text
          })}
        />
        <TextInput
          style={{ height: 40, width: 250 }}
          placeholder='Confirm Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({
            confirmedPassword: text
          })}
        />
        <Button
          title="Sign Up"
          onPress={() => {
            this.submitSignup();
          }}
        />
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
  list: {
    width: 350,
    backgroundColor: 'white'
    // justifyContent: 'center',
  },
  warningText: {
      color: '#ff0000'
  }
});

export default Signup;