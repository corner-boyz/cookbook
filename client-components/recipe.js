import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler
} from 'react-native';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(()=>console.log(this.props.recipeBack), 2000);
    BackHandler.addEventListener('hardwareBackPress', this.props.recipeBack);
  }
 
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.recipeBack);
  }

  render() {
    return (
      <View>
        <Text>{this.props.selectedRecipe.title}</Text>
        <Text>{this.props.selectedRecipe.id}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stretch: {
    width: 312,
    height: 231
  }
});

export default Recipe;