import React from 'react';
import { View, Text } from 'react-native';
//====================================================
class IngredientEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  //====================================================
  render() {
    // console.log(`Render IngredientEntry `, this.props);
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text
          style={{ flex: 1, flexDirection: 'row', backgroundColor: 'yellow' }}
        >{this.props.item.quantity}{this.props.item.unit}
        </Text>
        <Text
          style={{ flex: 1, flexDirection: 'row', backgroundColor: 'gold' }}
        >{this.props.item.ingredient}
        </Text>
      </View>
    )
  }
}
export default IngredientEntry;