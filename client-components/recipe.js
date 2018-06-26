import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const Recipe = (props) => {
  return (
    <TouchableOpacity onPress={() => touchRecipe(props.recipe.id)}>
      <Text>{props.recipe.title}</Text>
      <Image onPress={touchRecipe}
        style={styles.stretch}
        source={{uri: props.recipe.image}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  stretch: {
    width: 312,
    height: 231
  }
});

export default Recipe;