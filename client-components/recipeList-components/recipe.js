import React from 'react';
import { Text, View, ScrollView, Image, ActivityIndicator, Dimensions, Modal, ImageBackground, Alert } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AddMissing from './addMissing.js';
import Completed from './completed.js';

import { styles } from '../../styles';
import pluralize from 'pluralize';

import IP from '../../IP';
//====================================================
class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      missing: [],
      recipeIngredients: [],
      addMissing: false,
      completed: false,
      timeCollapsed: false,
      dietCollapsed: true,
      nutritionCollapsed: true,
      ingredientsCollapsed: false,
      instructionsCollapsed: false,
      equipmentCollapsed: true,
      checked: false,
      index: 0,
    };
    this.closeMissing = this.closeMissing.bind(this);
    this.closeCompleted = this.closeCompleted.bind(this);
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
  closeCompleted() {
    this.setState({
      completed: false
    });
  }
  findRecipe() {
    axios.get(`http://${IP}/api/recipe/${this.props.selectedRecipe.id}`).then((results) => {
      if (results.data.analyzedInstructions.length) {
        results.data.analyzedInstructions[0].steps.map((step) => {
          step.checked = false
        })
      }
      this.setState({
        recipeDetails: results.data
      });
      this.compareIngredients();
      this.parseIngredients();
    }).catch((err) => {
      if (err.response && err.response.request.status === 404) {
        Alert.alert('Trouble connecting to recipe database', 'Please try again later');
      }
    });
  }
  // this.state.recipeDetails.analyzedInstructions.length ? this.state.recipeDetails.analyzedInstructions[0].steps.map
  compareIngredients() {
    axios.post(`http://${IP}/api/comparetorecipe`, { recipe: this.state.recipeDetails.extendedIngredients, ingredients: this.props.ingredients }).then((results) => {
      this.setState({
        missing: results.data
      });
      this.state.recipeDetails.extendedIngredients.map((item) => {
        item.checked = true;
        this.state.missing.forEach((item2) => {
          if (pluralize.singular(item.name).includes(item2.ingredient) || item2.ingredient.includes(pluralize.singular(item.name))) {
            item.checked = false;
          }
        })
        this.forceUpdate();
      })
    }).catch((err) => {
      console.log('ERROR comparing ingredients to recipe', err);
    });
  }

  parseIngredients() {
    axios.post(`http://${IP}/api/formatparse`, { ingredients: this.state.recipeDetails.extendedIngredients }).then((results) => {
      this.setState({
        recipeIngredients: results.data
      });
    }).catch((err) => {
      console.log('ERROR parsing ingredients', err);
    });
  }

  saveRecipe() {
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
    axios.patch(`http://${IP}/api/saverecipe`, { email: this.props.email, recipe: { id: this.props.selectedRecipe.id } }).then((results) => {
      this.setState({
        isSaved: false
      });
      this.props.getUserRecipes();
    }).catch((err) => {
      console.log('ERROR deleting recipe', err);
      if (err.request._hasError || err.response.request.status === 404) {
        Alert.alert('Trouble connecting to server', 'Please try again later');
      }
    });
  }

  selectUserRecipe() {
    axios.get(`http://${IP}/api/saverecipe/${this.props.selectedRecipe.id}/${this.props.email}`).then((results) => {
      this.setState({
        isSaved: results.data.length > 0
      });
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
    if (this.state.recipeDetails) {
      const wantedNutrients = ['Calories', 'Fat', 'Saturated Fat', 'Carbohydrates', 'Sugar', 'Cholesterol', 'Sodium', 'Protein', 'Fiber'];
      let equipment = [];
      if (this.state.recipeDetails.analyzedInstructions.length && this.state.recipeDetails.analyzedInstructions[0].steps.length) {
        this.state.recipeDetails.analyzedInstructions[0].steps.forEach((step, i) => {
          step.equipment.forEach((item) => {
            if (!equipment.includes(item.name)) {
              equipment.push(item.name);
            }
          });
        });
      }

      return (
        <ImageBackground
          style={[styles.container, {
          }]}
          source={require('../../media/4.jpg')}
          blurRadius={0}
          onLayout={() => {
            this.forceUpdate();
          }}
        >
          <ScrollView
            width={Dimensions.get('window').width}
            alignSelf='center'
            flex={0.9}
            onLayout={() => { this.forceUpdate() }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center'
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{this.state.recipeDetails.title}</Text>
              <Image
                style={styles.recipeImage}
                borderWidth={5}
                borderColor='lightgray'
                borderRadius={5}
                source={{ uri: this.state.recipeDetails.image }}
                marginBottom={5}
              />
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
              <View
                style={{
                  flex: 1,
                  width: Dimensions.get('window').width / 1.2,
                  alignItems: 'flex-start'
                }}
              >
                {this.state.recipeDetails.preparationMinutes || this.state.recipeDetails.cookingMinutes || this.state.recipeDetails.readyInMinutes ?
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }} onPress={() => { this.setState({ timeCollapsed: !this.state.timeCollapsed }) }}>Time {this.state.timeCollapsed ? <Ionicons name='ios-arrow-dropdown' size={20} color='black' /> : <Ionicons name='ios-arrow-dropright' size={20} color='black' />}</Text>
                  : undefined}
                <Collapsible collapsed={this.state.timeCollapsed}>
                  <View
                    style={{
                      paddingLeft: 15
                    }}
                  >
                    {this.state.recipeDetails.preparationMinutes ?
                      <Text style={{ fontSize: 20 }}>Preparation: {this.convertMinutes(this.state.recipeDetails.preparationMinutes)}</Text>
                      : undefined}
                    {this.state.recipeDetails.cookingMinutes ?
                      <Text style={{ fontSize: 20 }}>Cooking: {this.convertMinutes(this.state.recipeDetails.cookingMinutes)}</Text>
                      : undefined}
                    {this.state.recipeDetails.readyInMinutes ?
                      <Text style={{ fontSize: 20 }}>Ready In: {this.convertMinutes(this.state.recipeDetails.readyInMinutes)}</Text>
                      : undefined}
                  </View>
                </Collapsible>
                {this.state.recipeDetails.diets.length ?
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }} onPress={() => { this.setState({ dietCollapsed: !this.state.dietCollapsed }) }}>Diet {this.state.dietCollapsed ? <Ionicons name='ios-arrow-dropdown' size={20} color='black' /> : <Ionicons name='ios-arrow-dropright' size={20} color='black' />}</Text>
                  : undefined}
                <Collapsible collapsed={this.state.dietCollapsed}>
                  <View
                    style={{
                      paddingLeft: 15
                    }}
                  >
                    {this.state.recipeDetails.diets.map((diet, i) => (
                      <Text key={i} style={{ fontSize: 20 }}>{diet}</Text>
                    ))}
                  </View>
                </Collapsible>
                {this.state.recipeDetails.nutrition.nutrients.length ?
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }} onPress={() => { this.setState({ nutritionCollapsed: !this.state.nutritionCollapsed }) }}>Nutrition Facts {this.state.nutritionCollapsed ? <Ionicons name='ios-arrow-dropdown' size={20} color='black' /> : <Ionicons name='ios-arrow-dropright' size={20} color='black' />}</Text>
                  : undefined}
                <Collapsible collapsed={this.state.nutritionCollapsed}>
                  <View
                    style={{
                      paddingLeft: 15
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>{`Servings: ${this.state.recipeDetails.servings}`}</Text>
                    {this.state.recipeDetails.nutrition.nutrients.map((nutrient, i) => (
                      wantedNutrients.includes(nutrient.title) ? <Text key={i} style={{ fontSize: 20 }}>{`${nutrient.title}: ${nutrient.amount} ${nutrient.unit}`}</Text> : undefined
                    ))}
                  </View>
                </Collapsible>
                {this.state.recipeDetails.extendedIngredients.length ?
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }} onPress={() => { this.setState({ ingredientsCollapsed: !this.state.ingredientsCollapsed }) }}>Ingredients {this.state.ingredientsCollapsed ? <Ionicons name='ios-arrow-dropdown' size={20} color='black' /> : <Ionicons name='ios-arrow-dropright' size={20} color='black' />}</Text>
                  : undefined}
                <Collapsible collapsed={this.state.ingredientsCollapsed}>
                  <View
                    style={{
                      paddingLeft: 15
                    }}
                  >
                    {this.state.missing.length > 0 ? <Text
                      style={{
                        fontStyle: 'italic',
                        fontSize: 16
                      }}
                      onLongPress={() => {
                        // this.compareIngredients();
                        this.setState({
                          addMissing: true
                        });
                      }}
                    >Hold to compare with pantry</Text> : null}
                    {this.state.recipeDetails.extendedIngredients.map((ingredient, i) => (
                      <CheckBox
                        key={i}
                        title={ingredient.original}
                        containerStyle={{
                          backgroundColor: 'transparent',

                        }}
                        textStyle={{
                          fontSize: 18
                        }}
                        checked={ingredient.checked}
                        uncheckedIcon='exclamation-circle'
                        uncheckedColor='red'
                        onLongPress={() => {
                          // this.compareIngredients();
                          this.setState({
                            addMissing: true
                          });
                        }}
                      />
                    ))}
                  </View>
                </Collapsible>
                {this.state.recipeDetails.analyzedInstructions.length ?
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }} onPress={() => { this.setState({ instructionsCollapsed: !this.state.instructionsCollapsed }) }}>Instructions {this.state.instructionsCollapsed ? <Ionicons name='ios-arrow-dropdown' size={20} color='black' /> : <Ionicons name='ios-arrow-dropright' size={20} color='black' />}</Text>
                  : undefined}
                <Collapsible collapsed={this.state.instructionsCollapsed}>
                  <View
                    style={{
                      paddingLeft: 15
                    }}
                  >
                    {this.state.recipeDetails.analyzedInstructions.length ? this.state.recipeDetails.analyzedInstructions[0].steps.map((step, i) => (
                      <CheckBox
                        key={i}
                        title={step.step}
                        containerStyle={{
                          backgroundColor: 'transparent',
                        }}
                        textStyle={{
                          fontSize: 18
                        }}
                        checked={step.checked}
                        checkedColor='green'
                        onPress={() => {
                          step.checked = !step.checked
                          this.forceUpdate();
                          // console.log(step);
                        }}
                      />
                    )) : undefined}
                  </View>
                </Collapsible>
                {this.state.recipeDetails.analyzedInstructions.length && this.state.recipeDetails.analyzedInstructions[0].steps.length ?
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }} onPress={() => { this.setState({ equipmentCollapsed: !this.state.equipmentCollapsed }) }}>Equipment Needed {this.state.equipmentCollapsed ? <Ionicons name='ios-arrow-dropdown' size={20} color='black' /> : <Ionicons name='ios-arrow-dropright' size={20} color='black' />}</Text>
                  : undefined}
                <Collapsible collapsed={this.state.equipmentCollapsed}>
                  <View
                    style={{
                      paddingLeft: 15
                    }}
                  >
                    {equipment.map((item, i) => (
                      <Text key={i} style={{ fontSize: 20 }}>{item}</Text>
                    ))}
                  </View>
                </Collapsible>
                <Button
                  title='Complete'
                  buttonStyle={{
                    backgroundColor: 'green',
                    marginTop: 10,
                    alignSelf: 'center',
                    marginBottom: 5
                  }}
                  containerStyle={{
                    alignSelf: 'center'
                  }}
                  onPress={() => {
                    this.setState({
                      completed: true
                    });
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
                ><Completed recipeIngredients={this.state.recipeIngredients} email={this.props.email} getIngredients={this.props.getIngredients} searchRecipes={this.props.searchRecipes} closeCompleted={this.closeCompleted} />
                </Modal>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          style={[styles.container, styles.spinner, {
            backgroundColor: 'white',
            justifyContent: 'center'
          }]}
          source={require('../../media/4.jpg')}
          blurRadius={0}
          onLayout={() => {
            this.forceUpdate();
          }}
        >
          {/* <View style={styles.spinner}> */}
          <ActivityIndicator size="large" color="orange" />
          {/* </View> */}
        </ImageBackground>
      );
    }
  }
}

export default Recipe;