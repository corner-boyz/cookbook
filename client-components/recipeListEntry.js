import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
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
        <Text>{this.props.recipe.title}</Text>
        <Image
          style={styles.recipeImage}
          source={{ uri: this.props.recipe.image }}
        />
      </TouchableOpacity>
    );
  }
}

export default RecipeListEntry;
