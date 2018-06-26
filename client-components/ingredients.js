import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';

import { List, ListItem } from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons';
//==================================================== 'index' state is required for refreshing the ingredient's list; <FlatList /> is a pure component so it will not auto refresh normally
class Ingredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    }

  }
  //==================================================== NavBar component
  static navigationOptions = {
    tabBarColor: 'green',
    tabBarIcon: () => {
      return <Ionicons name='ios-basket' size={25} color='white' />;
    },
  }
  //====================================================
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.actions.goBack();
    }, 2000)

  }

  submitIngredient() {
    // console.log('Submitting new Ingredient...')
    let newIngredient = {
      name: this.props.screenProps.text,
      quantity: 99
    };
    this.props.screenProps.ingredients.push(newIngredient)
    this.setState({
      index: this.state.index + 1
    })
  }
  //====================================================
  render() {
    return (
      <View style={styles.container}>
        <Text>Here are your Ingredients:</Text>
        {/* <List
          // style={styles.list}
        > */}
        <FlatList
          style={styles.list}
          data={this.props.screenProps.ingredients}
          extraData={this.state.index}
          renderItem={
            ({ item }) =>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text
                  style={{ flex: 1, flexDirection: 'row', backgroundColor: 'gold' }}
                >{item.ingredient}</Text>
                <Text
                  style={{ flex: 1, flexDirection: 'row', backgroundColor: 'yellow' }}
                >{item.quantity}{item.unit}</Text>
              </View>
          }
          keyExtractor={(item, index) => item.ingredient}
        />
        {/* </List> */}
        <TextInput
          style={{ height: 40, width: 250 }}
          placeholder='Add an Ingredient'
          onChangeText={(text) => this.props.screenProps.text = text}
        />
        <Button
          title="submit"
          onPress={() => {
            this.submitIngredient();
          }}
        />
      </View>
    )
  }
}
//==================================================== 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: 350,
    backgroundColor: 'white'
    // justifyContent: 'center',
  }
});

export default Ingredients;