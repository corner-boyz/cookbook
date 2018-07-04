import React from 'react';
import axios from 'axios';
import Login from './auth-components/login.js';
import Signup from './auth-components/signup.js';

import { Text, View, Image, ImageBackground, Dimensions } from 'react-native';
import { Button, Input, Card } from 'react-native-elements'
import { styles } from '../styles';

import IP from '../IP';

//====================================================
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      wrongEmailOrPass: false,

      loginCard: true,
    }
    this.submitLogin = this.submitLogin.bind(this);
  }
  //====================================================
  submitLogin(email, password) {
    if (email.length) {
      axios.post(`http://${IP}/api/login`, {
        email: email,
        password: password,
      }).then(results => {
        if (results.data === 'Wrong email or password') {
          // this.setState({
          //   wrongEmailOrPass: true,
          // });
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
  //====================================================
  render() {
    const resizeMode = 'center';

    return (
      <ImageBackground
        style={{
          flex: 1,
          alignItems: 'center',
          // resizeMode: 'cover',
          backgroundColor: 'black',
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          justifyContent: 'center'
        }}
        source={require('./landing.jpg')}
      >
        <Text style={{
          fontSize: 20,
          backgroundColor: 'transparent',
          fontWeight: 'bold'
        }}>CookBook</Text>
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
              backgroundColor: 'transparent'
            }}
            onPress={() => { this.setState({ loginCard: false }) }}
          />
        </View>
        {this.state.loginCard ?
          <Login submitLogin={this.submitLogin} />
          :
          <Signup />
        }
      </ImageBackground>

    )
  }
}

export default LandingPage;
