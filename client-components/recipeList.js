import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Animated, Modal, ImageBackground, Dimensions } from 'react-native';

import { styles } from '../styles'
import RecipeListEntry from './recipeList-components/recipeListEntry'
import Recipe from './recipeList-components/recipe'

import Ionicons from 'react-native-vector-icons/Ionicons';
//====================================================
class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeListIndex: this.props.screenProps.recipeListIndex,
      selectedRecipe: undefined,
      fadeAnim: new Animated.Value(0),
      showRecipe: false,
      rows: Dimensions.get('window').width < Dimensions.get('window').height ? 2 : 4
    };
    this.selectRecipe = this.selectRecipe.bind(this);
    this.recipeBack = this.recipeBack.bind(this);
  }

  static navigationOptions = {
    tabBarColor: 'mediumblue',
    tabBarIcon: () => {
      return <Ionicons name='ios-list' size={25} color='white' />;
    },
    tabBarOnPress: ({ navigation }) => {
      navigation.navigate('Recipes');
      let { recipes, searchRecipes } = navigation.getScreenProps();
      if (!recipes) {
        searchRecipes();
      }
    }
  }
  //====================================================
  componentDidMount() {
    // Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 1000, }).start();
  }

  //====================================================
  selectRecipe(recipe) {
    // console.log('TESTING: ', recipe.id);
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
    if (Array.isArray(this.props.screenProps.recipes) && this.props.screenProps.recipes.length) {
      return (
        <ImageBackground
          style={[styles.container, {
            backgroundColor: 'white',
            justifyContent: 'center'
          }]}
          source={require('../media/creme.jpg')}
          blurRadius={0}
          onLayout={() => {
            // console.log('Rotated');
            Dimensions.get('window').width < Dimensions.get('window').height ? this.setState({ rows: 2 }) : this.setState({ rows: 4 })

            this.forceUpdate();

          }}
        >
          <FlatList style={styles.list}
            key={this.state.rows}
            data={this.props.screenProps.recipes}
            extraData={this.state.recipeListIndex}
            renderItem={
              ({ item }) => (
                <View style={{ padding: 5, }}>
                  <RecipeListEntry recipe={item} selectRecipe={this.selectRecipe} />
                </View>
              )
            }
            keyExtractor={(item) => item.id.toString()}
            numColumns={this.state.rows}
            horizontal={false}
          />
          <Modal
            animationType="slide"
            visible={this.state.showRecipe}
            onRequestClose={() => {
              this.setState({
                showRecipe: false
              })
            }}>
            <Recipe selectedRecipe={this.state.selectedRecipe} email={this.props.screenProps.email} recipeBack={this.recipeBack} getUserRecipes={this.props.screenProps.getUserRecipes} ingredients={this.props.screenProps.ingredients} />
          </Modal>
        </ImageBackground>
      );
    } else if (Array.isArray(this.props.screenProps.recipes) && !this.props.screenProps.recipes.length) {
      return (
        <ImageBackground
          style={[styles.container, {
            backgroundColor: 'white',
            justifyContent: 'center'
          }]}
          source={require('../media/creme.jpg')}
          blurRadius={0}
        >
          <Text style={styles.spinner}>Add ingredients to pantry to generate recipes</Text>
        </ImageBackground>
      );

    } else {
      return (
        <ImageBackground
          style={[styles.container, {
            backgroundColor: 'white',
            justifyContent: 'center'
          }]}
          source={require('../media/creme.jpg')}
          blurRadius={0}
        >
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        </ImageBackground>
      );
    }
  }
}

export default RecipeList;

