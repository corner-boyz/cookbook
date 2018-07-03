import React from 'react';
import { View, Picker, TextInput, Dimensions, Switch } from 'react-native'
import { Button } from 'react-native-elements'
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

        <Switch
          onValueChange={() => {
            this.setState({
              switcher: !this.state.switcher
            })
            // console.log(this.state.switcher);
          }}
          value={this.state.switcher}
          tintColor='red'
        />
        {this.state.switcher === true ?
          <Button
            title='Selected => Pantry'
            rounded={true}
            backgroundColor='orange'
            onPress={() => {
              this.props.purchaseIngredients();
            }}
          />
          :
          <Button
            title='Delete Selected'
            rounded={true}
            backgroundColor='red'
            onPress={() => {
              this.props.deleteIngredients();
            }}
          />
        }

        <View style={{ flexDirection: 'row' }}>
          {/* <Button
            title=''
            rounded={true}
            icon={{ name: 'ios-camera', type: 'ionicon' }}
            backgroundColor='red'
            onPress={() => {
              console.log('Firing');
            }}
          /> */}
          <TextInput
            width={Dimensions.get('window').width / 2}
            placeholder='Add to cart Ex. "2 pound salmon"'
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
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
          {/* <Button
            title='Add to List'
            rounded={true}
            backgroundColor='limegreen'

            onPress={() => {
              this.props.addToCart(this.state.text)
              this.setState({
                text: ''
              })
            }}
          /> */}
        </View>
      </View>
    )
  }
}
export default GroceryListAdder;