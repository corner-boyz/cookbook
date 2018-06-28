import React from 'react';
import {StyleSheet, Text, View, BackHandler, Button, Image, FlatList} from 'react-native';
import axios from 'axios';

import IP from '../IP';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false
    };
  }
  //====================================================
  componentDidMount() {
    this.findRecipe();
    this.selectUserRecipe();
  }
  //====================================================
  findRecipe() {
    axios.get(`http://${IP}/api/recipe/${this.props.selectedRecipe.id}`).then((results) => {
      this.setState({
        recipeDetails: results.data
      });
    });
  }

  saveRecipe() {
    axios.post(`http://${IP}/api/saverecipe`, {email: this.props.email, recipe: this.props.selectedRecipe}).then((results) => {
      console.log('SAVED RECIPE');
      this.setState({
        isSaved: true
      });
    }).catch((err) => {
      console.log('ERROR SAVING RECIPE', err);
    });
  }

  selectUserRecipe() {
    axios.get(`http://${IP}/api/saverecipe/${this.props.selectedRecipe.id}/${this.props.email}`).then((results) => {
      this.setState({
        isSaved: results.data.length > 0
      });
      setTimeout(() => console.log(this.state.isSaved), 1000);
    }).catch((err) => {
      console.log('ERROR SELECTING RECIPE', err);
    });
  }
  //====================================================
  render() {
    if (this.state.recipeDetails) {
      return(
        <View style={styles.container}>
          <Button
            title="Back to Recipes"
            onPress={() => {
              this.props.recipeBack();
            }}
          />
          {this.props.email && !this.state.isSaved ?
          <Button
          title="Save Recipe"
          onPress={() => {
            this.saveRecipe();
          }}
        /> 
          : 
          undefined}
          <Text>{this.state.recipeDetails.title}</Text>
          <Image
            style={styles.stretch}
            source={{uri: this.state.recipeDetails.image}}
          />
          {this.state.recipeDetails.preparationMinutes ?
          <Text>Preparation: {this.state.recipeDetails.preparationMinutes} minutes</Text>
          : undefined}
          {this.state.recipeDetails.preparationMinutes ?
          <Text>Cooking: {this.state.recipeDetails.cookingMinutes} minutes</Text>
          : undefined}
          {this.state.recipeDetails.preparationMinutes ?
          <Text>Ready In: {this.state.recipeDetails.readyInMinutes} minutes</Text>
          : undefined}
          {this.state.recipeDetails.diets.length ? 
            <View>
              <Text>Diet</Text>
                {this.state.recipeDetails.diets.map((diet, i) => (
                  <Text key={i}>{diet}</Text>
                ))}
            </View> : undefined}

          {this.state.recipeDetails.analyzedInstructions.length ? 
            <View>
              <Text>Instructions</Text>
              {this.state.recipeDetails.analyzedInstructions[0].steps.map((step, i) => (
                <Text key={i}>{step.number}. {step.step}</Text>
              ))}
            </View> : undefined}
        </View>
      ); 
    } else {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
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