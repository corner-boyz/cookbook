import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';

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
        style={styles.container}
      >
        <Text>{this.props.recipe.title}</Text>
        <Image
          style={styles.stretch}
          source={{ uri: this.props.recipe.image }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  stretch: {
    width: 300,
    height: 200,
  }
});

export default RecipeListEntry;

// flex: 1,
//     backgroundColor: 'powderblue',
//     alignItems: 'center',