import React from 'react';
import { View, Picker, TextInput, Dimensions, Switch } from 'react-native'
import { Button, Input } from 'react-native-elements'
//====================================================
class GroceryListAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      switcher: true,
    };
  }

  //====================================================
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        {/* <Switch
          onValueChange={() => {
            this.setState({
              switcher: !this.state.switcher
            })
            // console.log(this.state.switcher);
          }}
          value={this.state.switcher}
          tintColor='red'
          
        /> */}
        {this.state.switcher === true ?
          <Button
            title='Selected => Pantry'
            rounded={true}
            backgroundColor='orange'
            onPress={() => {
              this.props.purchaseIngredients();
            }}
            onLongPress={() => {
              this.setState({ switcher: false })
            }}
          />
          :
          <Button
            title='Delete Selected'
            rounded={true}
            buttonStyle={{ backgroundColor: 'red' }}
            onPress={() => {
              this.props.deleteIngredients();
            }}
            onLongPress={() => {
              this.setState({ switcher: true })
            }}
          />
        }
        <View style={{ flexDirection: 'row' }}>
          <Input
            label='Add to Grocery List'
            placeholder='Ex. "2 pound salmon"'

            shake={true}
            inputContainerStyle={{
              borderWidth: 2,  // size/width of the border
              borderColor: 'orange',  // color of the border
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

          {/* <TextInput
            width={Dimensions.get('window').width / 2}
            placeholder='Add to cart Ex. "2 pound salmon"'
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
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
          /> */}
        </View>
      </View>
    )
  }
}
export default GroceryListAdder;