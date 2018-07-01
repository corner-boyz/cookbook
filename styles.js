import { StyleSheet } from 'react-native';

module.exports.styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 18
  },
  owned: {
    color: 'green'
  },
  missing: {
    color: 'red'
  },
  signUpText: {
    paddingTop: 25,
    paddingBottom: 10,
  },
  signUpButton: {
    backgroundColor: '#ff0000',
  },
  warningText: {
    color: '#ff0000'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 25,
  },
  text: {
    flex: 1,
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center'
  }
});