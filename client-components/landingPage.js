import React from 'react';
import axios from 'axios';
import IP from '../IP';
import Login from './auth-components/login.js';
import Signup from './auth-components/signup.js';

import { Text, View, ImageBackground, Alert, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'



//====================================================
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      wrongEmailOrPass: false,
      loading: false,
      loginCard: true,
    }
    this.submitLogin = this.submitLogin.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }
  //====================================================
  submitLogin(email, password) {
    if (email.length) {
      axios.post(`http://${IP}/api/login`, {
        email: email,
        password: password,
      }).then(results => {
        this.toggleLoading();
        if (results.data === 'Wrong email or password') {
          alert(results.data)
          console.log(results.data);
        } else {
          let { email, name } = results.data;
          this.props.logIn(email, name);
        }
      }).catch(err => {
        console.log('Error in validating user login:', err);
        if (err.request._hasError || err.response.request.status === 404) {
          Alert.alert('Trouble connecting to server', 'Please try again later');
        }
      });
    } else {
      Alert.alert('Email cannot be empty', 'Please enter your email');
    }
  }
  toggleLoading() {
    this.setState({
      loading: !this.state.loading
    })
  }
  //====================================================
  render() {

    return (
      <ImageBackground
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'black',
          justifyContent: 'center'
        }}
        source={require('../media/4.jpg')}
        blurRadius={0}
        onLayout={() => {
          // console.log('Rotated');
          this.forceUpdate();
        }}
      >

        <Text style={{
          fontSize: 20,
          backgroundColor: 'transparent',
          fontWeight: 'bold'
        }}>CookBook
        </Text>
        <View flexDirection='row' elevation={0}>
          <Button
            title='Login'
            titleStyle={{ color: 'black' }}
            buttonStyle={{
              backgroundColor: 'transparent'
            }}
            onPress={() => { this.setState({ loginCard: true }) }}
          />
          <Button
            title='Sign Up'
            titleStyle={{ color: 'black' }}
            buttonStyle={{
              backgroundColor: 'transparent',
            }}
            onPress={() => { this.setState({ loginCard: false }) }}
          />
        </View>
        {this.state.loginCard ?
          <Login submitLogin={this.submitLogin} loading={this.state.loading} toggleLoading={this.toggleLoading} />
          :
          <Signup logIn={this.props.logIn} loading={this.state.loading} toggleLoading={this.toggleLoading} />
        }
      </ImageBackground>
    )
  }
}

export default LandingPage;
