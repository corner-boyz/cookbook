import React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import axios from 'axios';

import IP from '../IP';
//==================================================== 
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      wrongEmailOrPass: '',
    }
    this.submitLogin = this.submitLogin.bind(this);
  }
  //====================================================
  submitLogin() {
    if (this.state.email.length) {
      axios.post(`http://${IP}/api/login`, {
        email: this.state.email,
        password: this.state.password,
      }).then(results => {
        if (results.data === 'Wrong email or password') {
          this.setState({
            wrongEmailOrPass: true,
          });
        } else {
          let { email, name } = results.data;
          this.props.screenProps.logIn(email);
        }
      }).catch(error => {
        console.log('Error in validating user login:', error);
      });
    }
  }
  //====================================================
  render() {
    return (
      <View style={styles.container}>
        <Text>Log in to your CookBook account:</Text>
        <TextInput
          style={{ height: 40, width: 250 }}
          placeholder='Email'
          onChangeText={text => this.setState({
            email: text,
            wrongEmailOrPass: false,
          })}
        />
        {this.state.wrongEmailOrPass
          ? <Text style={styles.warningText}>Wrong email or password.</Text>
          : (null)}
        <TextInput
          style={{ height: 40, width: 250 }}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({
            password: text,
            wrongEmailOrPass: false,
          })}
        />
        <Button
          title='Log In'
          onPress={() => {
            this.submitLogin();
          }}
        />
        <Text style={styles.signUpText}>
          Don't have an account?
        </Text>
        <Button
          title="Sign Up"
          onPress={() => {
            this.props.screenProps.switchToSignUp();
          }}
          color='#ff0000'
          style={styles.signUpButton}
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
  signUpText: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  signUpButton: {
    backgroundColor: '#ff0000',
  },
  warningText: {
    color: '#ff0000'
  }
});

export default Login;