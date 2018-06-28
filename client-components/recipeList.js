import React from 'react';
import axios from 'axios';
import { Text, View, FlatList, ActivityIndicator, Animated } from 'react-native';
import { styles } from '../styles'
import RecipeListEntry from './recipeListEntry'
import Recipe from './recipe'
import IP from '../IP';

import Ionicons from 'react-native-vector-icons/Ionicons';
//====================================================
class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecipe: undefined,
      fadeAnim: new Animated.Value(0)
    };
    this.selectRecipe = this.selectRecipe.bind(this);
    this.recipeBack = this.recipeBack.bind(this);
  }

  static navigationOptions = {
    tabBarColor: 'blue',
    tabBarIcon: () => {
      return <Ionicons name='ios-list' size={25} color='white' />;
    }
  }
  //====================================================
  componentDidMount() {
    console.log('SCREEN', this.props.screenProps.searchRecipes);
    this.props.screenProps.searchRecipes();
    setTimeout(()=>console.log('RECIPESjo', this.props.screenProps.recipes), 2000);
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 2500,
      }
    ).start();
  }

  //====================================================
  selectRecipe(recipe) {
    this.setState({
      selectedRecipe: recipe
    });
  }

  recipeBack() {
    this.setState({
      selectedRecipe: undefined
    });
  }
  //====================================================
  render() {

    let { fadeAnim } = this.state;

    if (!this.state.selectedRecipe) {
      if (this.props.screenProps.recipes) {
        return (
          <View style={styles.container}>
            <Animated.View
              style={{ ...this.props.style, opacity: fadeAnim }}
            >
              <FlatList style={styles.list}
                data={this.props.screenProps.recipes}
                renderItem={
                  ({ item }) => (
                    <View>
                      <RecipeListEntry
                        recipe={item}
                        selectRecipe={this.selectRecipe}
                      />
                    </View>
                  )
                }
                keyExtractor={(item, index) => item.id.toString()}
              />
            </Animated.View>
          </View>
        );
      } else {
        return (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        );
      }
    } else {
      return (
        <Recipe selectedRecipe={this.state.selectedRecipe} email={this.props.screenProps.email} recipeBack={this.recipeBack} />
      );
    }
  }
}

export default RecipeList;

