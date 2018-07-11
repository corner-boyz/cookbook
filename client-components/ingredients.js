import React from 'react';
import axios from 'axios';
import { Text, View, FlatList, Modal, KeyboardAvoidingView, Animated, Alert, Dimensions, ImageBackground, RefreshControl } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Ionicons from 'react-native-vector-icons/Ionicons';

import IP from '../IP.js';
import IngredientEntry from './ingredients-components/ingredientEntry.js';
import IngredientsEditor from './ingredients-components/ingredientsEditor.js';
import IngredientAdder from './ingredients-components/ingredientAdder.js';
import { styles } from '../styles';

//==================================================== 'index' state is required for refreshing the ingredient's list; <FlatList /> is a pure component so it will not auto refresh normally
class Ingredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0),
      index: 0,
      units: [
        {
          name: 'Count',
          abrv: null
        },
        {
          name: 'Teaspoon',
          abrv: 'tsp',
        },
        {
          name: 'Tablespoon',
          abrv: 'Tbs',
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
          name: 'Milliliter',
          abrv: 'ml',
        },
        {
          name: 'Liter',
          abrv: 'l',
        }, {
          name: 'Kiloliter',
          abrv: 'kl',
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
          name: 'Gram',
          abrv: 'g',
        },
        {
          name: 'Kilogram',
          abrv: 'kg',
        }
      ],
      editMode: false,
      refreshing: false,
      ingredientsCopy: [],
      ingredientsCopyDeletedIngredients: []
    }

    this.submitIngredient = this.submitIngredient.bind(this);
    this.editIngredients = this.editIngredients.bind(this);
    this.editMode = this.editMode.bind(this);
  }
  //==================================================== NavBar component
  static navigationOptions = {
    tabBarColor: 'dodgerblue',
    tabBarIcon: () => {
      return <Ionicons name='ios-basket' size={25} color='white' />;
    },
  }
  //====================================================
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 1000 }).start();
  }
  //====================================================
  onRefresh() {
    this.props.screenProps.getIngredients();
    this.props.screenProps.getUserRecipes();
    this.props.screenProps.getUserGroceries();
    this.setState({refreshing: false});
  }

  removeIngredientFromArray(ingredient) {
    let filteredIngredientsCopy = this.state.ingredientsCopy.filter((item) => {
      return !(item.ingredient === ingredient.ingredient);
    });
    ingredient.quantity = 0;
    let temporary = this.state.ingredientsCopyDeletedIngredients;
    temporary.push(ingredient);
    this.setState({
      ingredientsCopy: filteredIngredientsCopy,
      ingredientsCopyDeletedIngredients: temporary
    });
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
            console.log('ERROR converting units', err.response.request.response);
            Alert.alert('Invalid unit conversion', err.response.request.response);
          })
      })
      .catch((err) => {
        console.log('ERROR submitting ingredients', err);
        if (err.request._hasError || err.response.request.status === 404) {
          Alert.alert('Trouble connecting to server', 'Please try again later');
        }
      })
  }

  editIngredients(ingredients = this.props.screenProps.ingredients) {
    let editedIngredients = {
      email: this.props.screenProps.email,
      shouldReplace: true,
      ingredients: []
    }

    ingredients.forEach((item) => {
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
        console.log('ERROR editing ingredients', err);
        if (err.request._hasError || err.response.request.status === 404) {
          Alert.alert('Trouble connecting to server', 'Please try again later');
        }
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
      <ImageBackground
        style={[styles.container, {
          backgroundColor: 'white',
          justifyContent: 'center'
        }]}
        source={require('../media/4.jpg')}
        blurRadius={0}
        onLayout={() => {
          this.forceUpdate();
        }}
      >
        <Animated.View style={{ ...this.props.style, opacity: this.state.fadeAnim }}>
          <Text style={{ fontSize: 22, paddingBottom: 10 }}>Welcome {this.props.screenProps.name}!</Text>
          <View flexDirection='row' justifyContent='space-between'>
            <Text onLongPress={() => { this.setState({ ingredientsCopy: JSON.parse(JSON.stringify(this.props.screenProps.ingredients)) }); this.editMode() }} style={{ fontSize: 20, fontWeight: 'bold' }}>Your Saved Pantry</Text>
            <Icon name='ios-more' type='ionicon' onPress={() => { this.setState({ ingredientsCopy: JSON.parse(JSON.stringify(this.props.screenProps.ingredients)) }); this.editMode() }} />
          </View>
          <FlatList
            style={[styles.list, { width: Dimensions.get('window').width / 1.1 }]}
            data={this.props.screenProps.ingredients}
            extraData={this.state.index}
            renderItem={({ item, index }) => <IngredientEntry item={item} index={index} editIngredients={this.editIngredients} editMode={this.editMode} />}
            keyExtractor={(item) => item.ingredient}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
                colors={['orange']}
                progressBackgroundColor='transparent'
              />
            }
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
          visible={this.state.editMode}
          onRequestClose={() => {
            this.setState({
              editMode: false,
              ingredientsCopy: JSON.parse(JSON.stringify(this.props.screenProps.ingredients))
            })
          }}>
          <ImageBackground
            style={[styles.container, {
            }]}
            source={require('../media/4.jpg')}
            blurRadius={0}
            onLayout={() => {
              this.forceUpdate();
            }}
          >
            <Text style={{ fontSize: 20 }}>Editing Mode</Text>
            <FlatList
              style={[styles.list, { width: Dimensions.get('window').width / 1.1 }]}
              data={this.state.ingredientsCopy}
              extraData={this.state.index}
              renderItem={({ item }) => {
                return (
                  <Swipeout
                    right={[{text: 'Delete', type: 'delete', onPress: () => {this.removeIngredientFromArray(item)}}]} 
                    backgroundColor='transparent'>
                    <IngredientsEditor item={item} units={this.state.units} />
                  </Swipeout>
                );
              }}
              keyExtractor={(item) => item.ingredient}
              keyExtractor={(item) => item.ingredient}
            />
            <Button
              title='Confirm'
              backgroundColor='limegreen'
              rounded={true}
              onPress={() => {
                this.editIngredients(this.state.ingredientsCopy.concat(this.state.ingredientsCopyDeletedIngredients));
                this.setState({
                  editMode: false,
                  ingredientsCopy: JSON.parse(JSON.stringify(this.props.screenProps.ingredients))
                })
              }} />
          </ImageBackground>
        </Modal>
      </ImageBackground>
    )
  }
}

export default Ingredients;