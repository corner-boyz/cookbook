import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const RecipeEntry = (props) => {
  setTimeout(() => {console.dir(props.recipe)}, 1000);
  return (
    <View>
      <Text>
        {props.recipe.title}
      </Text>
      <Image 
        style={styles.stretch}
        source={{uri: props.recipe.image}} />
    </View>
  );
}

const styles = StyleSheet.create({
  stretch: {
    width: 312,
    height: 231
  }
});

export default RecipeEntry;