import React from 'react';
import axios from 'axios';

import IP from '../IP';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

class RecipeListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  retrieveRecipe = (recipeId) => {
    axios.get(`http://${IP}/api/recipe/${recipeId}`).then((results) => {
      // this.setState({
      //   recipe: results.data
      // });
      this.props.selectRecipe(results.data);
      // setTimeout(() => console.log('RECIPE', this.state.recipe.title), 1000)
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