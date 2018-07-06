import React from 'react';
import axios from 'axios';

import { Dimensions, Alert } from 'react-native';
import { Card, Button, Input } from 'react-native-elements';

import IP from '../../IP';

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
    }
    //====================================================
  }
  componentDidMount() {
  }

  submitSignup(name, email, password, confirmedPassword) {
    if (email.indexOf('@') === -1) {
      Alert.alert('Invalid email address', 'Please enter a valid email address.');
    } else if (password !== confirmedPassword) {
      Alert.alert('Password error', 'Passwords do not match.');
    } else if (password.length < 6) {
      Alert.alert('Password too short', 'Passwords must be at least 6 characters.');
    } else {
      this.props.toggleLoading();
      axios.post(`http://${IP}/api/signup`, {
        email: email,
        password: password,
        name: name,
      })
        .then(() => {
          this.props.toggleLoading()
          this.props.logIn(this.state.email, this.state.password)
        }).catch(err => {
          this.props.toggleLoading()
          if (err.request._hasError || err.response.request.status === 404) {
            Alert.alert('Trouble connecting to server', 'Please try again later');
          } else {
            Alert.alert('Email already in use', 'Please enter a different email');
          }
        });
    }
  }
  //====================================================
  render() {
    return (
      <Card
        containerStyle={{
          width: Dimensions.get('window').width / 2,
          borderRadius: 20,
        }}
        wrapperStyle={{
          alignItems: 'center',
        }}
      >
        <Input
          placeholder='Name'
          onChangeText={text => this.setState({
            name: text
          })}
          inputStyle={{
            fontSize: 12
          }}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 20,
            height: 35,
            width: Dimensions.get('window').width / 2.5,
            marginTop: 5,
            marginBottom: 5,
          }}
          leftIcon={{
            name: 'ios-person',
            type: 'ionicon',
            color: 'lightgray'
          }}
        />
        <Input
          placeholder='Email'
          onChangeText={text => this.setState({
            email: text,
          })}
          inputStyle={{
            fontSize: 12
          }}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 20,
            height: 35,
            width: Dimensions.get('window').width / 2.5,
            marginTop: 5,
            marginBottom: 5,
          }}
          leftIcon={{
            name: 'ios-mail',
            type: 'ionicon',
            color: 'lightgray'
          }}
        />
        <Input
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({
            password: text,
          })}
          inputStyle={{
            fontSize: 12
          }}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 20,
            height: 35,
            width: Dimensions.get('window').width / 2.5,
            marginTop: 5,
            marginBottom: 5,

          }}
          leftIcon={{
            name: 'ios-lock',
            type: 'ionicon',
            color: 'lightgray'
          }}
        />
        <Input
          placeholder='Confirm Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({
            confirmedPassword: text,
          })}
          inputStyle={{
            fontSize: 12
          }}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 20,
            height: 35,
            width: Dimensions.get('window').width / 2.5,
            marginTop: 5,
            marginBottom: 5,

          }}
          leftIcon={{
            name: 'ios-lock',
            type: 'ionicon',
            color: 'lightgray'
          }}
        />
        <Button
          title='Sign Up'
          buttonStyle={{
            backgroundColor: 'red',
            marginTop: 5,
            borderRadius: 20,
            height: 35,
            width: Dimensions.get('window').width / 2.5,

          }}
          loading={this.props.loading}
          onPress={() => {
            
            this.submitSignup(this.state.name, this.state.email, this.state.password, this.state.confirmedPassword)
          }}
        />
      </Card>
    )
  }
}

export default Signup;