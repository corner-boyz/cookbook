import React from 'react';
import { View, Modal } from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import axios from 'axios';

import IP from '../../IP';
import Recipe from '../recipeList-components/recipe.js';

class HomeRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecipe: false
    };
  }
  //====================================================
  recipeBack() {
    this.setState({
      showRecipe: false
    });
    this.props.getUserRecipes();
  }

  deleteRecipeFromHome() {
    axios.patch(`http://${IP}/api/saverecipe`, { email: this.props.email, recipe: {id: this.props.item.recipeid} }).then((results) => {
      this.setState({
        isSaved: false
      });
      this.props.getUserRecipes();
    }).catch((err) => {
      console.log('ERROR deleting recipe', err);
      if (err.request._hasError || err.response.request.status === 404) {
        Alert.alert('Trouble connecting to server', 'Please try again later');
      }
    });
  }
  //====================================================
  render() {
    selectedRecipe = {
      id: this.props.item.recipeid,
      title: this.props.item.title,
      image: this.props.item.imageurl
    }
    return (
      <Swipeout
        right={[{text: 'Delete', type: 'delete', onPress: () => {this.deleteRecipeFromHome()}}]} 
        backgroundColor='transparent'>
        <View >
          <ListItem
            key={this.props.index}
            title={this.props.item.title}
            titleStyle={{
              fontSize: 20
            }}
            leftAvatar={{ source: { uri: this.props.item.imageurl } }}
            roundAvatar={true}
            onPress={() => {
              this.setState({ showRecipe: true });
            }}
            chevron={true}
            topDivider={true}
            containerStyle={{ backgroundColor: 'transparent' }}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.showRecipe}
            onRequestClose={() => {
              this.setState({
                showRecipe: false
              })
              this.props.getUserRecipes();
            }}>
            <Recipe selectedRecipe={selectedRecipe} email={this.props.email} recipeBack={this.recipeBack} getUserRecipes={this.props.getUserRecipes} ingredients={this.props.ingredients} getUserGroceries={this.props.getUserGroceries} getIngredients={this.props.getIngredients} searchRecipes={this.props.searchRecipes} />
          </Modal>
        </View >
      </Swipeout>
    )
  }
}
export default HomeRecipes;