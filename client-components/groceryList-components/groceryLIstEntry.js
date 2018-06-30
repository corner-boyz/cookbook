import React from 'react';
import { View, Text } from 'react-native';
import { Button, ListItem, CheckBox } from 'react-native-elements';

//====================================================


class GroceryListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.ispurchased
    };
  }
  render() {
    // console.log(`Render GroceryListEntry`, this.props);
    return (
      <View>
        <CheckBox
          title={this.props.item.quantity + this.props.item.unit + ' ' + this.props.item.ingredient}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          iconRight={true}
          checked={this.props.item.ispurchased}
          onPress={() => {
            this.setState({
              checked: !this.state.checked
            })
            this.props.item.ispurchased = !this.props.item.ispurchased
            // console.log(this.props.item.ispurchased);
          }}
        />
      </View>
    )
  }
}
export default GroceryListEntry;