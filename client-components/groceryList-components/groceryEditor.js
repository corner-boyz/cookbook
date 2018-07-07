import React from 'react';
import { Text, View, Picker, TextInput } from 'react-native';
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
          width={30}
          placeholder={(this.props.item.quantity).toString()}
          keyboardType='phone-pad'
          onChangeText={(text) => {
            this.setState({ text })
            this.props.item.quantity = Number(text)
          }}
          value={this.state.text}
        />
        <Picker
          selectedValue={this.props.item.unit}
          style={{
            height: 35,
            width: 100,
            backgroundColor: 'lightgray'
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