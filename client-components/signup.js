import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';

import { styles } from '../styles';
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
          this.props.screenProps.switchToLogin();
        }).catch(error => {
          console.log('Error in creating new user:', error);
        });
    }
  }
  //====================================================
  render() {
    return (
      <View style={styles.homeContainer}>
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
            email: text,
            noEmail: false,
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
            password: text,
            tooShort: false,
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
            confirmedPassword: text,
            notMatching: false,
          })}
        />
        <Button
          title="Sign Up"
          onPress={() => {
            this.submitSignup();
          }}
        />
        <Text
          style={styles.signUpText}
        >Already have an account?</Text>
        <Button
          title="Go Back"
          onPress={() => {
            this.props.screenProps.switchToLogin();
          }}
          color="red"
        />
      </View>
    )
  }
}

export default Signup;