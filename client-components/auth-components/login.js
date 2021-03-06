import React from 'react';
import axios from 'axios';

import { Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import { Card, Button, Input } from 'react-native-elements';

import IP from '../../IP';

//====================================================
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      wrongEmailOrPass: false,
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
          this.props.logIn(email, name);
        }
      }).catch(err => {
        console.log('Error in validating user login:', err);
        if (err.request._hasError || err.response.request.status === 404) {
          Alert.alert('Trouble connecting to server', 'Please try again later');
        }
      });
    }
  }
  //====================================================
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
        <Card
          containerStyle={{
            width: Dimensions.get('window').width / 1.5,
            borderRadius: 20,
            alignItems: 'center'
          }}
          wrapperStyle={{
            alignItems: 'center',
          }}
        >
          <Input
            placeholder='Email'
            onChangeText={text => this.setState({
              email: text,
              wrongEmailOrPass: false,
            })}
            inputStyle={{
              fontSize: 14
            }}
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 20,
              height: 45,
              width: Dimensions.get('window').width / 2,
              marginTop: 5,
              marginBottom: 5,
            }}
            leftIcon={{
              name: 'ios-mail',
              type: 'ionicon',
              color: 'lightgray'
            }}
            autoFocus={true}
          />
          <Input
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={text => this.setState({
              password: text,
              wrongEmailOrPass: false,
            })}
            inputStyle={{
              fontSize: 14
            }}
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 20,
              height: 45,
              width: Dimensions.get('window').width / 2,
              marginTop: 5,
              marginBottom: 5,
            }}
            leftIcon={{
              name: 'ios-lock',
              type: 'ionicon',
              color: 'lightgrey'
            }}
            onSubmitEditing={() => {
              this.props.toggleLoading()
              this.props.submitLogin(this.state.email, this.state.password)
            }}
          />
          <Button
            title='Log In'
            buttonStyle={{
              backgroundColor: 'dodgerblue',
              marginTop: 5,
              borderRadius: 20,
              height: 45,
              width: Dimensions.get('window').width / 2,
            }}
            loading={this.props.loading}
            onPress={() => {
              this.props.toggleLoading()
              this.props.submitLogin(this.state.email, this.state.password);
            }}
          />
        </Card>
      </KeyboardAvoidingView>
    )
  }
}

export default Login;
