import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const RecipeEntry = (props) => {
  return (
    <TouchableOpacity onPress={touchRecipe}>
      <Text>
        {props.recipe.title}
      </Text>
      <Image onPress={touchRecipe}
        style={styles.stretch}
        source={{uri: props.recipe.image}} />
    </TouchableOpacity>
  );
}

const touchRecipe = () => {
  console.log('CLICKED');
}

const styles = StyleSheet.create({
  stretch: {
    width: 312,
    height: 231
  }
});

export default RecipeEntry;