import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

export default class App extends React.Component {
  render() {
    return (
     <View style={styles.container}>
      <Text>Butthole!</Text>
      <Text>Changes you make will automatically reload.</Text>
      <Text>Shake your phone to open the developer menu.</Text>
    </View>
    // <Router>
    //   <Scene key="root">
    //     {/* Tab Container */}
    //     <Scene
    //       key="tabbar"
    //       tabs={true}
    //       tabBarStyle={{ backgroundColor: '#FFFFFF' }}
    //       >
    //       {/* Tab and it's scenes */}
    //       <Scene key="osu" title="OSU" icon={TabIcon}>
    //         <Scene 
    //           key="scarlet"
    //           // component={ScarletScreen}
    //           title="Scarlet"
    //           />
    //         <Scene
    //           key="gray"
    //           //component={GrayScreen}
    //           title="Gray"
    //           />
    //       </Scene>
    //       {/* Removed for brevity */}
    //     </Scene>
    //   </Scene>
    //   </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
