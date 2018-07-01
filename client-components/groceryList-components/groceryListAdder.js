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
  //====================================================
  //====================================================

  //====================================================
  render() {
    return (
      <View 
      style={{ 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
      }}>

        <View 
        style={{ 
          // flex: 1, 
          flexDirection: 'row'
          }}>
        <TextInput
          placeholder='Add to cart Ex. "2 pound salmon"'
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
      </View>
    )
  }
}
export default GroceryListAdder;