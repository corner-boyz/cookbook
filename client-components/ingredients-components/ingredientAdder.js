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
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <TextInput
          width={250}
          placeholder='Add an ingredient to your pantry'
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          title='Submit'
          rounded={true}
          backgroundColor='limegreen'
          onPress={() => {
            console.log(this.state.text);
            this.props.submitIngredient(this.state.text)
          }}
        />
      </View>
    )
  }
}
export default IngredientAdder;