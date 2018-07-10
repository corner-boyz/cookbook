import React from 'react';
import { Dimensions, Animated, View, Alert } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Tile } from 'react-native-elements';
import axios from 'axios';
import pluralize from '../../pluralize'
import { styles } from '../../styles';
import IP from '../../IP';


class RecipeListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      size: Dimensions.get('window').width < Dimensions.get('window').height ? 2.1 : 4.3,
      ownedIngredients: [],
      missedIngredients: []
    };
  }
  //====================================================
  componentDidMount() {
    this.categorizeIngredients();
    Animated.timing(this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  }
  //====================================================
  categorizeIngredients = () => {
    const filteredOutWords = ['serving', 'servings', 'handful', 'handfuls', 'fresh', 'freshly', 'strip', 'strips', 'light', 'salted', 'unsalted', 'of', 'granulated', 'granulate', 'vine', 'ripe', 'ripened', 'whole', 'active', 'canned', 'loaf', 'loaves'];

    let recipeObj = [];
    let pantryObj = {};
    let ownedIngredients = [];
    let missedIngredients = [];

    this.props.recipe.usedIngredients.forEach((ingredient) => {
      let string = pluralize.singular(ingredient.name.toLowerCase());
      if (string.length > 1) {
        string = string.split(' ').filter((word) => {
          return !filteredOutWords.includes(word);
        }).join(' ');
      }
      recipeObj[string] = true;
    });
    this.props.recipe.missedIngredients.forEach((ingredient) => {
      let string = pluralize.singular(ingredient.name.toLowerCase());
      if (string.length > 1) {
        string = string.split(' ').filter((word) => {
          return !filteredOutWords.includes(word);
        }).join(' ');
      }
      recipeObj[string] = true;
    });

    this.props.ingredients.forEach((ingredient) => {
      pantryObj[ingredient.ingredient] = true;
    });

    for (let ingredient in recipeObj) {
      if (pantryObj.hasOwnProperty(ingredient)) {
        ownedIngredients.push(ingredient);
      } else {
        missedIngredients.push(ingredient);
      }
    }

    this.setState({
      ownedIngredients: ownedIngredients,
      missedIngredients: missedIngredients
    });
  }

  retrieveRecipe = (recipeId) => {
    axios.get(`http://${IP}/api/recipe/${recipeId}`).then((results) => {
      this.props.selectRecipe(results.data);
    }).catch((err) => {
      if (err.response && err.response.request.status === 404) {
        Alert.alert('Trouble connecting to recipe database', 'Please try again later')
      }
      else if (err.request._hasError || err.response.request.status === 404) {
        Alert.alert('Trouble connecting to server', 'Please try again later');
      }
    });
  }
  //====================================================
  onSwipeRight(gestureState) {
    console.log('SWIPED RIGHT');
  }
  //====================================================
  render() {
    let { fadeAnim } = this.state
    return (
      <Animated.View style={{ ...this.props.style, opacity: fadeAnim }}>
        <View
          onLayout={() => {
            Dimensions.get('window').width < Dimensions.get('window').height ? this.setState({ size: 2.1 }) : this.setState({ size: 4.3 })
          }}
        >
          <Tile
            imageSrc={{ uri: this.props.recipe.image }}
            imageContainerStyle={{ paddingVertical: 5, borderWidth: 5, borderColor: 'lightgray', borderRadius: 5 }}
            title={this.props.recipe.title}
            titleStyle={{
              fontSize: 18
            }}
            featured={true}
            caption={`${this.state.ownedIngredients.length ? '\nHave:' + this.state.ownedIngredients.map((ingredient) => (' ' + ingredient)) : ''}${this.state.missedIngredients.length ? '\nNeed:' + this.state.missedIngredients.map((ingredient) => (' ' + ingredient)) : ''}`}
            captionStyle={{
              fontSize: 14,
              fontWeight: 'bold',
              color: 'white',
              justifyContent: 'flex-start'
            }}
            width={Dimensions.get('window').width / this.state.size}
            onPress={() => this.retrieveRecipe(this.props.recipe.id)}
          />
        </View>
      </Animated.View>


    );
  }
}

export default RecipeListEntry;
