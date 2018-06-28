import { StyleSheet } from 'react-native';

module.exports.styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    paddingTop: 20,
    // justifyContent: 'center',
  },
  ingredientsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  ingredientsList: {
    width: 350,
    backgroundColor: 'white'
    // justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
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