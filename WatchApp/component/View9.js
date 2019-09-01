import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import TimeView from './TimeView';

export default class View9 extends Component {
  constructor(props) {
    super(props);
    SplashScreen.hide(); // 关闭启动屏幕
    
    this.state = {

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

        <View style={styles.timeView}>
            <TimeView/>
        </View>

          <Text style={styles.bigText}>Dissmiss ?</Text>

        <Image
        style={styles.checkView}
       source={require("../images/check.png")}
      />
    <View style={styles.bottomView}>
   
 
   <Image
       source={require("../images/small_round_green.png")}
      />
  
  <Image
  style={{marginLeft:3}}
       source={require("../images/small_round_gray.png")}
      />
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
  bigText:{
      color:'#FFF',
      fontSize:38,
  },
 
  checkView:{
marginTop:5,
  },
  bottomView:{
    marginTop:5,
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  timeView:{
      position:'absolute',
      top:1,
      right:1,
  }
})