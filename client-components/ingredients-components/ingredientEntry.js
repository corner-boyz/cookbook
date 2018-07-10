import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
//====================================================
class IngredientEntry extends React.Component {
  constructor(props) {
    super(props);
  }
  //====================================================
  deleteIngredient() {
    this.props.item.quantity = 0;
    this.props.editIngredients();
  }
  //====================================================
  render() {
    return (
      <Swipeout
        right={[{ text: 'Delete', type: 'delete', onPress: () => { this.deleteIngredient() } }]}
        backgroundColor='transparent'>
        <View >
          <ListItem
            key={this.props.item.index}
            title={this.props.item.ingredient}
            subtitle={(this.props.item.quantity ? this.props.item.quantity.toString() : '0') + (this.props.item.unit || '')}
            leftAvatar={{ source: { uri: this.props.item.imageurl || 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Food-Dome-512.png' } }}
            // rightIcon={{
            //   name: 'ios-more',
            //   type: 'ionicon',
            //   onPress: () => {
            //     this.setState({
            //       showOptions: true
            //     })
            //   }
            // }}
            roundAvatar={true}
            titleStyle={{
              fontSize: 20
            }}
            subtitleStyle={{
              fontSize: 18
            }}
            topDivider={true}
            containerStyle={{ backgroundColor: 'transparent' }}
          />
        </View>
      </Swipeout>
    )
  }
}
export default IngredientEntry;