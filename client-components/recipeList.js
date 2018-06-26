import React from 'react';
import axios from 'axios';

import RecipeListEntry from './recipeListEntry'
import Recipe from './recipe'
import IP from '../IP';

import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
//====================================================
class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecipe: undefined
    };
    this.selectRecipe = this.selectRecipe.bind(this);
    this.recipeBack = this.recipeBack.bind(this);
  }

  static navigationOptions = {
    tabBarColor: 'blue',
    tabBarIcon: () => {
      return <Ionicons name='ios-list' size={25} color='white' />;
    },
  }
  //====================================================
  componentDidMount() {
    this.findRecipes();
  }

  //====================================================
  findRecipes() {
    axios.post(`http://${IP}/api/recipelist`).then((results) => {
      this.setState({
        recipes: results.data
      });
    });
  }

  selectRecipe(recipe) {
    this.setState({
      selectedRecipe: recipe
    });
    setTimeout(() => console.log(this.state.selectedRecipe), 1000)
  }

  recipeBack() {
    this.setState({
      selectedRecipe: undefined
    });
  }
  //====================================================
  render() {
    if (!this.state.selectedRecipe) {
      return (
        <View style={styles.container}>
          <Text>Recipes</Text>
          <FlatList style={styles.list}
            data={this.state.recipes}
            renderItem={
              ({ item }) => (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <RecipeListEntry
                    recipe={item}
                    selectRecipe={this.selectRecipe}
                  />
                </View>
              )
            }
            keyExtractor={(item, index) => item.title}
          />
        </View>
      )
    } else {
      return (
        <Recipe selectedRecipe={this.state.selectedRecipe} recipeBack={this.recipeBack}/>
      )
    }
  }
}
//====================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  list: {
    flex: 1,
    backgroundColor: 'white'
    // justifyContent: 'center',
  }
});

export default RecipeList;

