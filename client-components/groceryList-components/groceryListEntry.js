import React from 'react';
import { View, Text, Modal, ImageBackground } from 'react-native';
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
          onPress={() => {
            this.props.editMode();
          }}
          onLongPress={() => {
            this.setState({
              showDelete: true
            })
            // this.props.editMode();
          }}
          containerStyle={{ backgroundColor: 'transparent' }}
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
          <ImageBackground
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            source={require('../../media/4.jpg')}
            blurRadius={0}
            onLayout={() => {
              this.forceUpdate();
            }}
          >
            <Text
              style={{ fontSize: 20 }}
            >Delete {this.props.item.ingredient} from Grocery List?
            </Text>
            <Button
              title='Delete'
              buttonStyle={{
                backgroundColor: 'red',
                marginTop: 10
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
          </ImageBackground>
        </Modal>
      </View>
    )
  }
}
export default GroceryListEntry;