import React from 'react';
import { View, Text, ScrollView, Dimensions, Alert, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

import IP from '../../IP.js';
class AddMissing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  addMissingToCart() {
    axios.post(`http://${IP}/api/groceryList`, {
      email: this.props.email,
      shouldReplace: false,
      ingredients: this.props.missing
    })
      .then(() => {
        this.props.closeMissing();
        this.props.getUserGroceries();
      })
      .catch((err, a) => {
        console.log('ERROR converting units', err.response.request.response);
        Alert.alert('Invalid unit conversion', err.response.request.response);
      });
  }
  render() {
    return (
      <ScrollView
        width={Dimensions.get('window').width / 1.2}
        alignSelf='center'
        flex={0.8}
        onLayout={() => { this.forceUpdate() }}
      >
        <Text
          style={{
            fontSize: 17
          }}>Add the following to your Grocery List?</Text>
        {/* {this.props.missing.map((item, i) =>
          <Text key={i}>{item.quantity}{item.unit} {item.ingredient}</Text>
        )} */}
        {this.props.missing.map((item, i) => {
          <TextInput
            placeholder={item.quantity.toString() + item.unit + ' ' + item.ingredient}
            value={item.ingredient}
            onChangeText={(text) => this.setState({ text })}
          />
        })}



        <View
          flexDirection='row'
        >
          <Button
            title="Yes"
            onPress={() => {
              this.addMissingToCart();
            }}
          />
          <Button
            title="No"
            buttonStyle={{
              backgroundColor: 'red'
            }}
            onPress={() => {
              this.props.closeMissing();
            }}
          />

        </View>
      </ScrollView>
    )
  }
}
export default AddMissing;