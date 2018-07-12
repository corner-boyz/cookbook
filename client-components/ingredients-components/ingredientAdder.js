import React from 'react';
import { View } from 'react-native'
import { Input } from 'react-native-elements'
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
        <View style={{ flexDirection: 'row' }}>
          <Input
            blurOnSubmit={false}
            label='Add to Pantry'
            placeholder='Ex. "2 pound salmon"'
            shake={true}
            inputContainerStyle={{
              borderWidth: 2,  // size/width of the border
              borderColor: 'orange',  // color of the border
              borderRadius: 20,
              marginTop: 10,
              marginBottom: 10,
              height: 40,
            }}
            value={this.state.text}
            onChangeText={(text) => this.setState({ text })}
            onSubmitEditing={() => {
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