import React from 'react';

import HomeRecipes from './home-components/homeRecipes.js'
import HomeExtensionRecipes from './home-components/homeExtensionRecipes.js'
import { Text, Animated, SectionList, Dimensions, ImageBackground, RefreshControl } from 'react-native';
import { Button, } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from '../styles.js';
//====================================================
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      text: '',
      refreshing: false,
      fadeAnim: new Animated.Value(0),
    }
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
  onRefresh() {
    this.props.screenProps.getIngredients();
    this.props.screenProps.getUserRecipes();
    this.props.screenProps.getUserGroceries();
    this.setState({refreshing: false});
  }
  //====================================================
  render() {
    let { fadeAnim } = this.state;
    const savedRecipes = ({ item, index }) => (
      <HomeRecipes item={item} index={index} email={this.props.screenProps.email} getUserRecipes={this.props.screenProps.getUserRecipes} ingredients={this.props.screenProps.ingredients} getUserGroceries={this.props.screenProps.getUserGroceries} getIngredients={this.props.screenProps.getIngredients} searchRecipes={this.props.screenProps.searchRecipes} />
    );
    const savedExtensionRecipes = ({ item, index }) => (
      <HomeExtensionRecipes item={item} index={index} email={this.props.screenProps.email} getUserExtensionRecipes={this.props.screenProps.getUserExtensionRecipes} ingredients={this.props.screenProps.ingredients} getUserGroceries={this.props.screenProps.getUserGroceries} getIngredients={this.props.screenProps.getIngredients} searchRecipes={this.props.screenProps.searchRecipes} />
    );

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

        <Animated.View style={{ ...this.props.style, opacity: fadeAnim }}>
          <Text style={{ fontSize: 22, paddingBottom: 10 }}>Welcome {this.props.screenProps.name}!</Text>
          <SectionList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
                colors={['orange']}
                progressBackgroundColor='transparent'
              />
            }
            style={[styles.list, { width: Dimensions.get('window').width / 1.1 }]}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
            )}
            sections={[
              { title: 'Your Saved Recipes', data: this.props.screenProps.userRecipes, renderItem: savedRecipes },
              { title: 'Your Bookmarked Recipes', data: this.props.screenProps.userExtensionRecipes, renderItem: savedExtensionRecipes }
            ]}
            keyExtractor={(item) => item.title}
          />
          <Button
            title="Log Out"
            buttonStyle={{
              alignSelf: 'center',
              width: 100,
              backgroundColor: 'red',
              marginBottom: 5
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