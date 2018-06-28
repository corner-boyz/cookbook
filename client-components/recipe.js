import React from 'react';
import axios from 'axios';

import IP from '../IP';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeDetails: { diets: [], analyzedInstructions: [{ steps: [{}, {}] }] }
    };
  }
  //====================================================
  componentDidMount() {
    this.findRecipes();
  }
  //====================================================
  findRecipes() {
    axios.get(`http://${IP}/api/recipe/${this.props.selectedRecipe.id}`).then((results) => {
      this.setState({
        recipeDetails: results.data
      });
      setTimeout(() => console.log('asdfd', (this.props.selectedRecipe.analyzedInstructions[0].steps)), 1000)
    });
  }
  //====================================================
  render() {
    return (

      <View style={styles.container}>
        <Button
          title="Back to Recipes"
          onPress={() => {
            this.props.recipeBack()
          }}
        />
        <Text>{this.state.recipeDetails.title}</Text>
        <Text>{this.state.recipeDetails.id}</Text>
        <Image
          style={styles.stretch}
          source={{ uri: this.state.recipeDetails.image }}
        />
        <Text>Preparation: {this.state.recipeDetails.preparationMinutes} minutes</Text>
        <Text>Cooking: {this.state.recipeDetails.cookingMinutes} minutes</Text>
        <Text>Ready In: {this.state.recipeDetails.readyInMinutes} minutes</Text>
        <Text>Diet</Text>
        {this.state.recipeDetails.diets.map((diet, index) => (
          <Text key={index}>{diet}</Text>
        ))}
        <Text>Steps</Text>
        {this.state.recipeDetails.analyzedInstructions[0].steps.map((diet, index) => (
          <Text key={index}>{diet.number}. {diet.step}</Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stretch: {
    width: 312,
    height: 231
  },
  text: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    paddingTop: 20,
    // justifyContent: 'center',
  },
  list: {
    flex: 1,
    backgroundColor: 'white'
    // justifyContent: 'center',
  }
});

export default Recipe;