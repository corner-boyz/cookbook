import React from 'react';
import { View, Text, Modal } from 'react-native';
import { Button, CheckBox, ListItem } from 'react-native-elements';

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
    return (
      <View>
        <ListItem
          title={this.props.item.ingredient}
          subtitle={this.props.item.quantity.toString() + (this.props.item.unit || '')}
          leftAvatar={{ source: { uri: this.props.item.imageurl || 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Food-Dome-512.png' } }}
          roundAvatar={true}
          topDivider={true}
          checkBox={{
            checked: this.props.item.ispurchased,
            checkmark: this.props.item.ispurchased,
            checkmarkColor: 'green',
            onIconPress: () => {
              this.props.item.ispurchased = !this.props.item.ispurchased
              this.props.saveCheckboxes();
              this.forceUpdate();
            }
          }}
          onLongPress={() => {
            this.setState({
              showDelete: true
            })
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
              buttonStyle={{
                backgroundColor: 'red'
              }}
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