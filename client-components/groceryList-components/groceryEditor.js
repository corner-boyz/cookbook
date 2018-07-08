import React from 'react';
import { Text, View, Picker, TextInput, Dimensions } from 'react-native';
import { Button, } from 'react-native-elements';
//====================================================
class GroceryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  //====================================================
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TextInput
          width={Dimensions.get('window').width / 10}
          placeholder={(this.props.item.quantity ? this.props.item.quantity.toString() : '0')}
          keyboardType='phone-pad'
          onChangeText={(text) => {
            this.setState({ text })
            this.props.item.quantity = Number(text)
          }}
          value={this.state.text}
          paddingLeft={10}
        />
        <Picker
          selectedValue={this.props.item.unit}
          style={{
            height: 35,
            width: 100,
            backgroundColor: 'transparent'
          }}
          mode='dropdown'
          onValueChange={(itemValue) => {
            this.props.item.unit = itemValue
            this.forceUpdate();
          }}>
          {this.props.units.map((item, index) =>
            <Picker.Item
              key={index}
              label={item.name}
              value={item.abrv}
            />
          )}
        </Picker>
        <Text
          style={{
            fontSize: 17,
            textAlignVertical: 'center',
          }}
        >{this.props.item.ingredient}
        </Text>
      </View>
    )
  }
}
export default GroceryEditor;