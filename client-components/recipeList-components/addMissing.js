import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
class AddMissing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View>
        <Text style={{ fontSize: 17 }}>Add the following to your Grocery List?</Text>
        {this.props.missing.map((item, i) =>
          <Text key={i}>{item.quantity}{item.unit} {item.ingredient}</Text>
        )}
        <View
          flexDirection='row'
        >
          <Button
            title="Yes"
            onPress={() => {
              console.log('Yes');
            }}
          />
          <Button
            title="No"
            buttonStyle={{
              backgroundColor: 'red'
            }}
            onPress={() => {
              console.log('No');
            }}
          />

        </View>
      </View>
    )
  }
}
export default AddMissing;