import React from 'react';
import { View, Linking } from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import axios from 'axios';

import IP from '../../IP';

class HomeExtensionRecipes extends React.Component {
  constructor(props) {
    super(props);
  }
  //====================================================
  deleteExtensionRecipeFromHome() {
    axios.patch(`http://${IP}/api/saverecipe`, { email: this.props.email, recipe: {id: this.props.item.recipeid} }).then((results) => {
      this.setState({
        isSaved: false
      });
      this.props.getUserExtensionRecipes();
    }).catch((err) => {
      console.log('ERROR deleting recipe', err);
      if (err.request._hasError || err.response.request.status === 404) {
        Alert.alert('Trouble connecting to server', 'Please try again later');
      }
    });
  }
  //====================================================
  render() {
    return (
      <Swipeout
        right={[{text: 'Delete', type: 'delete', onPress: () => {this.deleteExtensionRecipeFromHome()}}]} 
        backgroundColor='transparent'>
        <View >
          <ListItem
            key={this.props.index}
            title={this.props.item.title}
            onPress={() => {
              Linking.openURL(this.props.item.sourceurl);
            }}
            titleStyle={{
              fontSize: 20
            }}
            chevron={true}
            topDivider={true}
            containerStyle={{ backgroundColor: 'transparent' }}
          />
        </View >
      </Swipeout>
    )
  }
}
export default HomeExtensionRecipes;