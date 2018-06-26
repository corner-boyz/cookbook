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

import axios from 'axios';
import IP from '../IP';

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
        tooShort: false,
    }

}
//==================================================== NavBar component
  // static navigationOptions = {
  //   tabBarColor: 'green',
  //   tabBarIcon: () => {
  //     return <Ionicons name='ios-basket' size={25} color='white' />;
  //   },
  // }
//====================================================
  componentDidMount() {
  }

  submitSignup() {
    this.setState({
        noEmail: this.state.email.indexOf('@') === -1,
        notMatching: this.state.password !== this.state.confirmedPassword,
        tooShort: this.state.password.length < 6,
    });
    if (!this.state.noEmail && !this.state.notMatching && !this.state.tooShort) {
        axios.post(`http://${IP}/api/signup`, {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
          })
          .then(() => {
            //Redirect to home page
          }).catch(error => {
            console.log('Error in creating new user:', error);
          });
    }
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
        {this.state.tooShort ? 
        <Text style={styles.warningText}>Password must be at least 6 characters.</Text>
        : (null)}
        <TextInput
          style={{ height: 40, width: 250 }}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({
            password: text
          })}
        />
        {this.state.notMatching ? 
        <Text style={styles.warningText}>Passwords do not match.</Text>
        : (null)}
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