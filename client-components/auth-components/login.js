import React from 'react';
import axios from 'axios';

import { Text, View, Dimensions } from 'react-native';
import { Card, Button, Input, } from 'react-native-elements';
import { styles } from '../../styles';

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
          this.props.screenProps.logIn(email, name);
        }
      }).catch(err => {
        console.error('Error in validating user login:', err);
      });
    }
  }
  //====================================================
  render() {
    return (
      // <View style={[styles.container, { backgroundColor: 'white', justifyContent: 'center' }]}>
      //   <Text>Log in to your CookBook account:</Text>
      //   <TextInput
      //     style={{ height: 40, width: 250 }}
      //     placeholder='Email'
      //     onChangeText={text => this.setState({
      //       email: text,
      //       wrongEmailOrPass: false,
      //     })}
      //   />
      //   {this.state.wrongEmailOrPass
      //     ? <Text style={styles.warningText}>Wrong email or password.</Text>
      //     : (null)}
      //   <TextInput
      //     style={{ height: 40, width: 250 }}
      //     placeholder='Password'
      //     secureTextEntry={true}
      //     onChangeText={text => this.setState({
      //       password: text,
      //       wrongEmailOrPass: false,
      //     })}
      //   />
      //   <Button
      //     title='Log In'
      //     onPress={() => {
      //       this.submitLogin();
      //     }}
      //   />
      //   <Text style={styles.signUpText}>
      //     Don't have an account?
      //   </Text>
      //   <Button
      //     title="Sign Up"
      //     onPress={() => {
      //       this.props.screenProps.switchToSignUp();
      //     }}
      //     color='#ff0000'
      //     style={styles.signUpButton}
      //   />
      // </View>
      <Card
        containerStyle={{
          width: Dimensions.get('window').width / 2,
          borderRadius: 20,
        }}>
        <Input
          placeholder='Email'
          onChangeText={text => this.setState({
            email: text,
            wrongEmailOrPass: false,
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
            wrongEmailOrPass: false,
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
          title='Log In'
          buttonStyle={{
            backgroundColor: 'dodgerblue',
            marginTop: 5,
            borderRadius: 20,
            height: 35,
            width: 200,
            marginLeft: 15,
          }}
          onPress={() => {
            console.log(this.state.email, this.state.password);
            this.props.submitLogin(this.state.email, this.state.password);
          }}
        />
      </Card>
    )
  }
}

export default Login;
