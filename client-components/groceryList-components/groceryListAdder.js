import React from 'react';
import { View, Picker, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
//====================================================
class GroceryListAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  //====================================================
  //====================================================
  //====================================================

  //====================================================
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TextInput
          placeholder='Add an ingredient to your shopping cart'
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          title='Submit'
          rounded={true}
          backgroundColor='limegreen'
          onPress={() => {
            console.log(this.state.text);
            this.props.addToCart(this.state.text)
            this.props.closeAdd();
          }}
        />
      </View>
    )
  }
}
export default GroceryListAdder;