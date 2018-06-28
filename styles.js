import { StyleSheet } from 'react-native';

module.exports.styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 18
  },
  signUpText: {
    paddingTop: 20,
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
    backgroundColor: 'powderblue',
    alignItems: 'center',
    paddingTop: 20,
  },
  text: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    // flex: 1,
    backgroundColor: 'white'
    // justifyContent: 'center',
  },
  recipeImage: {
    width: 312,
    height: 231
  },
  spinner: {
    flex: 1,
    justifyContent: 'center'
  }
});