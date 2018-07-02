import React from 'react';
import { Dimensions, Animated } from 'react-native';
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
        duration: 1000,
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
      <Animated.View style={{ ...this.props.style, opacity: fadeAnim }}>
        <Tile
          imageSrc={{ uri: this.props.recipe.image }}
          imageContainerStyle={{ paddingVertical: 10 }}
          title={this.props.recipe.title}
          titleStyle={{
            fontSize: 16
          }}
          featured={true}
          caption={`Have: ${this.props.recipe.usedIngredients.map((ingredient) => (' ' + ingredient.name))}${this.props.recipe.missedIngredients.length?'\nNeed:'+this.props.recipe.missedIngredients.map((ingredient) => (' ' + ingredient.name)):''}`}
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
