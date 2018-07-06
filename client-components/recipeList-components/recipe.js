import React from 'react';
import { Text, View, ScrollView, Image, ActivityIndicator, Dimensions, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import AddMissing from './addMissing.js';
import Completed from './completed.js';

import { styles } from '../../styles';

import IP from '../../IP';
//====================================================
class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      missing: [],
      addMissing: false,
      completed: false,
    };
    this.closeMissing = this.closeMissing.bind(this);
  }
  //====================================================
  componentDidMount() {
    this.findRecipe();
    this.selectUserRecipe();
  }
  //====================================================
  closeMissing() {
    this.setState({
      addMissing: false
    });
  }
  findRecipe() {
    axios.get(`http://${IP}/api/recipe/${this.props.selectedRecipe.id}`).then((results) => {
      this.setState({
        recipeDetails: results.data
      });
    }).catch((err) => {
      if (err.response && err.response.request.status === 404) {
        Alert.alert('Trouble connecting to recipe database', 'Please try again later');
      }
    });
  }

  compareIngredients() {
    axios.post(`http://${IP}/api/comparetorecipe`, { recipe: this.state.recipeDetails.extendedIngredients, ingredients: this.props.ingredients }).then((results) => {
      console.log('COMPARED', results.data);
      this.setState({
        missing: results.data
      })

    }).catch((err) => {
      console.log('ERROR comparing ingredients to recipe', err);
    });
  }

  parseIngredients() {
    axios.post(`http://${IP}/api/parse`, { ingredients: this.state.recipeDetails.extendedIngredients }).then((results) => {
      console.log('COMPARED', results.data);
      this.setState({
        recipeIngredients: results.data
      });
    }).catch((err) => {
      console.log('ERROR comparing ingredients to recipe', err);
    });
  }

  saveRecipe() {
    // console.log('id:', this.props.selectedRecipe.id, 'title', this.props.selectedRecipe.title, 'image', this.props.image)
    axios.post(`http://${IP}/api/saverecipe`, { email: this.props.email, recipe: { id: this.props.selectedRecipe.id, title: this.props.selectedRecipe.title, image: this.props.selectedRecipe.image, sourceUrl: this.state.recipeDetails.sourceUrl } }).then((results) => {
      this.setState({
        isSaved: true
      });
      this.props.getUserRecipes();
    }).catch((err) => {
      console.log('ERROR SAVING RECIPE', err);
    });
  }

  deleteRecipe() {
    axios.patch(`http://${IP}/api/saverecipe`, { email: this.props.email, recipe: { id: this.props.selectedRecipe.id, title: this.props.selectedRecipe.title, image: this.props.selectedRecipe.image } }).then((results) => {
      this.setState({
        isSaved: false
      });
      this.props.getUserRecipes();
    }).catch((err) => {
      console.error('ERROR DELETING RECIPE', err);
    });
  }

  selectUserRecipe() {
    axios.get(`http://${IP}/api/saverecipe/${this.props.selectedRecipe.id}/${this.props.email}`).then((results) => {
      this.setState({
        isSaved: results.data.length > 0
      });
      // setTimeout(() => console.log(this.state.isSaved), 1000);
    }).catch((err) => {
      console.log('ERROR SELECTING RECIPE', err);
    });
  }
  //====================================================
  convertMinutes(time) {
    let hours = time / 60;
    let rhours = Math.floor(time / 60);
    let minutes = Math.round((hours - rhours) * 60);
    let strHour = ' hr';
    let strMinute = ' min';
    if (rhours > 1) {
      strHour = ' hrs'
    }
    if (minutes > 1) {
      strMinute = ' mins'
    }
    if (rhours && minutes) {
      return (rhours.toString() + strHour + ' ' + minutes.toString() + strMinute);
    }
    if (rhours) {
      return (rhours.toString() + strHour);
    }
    return minutes.toString() + strMinute;
  }
  //====================================================
  render() {
    const ingredientRender = ({ item, index }) => <Text key={index}>{item.original}</Text>
    const stepsRender = ({ item, index }) => <Text key={index}>{item.number}. {item.step} </Text>

    if (this.state.recipeDetails) {
      return (
        <ScrollView
          width={Dimensions.get('window').width}
          alignSelf='center'
          onLayout={() => { this.forceUpdate() }}
          paddingTop={25}
        >
          <View
            // style={styles.container}
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >

            {this.props.email && !this.state.isSaved ?
              <Button
                title="Save Recipe"
                rounded={true}
                buttonStyle={{
                  backgroundColor: 'green'
                }}
                onPress={() => {
                  this.saveRecipe();
                }}
              /> :
              <Button
                title="Remove Recipe"
                rounded={true}
                buttonStyle={{
                  backgroundColor: 'red'
                }}
                onPress={() => {
                  this.deleteRecipe();
                }}
              />
            }
            <Text style={{ fontWeight: 'bold' }}>{this.state.recipeDetails.title}</Text>
            <Image
              style={styles.recipeImage}
              source={{ uri: this.state.recipeDetails.image }}
            />

            <View
              style={{
                flex: 1,
                width: Dimensions.get('window').width / 1.2,
                alignItems: 'flex-start'
              }}
            >
              {this.state.recipeDetails.preparationMinutes ?
                <Text style={{ fontWeight: 'bold' }}>Time</Text>
                : undefined}
              {this.state.recipeDetails.preparationMinutes ?
                <Text>Preparation: {this.convertMinutes(this.state.recipeDetails.preparationMinutes)}</Text>
                : undefined}
              {this.state.recipeDetails.preparationMinutes ?
                <Text>Cooking: {this.convertMinutes(this.state.recipeDetails.cookingMinutes)}</Text>
                : undefined}
              {this.state.recipeDetails.preparationMinutes ?
                <Text>Ready In: {this.convertMinutes(this.state.recipeDetails.readyInMinutes)}</Text>
                : undefined}
              {this.state.recipeDetails.diets.length ?
                <View>
                  <Text style={{ fontWeight: 'bold' }}>Diet</Text>
                  {this.state.recipeDetails.diets.map((diet, i) => (
                    <Text key={i}>{diet}</Text>
                  ))}
                </View> : undefined}
              {this.state.recipeDetails.extendedIngredients.length ?
                <View>
                  <Text style={{ fontWeight: 'bold' }}>Ingredients</Text>
                  {this.state.recipeDetails.extendedIngredients.map((ingredient, i) => (
                    <Text key={i}>{ingredient.original}</Text>
                  ))}
                </View> : undefined}
              <Button
                title="Compare"
                buttonStyle={{
                }}
                onPress={() => {
                  this.compareIngredients();
                  this.setState({
                    addMissing: true
                  })
                }}
              />
              {this.state.recipeDetails.analyzedInstructions.length ?
                <View>
                  <Text style={{ fontWeight: 'bold' }}>Instructions</Text>
                  {this.state.recipeDetails.analyzedInstructions[0].steps.map((step, i) => (
                    <Text key={i}>{step.number}. {step.step}</Text>
                  ))}
                </View> : undefined}
              <Button
                title='Complete!'
                onPress={() => {
                  console.log('Completed');
                  this.parseIngredients();
                  this.setState({
                    completed: true
                  })
                }}
              />
              <Modal
                animationType='slide'
                visible={this.state.addMissing}
                onRequestClose={() => {
                  this.setState({ addMissing: false });
                }}
              ><AddMissing missing={this.state.missing} email={this.props.email} getUserGroceries={this.props.getUserGroceries} closeMissing={this.closeMissing} />
              </Modal>
              <Modal
                animationType='slide'
                visible={this.state.completed}
                onRequestClose={() => {
                  this.setState({ completed: false })
                }}
              ><Completed ingredients={this.state.recipeIngredients} email={this.props.email} getUserGroceries={this.props.getUserGroceries} />
              </Modal>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      );
    }
  }
}

export default Recipe;