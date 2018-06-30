import React from 'react';
import { View, Picker, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
//====================================================
class IngredientAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      selectedUnit: '',
      name: '',
    };
  }
  //====================================================
  render() {
    return (
      <View>
        <View style={{ alignItems: 'flex-end' }}>
          <Button
            title='Edit List'
            rounded={true}
            backgroundColor='limegreen'
            onPress={() => {
              this.props.editMode();
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          {/* <Button
            title=''
            rounded={true}
            raised={true}
            backgroundColor='red'
            icon={{ name: 'ios-camera', type: 'ionicon' }}
            onPress={() => {
              console.log('Open Camera');
            }}
          /> */}
          <Picker
            selectedValue={this.state.quantity}
            style={{
              height: 40,
              width: 50,
              backgroundColor: 'gray'
            }}
            mode='dropdown'
            prompt='Quantity'
            onValueChange={(itemValue) => this.setState({ quantity: itemValue })}>
            {this.props.numbers.map((item, index) =>
              <Picker.Item
                key={index}
                label={item.toString()}
                value={item}
              />
            )}
          </Picker>
          <Picker
            selectedValue={this.state.selectedUnit}
            style={{
              height: 40,
              width: 100,
              backgroundColor: 'lightgray'
            }}
            prompt='Units'
            mode='dialog'
            onValueChange={(itemValue) => this.setState({ selectedUnit: itemValue })}>
            {this.props.units.map((item, index) =>
              <Picker.Item
                key={index}
                label={item.name}
                value={item.abrv}
              />
            )}
          </Picker>
          <TextInput
            style={{
              height: 40,
              width: 150
            }}
            placeholder='Add an Ingredient'
            onChangeText={(text) => {
              this.setState({ name: text })
            }
            }
          />
          <Button
            title="Add"
            raised={true}
            rounded={true}
            underlayColor='red'
            icon={{ name: 'keyboard-arrow-up' }}
            backgroundColor='orange'
            onPress={() => {
              this.props.submitIngredient(this.state.quantity, this.state.selectedUnit, this.state.name);
              this.setState({
                quantity: 0,
                selectedUnit: '',
                name: ''
              })
            }}
          />
        </View>
      </View>
    )
  }
}
export default IngredientAdder;