import React from 'react';
import axios from 'axios';

import { Dimensions } from 'react-native';
import { Card, Button, Input, } from 'react-native-elements';

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
      noEmail: false,
      notMatching: false,
      tooShort: false,
    }
    //====================================================
  }
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
          this.props.logIn(this.state.email, this.state.password)
          // this.props.switchToLogin();
        }).catch(error => {
          console.log('Error in creating new user:', error);
        });
    }
  }
  //====================================================
  render() {
    return (
      <Card
        containerStyle={{
          width: Dimensions.get('window').width / 2,
          borderRadius: 20
        }}>
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
            width: 200,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 15
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
            noEmail: false,
          })}
          inputStyle={{
            fontSize: 12
          }}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 20,
            height: 35,
            width: 200,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 15
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
            tooShort: false,
          })}
          inputStyle={{
            fontSize: 12
          }}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 20,
            height: 35,
            width: 200,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 15
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
            notMatching: false,
          })}
          inputStyle={{
            fontSize: 12
          }}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 20,
            height: 35,
            width: 200,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 15
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
            borderRadius: 20,
            height: 35,
            width: 200,
            marginLeft: 15,

            marginTop: 5,
          }}
          onPress={() => {
            console.log(this.state.name, this.state.email, this.state.password, this.state.confirmedPassword);
            this.submitSignup(this.state.name, this.state.email, this.state.password, this.state.confirmedPassword)
          }}
        />
      </Card>
    )
  }
}

export default Signup;