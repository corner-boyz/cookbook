import React from 'react';

import HomeRecipes from './home-components/homeRecipes.js'
import { Text, View, Animated, FlatList, Dimensions, ImageBackground } from 'react-native';
import { Button, } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from '../styles';
//====================================================
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      text: '',
      fadeAnim: new Animated.Value(0),
      // yPosition: new Animated.Value(0),
    }
    // console.log(this.props.screenProps.email)
  }
  //====================================================
  static navigationOptions = {
    tabBarColor: 'darkturquoise',
    tabBarIcon: () => {
      return <Ionicons name='ios-home' size={25} color='white' />;
    },
  }
  //====================================================
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 1000 }).start();
  }
  //====================================================
  render() {
    let { fadeAnim } = this.state;
    return (
      <ImageBackground
        style={[styles.container, {
          backgroundColor: 'white',
          justifyContent: 'center'
        }]}
        source={require('../media/4.jpg')}
        blurRadius={0}
        onLayout={() => {
          // console.log('Rotated');
          this.forceUpdate();
        }}
      >

        <Animated.View style={{ ...this.props.style, opacity: fadeAnim }}>
          <Text style={{ fontSize: 18 }}>Welcome {this.props.screenProps.name},</Text>
          <Text style={{ fontSize: 16 }}>Here are your saved recipes:</Text>
          <FlatList
            style={[styles.list, { width: Dimensions.get('window').width / 1.1 }]}
            data={this.props.screenProps.userRecipes}
            extraData={this.state.index}
            renderItem={({ item, index }) => <HomeRecipes item={item} index={index} email={this.props.screenProps.email} getUserRecipes={this.props.screenProps.getUserRecipes} ingredients={this.props.screenProps.ingredients} getUserGroceries={this.props.screenProps.getUserGroceries} getIngredients={this.props.screenProps.getIngredients} searchRecipes = {this.props.screenProps.searchRecipes} />}
            keyExtractor={(item) => item.title}
          />
          <Button
            title="Log Out"
            buttonStyle={{
              alignSelf: 'center',
              width: 100,
              backgroundColor: 'red',
            }}
            onPress={() => {
              this.props.screenProps.logOut();
            }}
          />
        </Animated.View>
      </ImageBackground >
    );
  };
}

export default Home;