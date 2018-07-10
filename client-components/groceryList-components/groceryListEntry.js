import React from 'react';
import { View, Text, Modal, ImageBackground } from 'react-native';
import { Button, CheckBox, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
//====================================================


class GroceryListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.ispurchased,
    };
  }
  //====================================================
  render() {
    return (
      <Swipeout
        left={[{text: 'To Pantry', backgroundColor: '#2089DC', onPress: () => {this.props.item.ispurchased = true; this.props.purchaseIngredients([this.props.item])}}]}
        right={[{text: 'Delete', type: 'delete', onPress: () => {this.props.removeFromCart(this.props.item)}}]} 
        backgroundColor='transparent'>
        <View>
          <ListItem
            title={this.props.item.ingredient}
            subtitle={(this.props.item.quantity ? this.props.item.quantity.toString() : '0') + (this.props.item.unit || '')}
            leftAvatar={{ source: { uri: this.props.item.imageurl || 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Food-Dome-512.png' } }}
            roundAvatar={true}
            topDivider={true}
            titleStyle={{
              fontSize: 20
            }}
            subtitleStyle={{
              fontSize: 18
            }}
            checkBox={{
              checked: this.props.item.ispurchased,
              checkmark: this.props.item.ispurchased,
              checkmarkColor: 'green',
              onIconPress: () => {
                this.props.item.ispurchased = !this.props.item.ispurchased
                this.props.saveCheckboxes();
                this.forceUpdate();
              },
            }}
            containerStyle={{ backgroundColor: 'transparent' }}
          />
        </View>
      </Swipeout>
    )
  }
}
export default GroceryListEntry;