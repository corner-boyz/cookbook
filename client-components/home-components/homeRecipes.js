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
  componentDidMount() {

  }
  recipeBack() {
    this.setState({
      showRecipe: false
    });
    this.props.getUserRecipes();
  }

  //====================================================
  render() {
    selectedRecipe = {
      id: this.props.item.recipeid,
      title: this.props.item.title,
      image: this.props.item.imageurl
    }
    return (
      <View >
        <ListItem
          key={this.props.index}
          title={this.props.item.title}
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
          animationType="fade"
          transparent={false}
          visible={this.state.showRecipe}
          onRequestClose={() => {
            this.setState({
              showRecipe: false
            })
            this.props.getUserRecipes();
          }}>
          <Recipe selectedRecipe={selectedRecipe} email={this.props.email} recipeBack={this.recipeBack} getUserRecipes={this.props.getUserRecipes} ingredients={this.props.ingredients} getUserGroceries={this.props.getUserGroceries} />
        </Modal>

      </View >
    )
  }
}
export default HomeRecipes;