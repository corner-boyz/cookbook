import React from 'react';
import { View, Text } from 'react-native';
import { Button, ListItem, CheckBox } from 'react-native-elements';

//====================================================


class GroceryListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }
  render() {
    console.log(`Render GroceryListEntry`, this.props);
    return (
      <View>
        <ListItem
          key={this.props.index}
          title={this.props.item.ingredient}
          subtitle={this.props.item.quantity + this.props.item.unit}
          hideChevron={true}
        />
        <CheckBox
          title='testing'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked}
          onPress={() => { this.setState({ checked: !this.state.checked }) }}
        />
      </View>
    )
  }
}
export default GroceryListEntry;