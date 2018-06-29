import React from 'react';
import { View, FlatList, ActivityIndicator, Animated, Modal } from 'react-native';

import { styles } from '../styles'
import RecipeListEntry from './recipeListEntry'
import Recipe from './recipe'

import Ionicons from 'react-native-vector-icons/Ionicons';
//====================================================
class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeListIndex: this.props.screenProps.recipeListIndex,
      selectedRecipe: undefined,
      fadeAnim: new Animated.Value(0),
      showRecipe: false
    };
    this.selectRecipe = this.selectRecipe.bind(this);
    this.recipeBack = this.recipeBack.bind(this);
  }

  static navigationOptions = {
    tabBarColor: 'dodgerblue',
    tabBarIcon: () => {
      return <Ionicons name='ios-list' size={25} color='white' />;
    },
    tabBarOnPress: ({navigation}) => {
      navigation.navigate('Recipes');
      let {recipes, searchRecipes} = navigation.getScreenProps();
      if (!recipes) {
        searchRecipes();
      }
    }
  }
  //====================================================
  componentDidMount() {
    Animated.timing(this.state.fadeAnim,
      {
        toValue: 1,
        duration: 2000,
      }
    ).start();
  }

  //====================================================
  selectRecipe(recipe) {
    this.setState({
      selectedRecipe: recipe,
      showRecipe: true
    });
  }

  recipeBack() {
    this.setState({
      selectedRecipe: undefined,
      showRecipe: false
    });
  }
  //====================================================
  render() {
    if (this.props.screenProps.recipes) {
      return (
        <View style={styles.container}>
          <FlatList style={styles.list}
            data={this.props.screenProps.recipes}
            extraData={this.state.recipeListIndex}
            renderItem={
              ({ item }) => (
                <View>
                  <RecipeListEntry recipe={item} selectRecipe={this.selectRecipe} />
                </View>
              )
            }
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            horizontal={false}
          />
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.showRecipe}
            onRequestClose={() => {
              this.setState({
                showRecipe: false
              })
            }}>
            <Recipe selectedRecipe={this.state.selectedRecipe} email={this.props.screenProps.email} recipeBack={this.recipeBack} />
          </Modal>
        </View>
      );
    } else {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      );
    }
  }
}

export default RecipeList;

