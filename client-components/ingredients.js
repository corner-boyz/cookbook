import React from 'react';
import axios from 'axios';
import IP from '../IP.js';
import IngredientEntry from './ingredients-components/ingredientEntry.js';
import IngredientsEditor from './ingredients-components/ingredientsEditor.js';
import IngredientAdder from './ingredients-components/ingredientAdder.js';
import { styles } from '../styles';

import { Text, View, FlatList, Modal, KeyboardAvoidingView, Animated, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
//==================================================== 'index' state is required for refreshing the ingredient's list; <FlatList /> is a pure component so it will not auto refresh normally
class Ingredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0),
      index: 0,
      units: [
        {
          name: '',
          abrv: null
        },
        {
          name: 'Tablespoon',
          abrv: 'tsp',
        },
        {
          name: 'Fluid ounce',
          abrv: 'fl-oz',
        },
        {
          name: 'Cup',
          abrv: 'cup',
        },
        {
          name: 'Pint',
          abrv: 'pnt',
        },
        {
          name: 'Quart',
          abrv: 'qt',
        },
        {
          name: 'Gallon',
          abrv: 'gal',
        },
        {
          name: 'Ounce',
          abrv: 'oz',
        },
        {
          name: 'Pound',
          abrv: 'lb',
        },
        {
          name: 'Liter',
          abrv: 'l',
        }
      ],
      editMode: false,
    }

    this.submitIngredient = this.submitIngredient.bind(this);
    this.editIngredients = this.editIngredients.bind(this);
    this.editMode = this.editMode.bind(this);
  }
  //==================================================== NavBar component
  static navigationOptions = {
    tabBarColor: 'deepskyblue',
    tabBarIcon: () => {
      return <Ionicons name='ios-basket' size={25} color='white' />;
    },
  }
  //====================================================
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 1000 }).start();
  }

  submitIngredient(newIngredient) {
    const ingArr = [newIngredient]
    axios.post(`http://${IP}/api/parse`, { ingredients: ingArr })
      .then((response) => {
        response.data[0].ispurchased = false
        axios.post(`http://${IP}/api/ingredients`, {
          email: this.props.screenProps.email,
          shouldReplace: false,
          ingredients: [response.data[0]]
        })
          .then(() => {
            this.props.screenProps.getIngredients();
          })
          .catch((err) => {
            console.log('ERROR converting units', err);
            Alert.alert('Invalid unit conversion', 'Please pick convertable unit');
          })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  editIngredients() {
    let editedIngredients = {
      email: this.props.screenProps.email,
      shouldReplace: true,
      ingredients: []
    }

    this.props.screenProps.ingredients.forEach((item) => {
      editedIngredients.ingredients.push(
        {
          ingredient: item.ingredient,
          quantity: item.quantity,
          unit: item.unit,
        }
      )
    })
    // console.log('Edited: ', editedIngredients);
    axios.post(`http://${IP}/api/ingredients`, editedIngredients)
      .then((response) => {
        // console.log(response.data);
        this.props.screenProps.getIngredients();
        this.setState({
          index: this.state.index + 1
        });
        // this.props.screenProps.recipeListIndex++;
      })
      .catch((err) => {
        console.error(err);
      })
  }

  editMode() {
    this.setState({
      editMode: true
    })
  }

  //====================================================
  render() {
    return (
      <View style={[styles.container, { backgroundColor: 'white', }]}>
        <Animated.View style={{ ...this.props.style, opacity: this.state.fadeAnim }}>
          <Text onLongPress={() => { this.setState({ editMode: true }) }} style={{ fontSize: 18 }}>Here are your Ingredients</Text>
          <FlatList
            style={[styles.list, { width: 350 }]}
            data={this.props.screenProps.ingredients}
            extraData={this.state.index}
            renderItem={({ item, index }) => <IngredientEntry item={item} index={index} editIngredients={this.editIngredients} />}
            keyExtractor={(item) => item.ingredient}
          />
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} enabled>
            <IngredientAdder
              editMode={this.editMode}
              submitIngredient={this.submitIngredient}
            />
          </KeyboardAvoidingView>
        </Animated.View>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.editMode}
          onRequestClose={() => {
            this.setState({
              editMode: false
            })
          }}>
          <View style={[styles.container, { backgroundColor: 'white', }]}>
            <Text>Editing Mode</Text>
            <FlatList
              style={[styles.list, { width: 350 }]}
              data={this.props.screenProps.ingredients}
              extraData={this.state.index}
              renderItem={({ item }) => <IngredientsEditor item={item} units={this.state.units} />}
              keyExtractor={(item) => item.ingredient}
            />
            <Button
              title='Confirm'
              backgroundColor='limegreen'
              rounded={true}
              onPress={() => {
                this.editIngredients();
                this.setState({
                  editMode: false,
                })
              }} />
          </View>
        </Modal>
      </View>
    )
  }
}

export default Ingredients;