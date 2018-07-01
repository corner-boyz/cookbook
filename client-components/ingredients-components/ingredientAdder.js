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
      text: ''
    };
  }
  //====================================================
  render() {
    return (
      <View style={{ alignItems: 'center' }}>

        <Button
          title='Edit List'
          rounded={true}
          backgroundColor='orange'
          onPress={() => {
            this.props.editMode();
          }}
        />

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            width={250}
            placeholder='Add to pantry Ex. "2 pound salmon"'
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <Button
            title='Submit'
            value={this.state.text}
            rounded={true}
            backgroundColor='limegreen'
            onPress={() => {
              if (this.state.text.length > 0) {
                this.props.submitIngredient(this.state.text)
                this.setState({
                  text: ''
                })
              }
              else {
                alert('Enter a valid ingredient')
              }
            }}
          />
        </View>
      </View>
    )
  }
}
export default IngredientAdder;