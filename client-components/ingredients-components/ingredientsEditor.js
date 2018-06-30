import React from 'react';
import { Text, View, Picker } from 'react-native';
import { Button } from 'react-native-elements';
//====================================================
class IngredientsEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  //====================================================
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Picker
          selectedValue={this.props.item.quantity}
          style={{
            height: 40,
            width: 50,
            backgroundColor: 'gray'
          }}
          mode='dropdown'
          onValueChange={(itemValue) => {
            this.props.item.quantity = itemValue
            this.forceUpdate();
          }}>
          {this.props.numbers.map((item, index) =>
            <Picker.Item
              key={index}
              label={item.toString()}
              value={item}
            />
          )}
        </Picker>
        <Picker
          selectedValue={this.props.item.unit}
          style={{
            height: 40,
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
          style={{ flex: 1, flexDirection: 'row', backgroundColor: 'gold' }}
        >{this.props.item.ingredient}
        </Text>
      </View>
    )
  }
}
export default IngredientsEditor;