import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    console.log(`Render Complete`, this.props);
    return (
      <View>
        <Text>Remove following from your Pantry?</Text>
        {this.props.ingredients.map((item, i) =>
          <Text key={i}>{item.original}</Text>
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
export default Complete;