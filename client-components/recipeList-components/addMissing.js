import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
class AddMissing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
      </ScrollView>
    )
  }
}
export default AddMissing;