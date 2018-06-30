import React from 'react';
import { View, Modal } from 'react-native';
import { ListItem } from 'react-native-elements';
import Recipe from '../recipeList-components/recipe.js'


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
  }

  //====================================================
  render() {
    selectedRecipe = {
      id: this.props.item.recipeid
    }
    return (
      <View >
        <ListItem
          key={this.props.index}
          title={this.props.item.title}
          avatar={{ uri: this.props.item.imageurl }}
          roundAvatar={true}
          onPress={() => {
            // console.log(this.props.item.title);
            this.setState({ showRecipe: true });
          }}
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
          <Recipe selectedRecipe={selectedRecipe} recipeBack={this.recipeBack} />
        </Modal>

      </View >
    )
  }
}
export default HomeRecipes;