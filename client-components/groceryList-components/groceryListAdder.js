import React from 'react';
import { View } from 'react-native'
import { Input } from 'react-native-elements'

//====================================================
class GroceryListAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      switcher: true,
      hide: true
    };
  }

  //====================================================
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Input
            blurOnSubmit={false}
            label='Add to Grocery List'
            placeholder='Ex. "2 pound salmon"'
            shake={true}
            inputContainerStyle={{
              borderWidth: 2,
              borderColor: 'orange',
              borderRadius: 20,
              marginTop: 10,
              marginBottom: 10,
              height: 40
            }}
            style={{ backgroundColor: 'white' }}
            value={this.state.text}
            onChangeText={(text) => this.setState({ text })}
            onSubmitEditing={() => {
              if (this.state.text.length > 0) {
                this.props.addToCart(this.state.text)
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
export default GroceryListAdder;