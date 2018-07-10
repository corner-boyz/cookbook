import React from 'react';
import { View, Linking } from 'react-native';
import { ListItem } from 'react-native-elements';

class HomeExtensionRecipes extends React.Component {
  constructor(props) {
    super(props);
  }
  //====================================================
  render() {
    return (
      <View >
        <ListItem
          key={this.props.index}
          title={this.props.item.title}
          onPress={() => {
            Linking.openURL(this.props.item.sourceurl);
          }}
          titleStyle={{
            fontSize: 20
          }}
          chevron={true}
          topDivider={true}
          containerStyle={{ backgroundColor: 'transparent' }}
        />
      </View >
    )
  }
}
export default HomeExtensionRecipes;