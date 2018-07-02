import React from 'react';
import { View, Picker, TextInput, Dimensions } from 'react-native'
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
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Button
          title='Selected to Pantry'
          rounded={true}
          backgroundColor='orange'
          onPress={() => {
            this.props.purchaseIngredients();
          }}
        />

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            width={Dimensions.get('window').width / 2}
            placeholder='Add to cart Ex. "2 pound salmon"'
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <Button
            title='Add to List'
            rounded={true}
            backgroundColor='limegreen'
            onPress={() => {
              this.props.addToCart(this.state.text)
              this.setState({
                text: ''
              })
            }}
          />
        </View>
      </View>
    )
  }
}
export default GroceryListAdder;

{/* <View style={{ flexDirection: 'row' }}>
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
</View> */}