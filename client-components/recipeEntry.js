import React from 'react';
import axios from 'axios';

import IP from '../IP';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

class RecipeEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  retrieveRecipe = (recipeId) => {
    axios.post(`http://${IP}/api/recipe`).then((results) => {
      this.setState({
        recipe: results.data
      });
      setTimeout(() => console.log('RECIPE', this.state.recipe.title), 1000)
    });
  }
  
  render() {
    return (
      <TouchableOpacity onPress={() => this.retrieveRecipe(this.props.recipe.id)}>
        <Text>{this.props.recipe.title}</Text>
        <Image
          style={styles.stretch}
          source={{uri: this.props.recipe.image}} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  stretch: {
    width: 312,
    height: 231
  }
});

export default RecipeEntry;