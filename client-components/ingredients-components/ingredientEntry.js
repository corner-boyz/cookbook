import React from 'react';
import { View, Text, Modal } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
//====================================================
class IngredientEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false
    };
  }
  //====================================================
  deleteIngredient() {
    this.props.item.quantity = 0;
    this.props.editIngredients();
    this.setState({
      showOptions: false
    })
  }
  //====================================================
  render() {
    // console.log(`Render IngredientEntry `, this.props);
    return (
      <View >
        <ListItem
          key={this.props.item.index}
          title={this.props.item.ingredient}

          subtitle={(this.props.item.quantity ? this.props.item.quantity.toString() : '∞') + (this.props.item.unit || '')}
          leftAvatar={{ source: { uri: this.props.item.imageurl || 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Food-Dome-512.png' } }}
          roundAvatar={true}
          onLongPress={() => {
            this.setState({
              showOptions: true
            })
          }}
          topDivider={true}
          containerStyle={{ backgroundColor: 'transparent' }}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showOptions}
          onRequestClose={() => {
            this.setState({
              showOptions: false
            })
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>

            <Text
              style={{ fontSize: 18 }}
            >Delete {this.props.item.ingredient} from pantry?
            </Text>
            <Button
              title='Delete'
              buttonStyle={{ backgroundColor: 'red' }}

              rounded={true}
              onPress={() => {
                console.log('Firing');
                this.deleteIngredient();
              }}
            />
          </View>
        </Modal>
      </View>
    )
  }
}
export default IngredientEntry;