import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { Tile } from 'react-native-elements';
import axios from 'axios';

import { styles } from '../../styles';
import IP from '../../IP';


class RecipeListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }
  componentDidMount() {
    Animated.timing(this.state.fadeAnim,
      {
        toValue: 1,
        duration: 2000,
      }
    ).start();
  }
  retrieveRecipe = (recipeId) => {
    axios.get(`http://${IP}/api/recipe/${recipeId}`).then((results) => {
      this.props.selectRecipe(results.data);
    });
  }
  //====================================================
  render() {
    let { fadeAnim } = this.state
    return (
      // <TouchableOpacity
      //   onPress={() => this.retrieveRecipe(this.props.recipe.id)}
      //   style={{backgroundColor: 'white'}}
      // >
      //   <Text style={styles.header}>{this.props.recipe.title}</Text>
      //   <Image
      //     style={styles.recipeImage}
      //     source={{ uri: this.props.recipe.image }}
      //   />
      //   {this.props.recipe.usedIngredients.length && this.props.recipe.missedIngredients.length ?
      //   <Text style={{fontWeight: 'bold'}}>Ingredients:</Text> 
      //   : undefined}
      //   {this.props.recipe.usedIngredients.length ?
      //     <View>
      //       <Text style={styles.owned}>
      //       {this.props.recipe.usedIngredients.map((ingredient, i) => (
      //         ingredient.name + ', '
      //       ))} 
      //       </Text></View> : undefined}

      //   {this.props.recipe.missedIngredients.length ?
      //     <View>
      //       <Text style={styles.missing}>
      //       {this.props.recipe.missedIngredients.map((ingredient, i) => (
      //         ingredient.name + ', '
      //       ))} 
      //       </Text></View> : undefined}
      //   <Text>{'\n'}</Text>
      // </TouchableOpacity>
      <Animated.View style={{ ...this.props.style, opacity: fadeAnim }}>
        <Tile
          imageSrc={{ uri: this.props.recipe.image }}
          title={this.props.recipe.title}
          titleStyle={{
            fontSize: 16
          }}
          featured={true}
          caption={`Have: ${this.props.recipe.usedIngredients.map((ingredient) => (' ' + ingredient.name))}\nNeed: ${this.props.recipe.missedIngredients.map((ingredient) => (' ' + ingredient.name))}`}
          captionStyle={{
            fontSize: 12,
            fontWeight: 'bold',
            color: 'white',
            justifyContent: 'flex-start'
          }}
          width={Dimensions.get('window').width / 2}
          onPress={() => this.retrieveRecipe(this.props.recipe.id)}
        />
      </Animated.View>


    );
  }
}

export default RecipeListEntry;
