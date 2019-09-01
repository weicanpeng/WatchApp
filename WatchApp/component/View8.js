import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default class View8 extends Component {
  constructor(props) {
    super(props);
    SplashScreen.hide(); // 关闭启动屏幕
    this.state = {
      progress: 1,
      indeterminate: true,
      Interv:undefined,
    };

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Async Storage has been extracted from react-native core',
    ]);
      
  }


  componentDidMount(){
   
    
  }

  componentWillUnmount(){
  
  }


   onVoiceRecord(){
 
  
  }
  stopVoiceRecord(){
  
 }

  render() {
    return (
      <View style={styles.container}>
        <Image
       source={require("../images/forbid.png")}
      />
    <View style={styles.bottomView}>
   
   <TouchableOpacity>
   <Image
       source={require("../images/cancel.png")}
      />
   </TouchableOpacity>
    
    </View>
    </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 20,
  },
 
  bottomView:{
    marginTop:5,
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  }
})