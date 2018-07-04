import React from 'react';
import axios from 'axios';

import { Text, View, Dimensions } from 'react-native';
import { Card, Button, Input, } from 'react-native-elements';
import { styles } from '../../styles';

import IP from '../../IP';

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
          this.props.screenProps.logIn(this.state.email, this.state.name)
          this.props.screenProps.switchToLogin();
        }).catch(error => {
          console.log('Error in creating new user:', error);
        });
    }
  }
  //====================================================
  render() {
    return (
      // <View style={[styles.container, { backgroundColor: 'white', justifyContent: 'center' }]}>
      //   <Text>Sign up for CookBook:</Text>
      //   {this.state.noEmail ?
      //     <Text style={styles.warningText}>Please enter a valid email address.</Text>
      //     : (null)}
      //   <TextInput
      //     style={{ height: 40, width: 250 }}
      //     placeholder='Email'
      //     onChangeText={text => this.setState({
      //       email: text,
      //       noEmail: false,
      //     })}
      //   />
      //   <TextInput
      //     style={{ height: 40, width: 250 }}
      //     placeholder='Name'
      //     onChangeText={text => this.setState({
      //       name: text
      //     })}
      //   />
      //   {this.state.tooShort ?
      //     <Text style={styles.warningText}>Password must be at least 6 characters.</Text>
      //     : (null)}
      //   <TextInput
      //     style={{ height: 40, width: 250 }}
      //     placeholder='Password'
      //     secureTextEntry={true}
      //     onChangeText={text => this.setState({
      //       password: text,
      //       tooShort: false,
      //     })}
      //   />
      //   {this.state.notMatching ?
      //     <Text style={styles.warningText}>Passwords do not match.</Text>
      //     : (null)}
      //   <TextInput
      //     style={{ height: 40, width: 250 }}
      //     placeholder='Confirm Password'
      //     secureTextEntry={true}
      //     onChangeText={text => this.setState({
      //       confirmedPassword: text,
      //       notMatching: false,
      //     })}
      //   />
      //   <Button
      //     title="Sign Up"
      //     onPress={() => {
      //       this.submitSignup();
      //     }}
      //   />
      //   <Text
      //     style={styles.signUpText}
      //   >Already have an account?</Text>
      //   <Button
      //     title="Go Back"
      //     onPress={() => {
      //       this.props.screenProps.switchToLogin();
      //     }}
      //     color="red"
      //   />
      // </View>
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
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 20,
            height: 35,
            width: 200,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 15
          }}
        />
        <Input
          placeholder='Email'
          onChangeText={text => this.setState({
            email: text,
            noEmail: false,
          })}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 20,
            height: 35,
            width: 200,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 15
          }}
        />
        <Input
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({
            password: text,
            tooShort: false,
          })}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 20,
            height: 35,
            width: 200,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 15
          }}
        />
        <Input
          placeholder='Confirm Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({
            confirmedPassword: text,
            notMatching: false,
          })}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 20,
            height: 35,
            width: 200,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 15
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
            // this.props.submitSignup(this.state.name, this.state.email, this.state.password, this.state.confirmedPassword)
          }}
        />
      </Card>
    )
  }
}

export default Signup;