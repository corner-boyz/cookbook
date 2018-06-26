import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';


// import Ionicons from 'react-native-vector-icons/Ionicons';
//==================================================== 
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  //====================================================
  componentDidMount() {

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
            email: text
          })}
        />
        <TextInput
          style={{ height: 40, width: 250 }}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({
            password: text
          })}
        />
        <Button
          title='Log In'
          onPress={() => {
            // this.submitLogin();
            this.props.screenProps.logIn();
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
  }
});

export default Login;