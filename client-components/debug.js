// import React, { Component } from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { View, Text, StyleSheet, Button, CameraRoll, Modal, Image } from 'react-native';
// import { Constants, Permissions, ImagePicker } from 'expo';
// import CameraRollPicker from 'react-native-camera-roll-picker';
// // You can import from local files

// // or any pure javascript modules available in npm
// // import { Button } from 'react-native-elements'; // Version can be specified in package.json

// export default class Debug extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cameraRollUri: null,
//       roll: false,
//     };
//   }

//   static navigationOptions = {
//     tabBarColor: 'orange',
//     tabBarIcon: () => {
//       return <Ionicons name='ios-bug' size={25} color='white' />;
//     },
//   }

//   componentDidMount() {
//     Permissions.askAsync(Permissions.CAMERA);
//     Permissions.askAsync(Permissions.CAMERA_ROLL);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={{ fontSize: 20 }}>Photo Screen</Text>

//         {this.state.cameraRollUri ? <Image source={{ uri: `${this.state.cameraRollUri[0].uri}` }} /> : null}


//         <Button style={{ marginTop: Constants.statusBarHeight, paddingTop: 10 }}
//           onPress={this._takePhoto}
//           title="Camera"
//           icon={{ name: 'camera', size: 32 }}
//           buttonStyle={{ backgroundColor: '#fba9b5' }}
//         />

//         <Button
//           title="Photo Roll"
//           onPress={() => {
//             this.setState({
//               roll: true,
//             })
//           }}
//         />
//         <Modal
//           animationType='slide'
//           visible={this.state.roll}
//           onRequestClose={() => {
//             console.log('Selected Photo: ', this.state.cameraRollUri);
//           }}>
//           <View style={styles.container}>
//             <CameraRollPicker
//               callback={this.getSelectedImages}
//               maximum={1}
//             />
//             <Button
//               title='Close'
//               onPress={() => {
//                 this.setState({
//                   roll: false
//                 })
//                 this.forceUpdate();
//               }}
//             />
//           </View>
//         </Modal>



//       </View >
//     );
//   }


//   _takePhoto = async () => {
//     let pickerResult = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//     });
//     let saveResult = await CameraRoll.saveToCameraRoll(pickerResult, 'photo')
//     this._handleImagePicked(pickerResult);
//   };

// }
// _saveToCameraRollAsync = async () => {
//   let result = await takePhoto(this._container, {
//     format: 'png',
//     result: 'file',
//   });

//   let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
//   // this.setState({ cameraRollUri: saveResult });
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//   },
// });
