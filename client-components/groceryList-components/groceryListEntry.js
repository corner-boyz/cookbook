import React from 'react';
import { View, Text, Modal } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';

//====================================================


class GroceryListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.ispurchased,
      showDelete: false,
    };
  }
  //====================================================
  render() {
    // console.log(`Render GroceryListEntry`, this.props);
    return (
      <View>
        <CheckBox
          title={this.props.item.quantity + this.props.item.unit + ' ' + this.props.item.ingredient}
          // iconRight={true}
          checked={this.props.item.ispurchased}
          checkedColor='green'
          uncheckedColor='gold'
          onPress={() => {
            // console.log(`Delete ${this.props.item.ingredient}?`);
            this.setState({
              showDelete: true
            })
          }}
          onIconPress={() => {
            this.setState({
              checked: !this.state.checked
            })
            this.props.item.ispurchased = !this.props.item.ispurchased
            this.props.saveCheckboxes();
          }}
        />
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.showDelete}
          onRequestClose={() => {
            this.setState({
              showDelete: false
            })
          }} a
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text
              style={{ fontSize: 18 }}
            >Delete {this.props.item.ingredient} from Grocery List?
            </Text>
            <Button
              title='Delete'
              backgroundColor='red'
              rounded={true}
              onPress={() => {
                console.log('Deleting', this.props.item.ingredient);
                this.props.removeFromCart(this.props.item)
                this.setState({
                  showDelete: false
                })
              }}
            />
          </View>
        </Modal>
      </View>
    )
  }
}
export default GroceryListEntry;