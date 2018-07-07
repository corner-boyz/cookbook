import React from 'react';
import { View, Modal, Linking } from 'react-native';
import { ListItem } from 'react-native-elements';
import Recipe from '../recipeList-components/recipe.js'

class HomeExtensionRecipes extends React.Component {
  constructor(props) {
    super(props);
  }
  //====================================================
  render() {
    return (
      <View >
        <ListItem
          key={this.props.index}
          title={this.props.item.title}
          onPress={() => {
            Linking.openURL(this.props.item.sourceurl);
          }}
          chevron={true}
          topDivider={true}
          containerStyle={{ backgroundColor: 'transparent' }}
        />
      </View >
    )
  }
}
export default HomeExtensionRecipes;