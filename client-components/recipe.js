import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Button,
} from 'react-native';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // setTimeout(()=>console.log(this.props.recipeBack), 2000);
    BackHandler.addEventListener('hardwareBackPress', this.props.recipeBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.recipeBack);
  }

  render() {
    return (
      <View style={styles.text}>
        <Text>Here's a Recipe:</Text>
        <Text>{this.props.selectedRecipe.title}</Text>
        <Text>{this.props.selectedRecipe.id}</Text>
        <Button
          title="Back to Recipes"
          onPress={() => {
            console.log('firing..');
            this.props.recipeBack()
          }}
        />
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
  }
});

export default Recipe;