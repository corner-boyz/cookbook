import React from 'react';
import axios from 'axios';
import IP from '../IP';
import Login from './auth-components/login.js';
import Signup from './auth-components/signup.js';

import { Text, View, ImageBackground, Dimensions } from 'react-native';
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
        console.error('Error in validating user login:', err);
      });
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
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          justifyContent: 'center'
        }}
        source={require('../media/landing.jpg')}
        blurRadius={1}
      >

        <Text style={{
          fontSize: 20,
          backgroundColor: 'transparent',
          fontWeight: 'bold'
        }}>CookBook
        </Text>
        <View flexDirection='row'>
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
