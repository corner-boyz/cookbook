import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

import { styles } from '../styles';
import IP from '../IP';


class RecipeListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  retrieveRecipe = (recipeId) => {
    axios.get(`http://${IP}/api/recipe/${recipeId}`).then((results) => {
      this.props.selectRecipe(results.data);
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.retrieveRecipe(this.props.recipe.id)}
        style={{backgroundColor: 'white'}}
      >
        <Text style={styles.header}>{this.props.recipe.title}</Text>
        <Image
          style={styles.recipeImage}
          source={{ uri: this.props.recipe.image }}
        />
        {this.props.recipe.usedIngredients.length ?
          <View>
            <Text>Owned: </Text>
            <Text>
            {this.props.recipe.usedIngredients.map((ingredient, i) => (
              ingredient.name + ', '
            ))} 
            </Text></View> : undefined}
        
        {this.props.recipe.usedIngredients.length ?
          <View>
            <Text>Missing: </Text>
            <Text>
            {this.props.recipe.missedIngredients.map((ingredient, i) => (
              ingredient.name + ', '
            ))} 
            </Text></View> : undefined}
        <Text>{'\n'}</Text>
      </TouchableOpacity>
    );
  }
}

export default RecipeListEntry;
