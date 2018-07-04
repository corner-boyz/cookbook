import React from 'react';
import { Text, View, ScrollView, Image, ActivityIndicator, SectionList } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

import { styles } from '../../styles';

import IP from '../../IP';
//====================================================
class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false
    };
  }
  //====================================================
  componentDidMount() {
    this.findRecipe();
    this.selectUserRecipe();
  }
  //====================================================
  findRecipe() {
    axios.get(`http://${IP}/api/recipe/${this.props.selectedRecipe.id}`).then((results) => {
      this.setState({
        recipeDetails: results.data
      });
      console.log(results.data.image)
    });
  }

  saveRecipe() {
    // console.log('id:', this.props.selectedRecipe.id, 'title', this.props.selectedRecipe.title, 'image', this.props.image)
    axios.post(`http://${IP}/api/saverecipe`, { email: this.props.email, recipe: { id: this.props.selectedRecipe.id, title: this.props.selectedRecipe.title, image: this.props.selectedRecipe.image } }).then((results) => {
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
        <ScrollView >
          <View style={styles.container}>
            {this.props.email && !this.state.isSaved ?
              <Button
                title="Save Recipe"
                rounded={true}
                backgroundColor='green'
                onPress={() => {
                  this.saveRecipe();
                }}
              /> :
              <Button
                title="Remove Recipe"
                rounded={true}
                backgroundColor='red'
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
              style={{ flex: 1, padding: 40 }}
            >
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
                  <Text>Diet</Text>
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
              {this.state.recipeDetails.analyzedInstructions.length ?
                <View>
                  <Text style={{ fontWeight: 'bold' }}>Instructions</Text>
                  {this.state.recipeDetails.analyzedInstructions[0].steps.map((step, i) => (
                    <Text key={i}>{step.number}. {step.step}</Text>
                  ))}
                </View> : undefined}
            </View>

            {/* <SectionList
              renderSectionHeader={({ section: { title } }) => (<Text style={{ fontWeight: 'bold' }}>{title}</Text>)}
              renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}
              sections={[
                { title: 'Time', data: [`Preperation: ${this.convertMinutes(this.state.recipeDetails.preparationMinutes)}`, `Cooking: ${this.convertMinutes(this.state.recipeDetails.cookingMinutes)}`, `Ready In: ${this.convertMinutes(this.state.recipeDetails.readyInMinutes)}`] },
                { title: 'Diets', data: this.state.recipeDetails.diets },
                { title: 'Ingredients', data: this.state.recipeDetails.extendedIngredients, renderItem: ingredientRender },
                { title: 'Instructions', data: this.state.recipeDetails.analyzedInstructions[0].steps, renderItem: stepsRender }
              ]}
              ListEmptyComponent={() => (<Text></Text>)}
              keyExtractor={(item, index) => item + index}
              stickySectionHeadersEnabled={true}
            /> */}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      );
    }
  }
}

export default Recipe;