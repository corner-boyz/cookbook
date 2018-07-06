import React from 'react';
import { Dimensions, Animated, View, Alert } from 'react-native';
import { Tile } from 'react-native-elements';
import axios from 'axios';

import { styles } from '../../styles';
import IP from '../../IP';


class RecipeListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      size: Dimensions.get('window').width < Dimensions.get('window').height ? 2.1 : 4.3
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
              fontSize: 16
            }}
            featured={true}
            caption={`Have: ${this.props.recipe.usedIngredients.map((ingredient) => (' ' + ingredient.name))}${this.props.recipe.missedIngredients.length ? '\nNeed:' + this.props.recipe.missedIngredients.map((ingredient) => (' ' + ingredient.name)) : ''}`}
            captionStyle={{
              fontSize: 12,
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
