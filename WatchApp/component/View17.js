import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,NativeModules,YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Progress from 'react-native-progress';
import TimeView from './TimeView';
import { Dimensions } from "react-native";

//也可以在这里先取出屏幕的宽高
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').Height;

export default class View17 extends Component {

     //隐藏header
  static navigationOptions = {
    header: null
  };


  constructor(props) {
    super(props);
    SplashScreen.hide(); // 关闭启动屏幕
    
    this.state = {
        progress: 1,
        CountDownSec:15,
        indeterminate: true,
        isCountDown:false,
        Interv:undefined,
    };

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Async Storage has been extracted from react-native core',
    ]);
      
  }


  animate() {
    let progress = 1;
    this.setState({ progress });
    if(this.state.Interv)
    {
      clearInterval(this.state.Interv);
    }
   
      this.setState({ indeterminate: false });
     this.state.Interv= setInterval(() => {
        progress -= 0.067;
        if (progress <0) {
          progress = 0;
        }
        let theValue=this.state.CountDownSec-1;
        if(theValue<=0)
        {
            clearInterval(this.state.Interv);
        }
        this.setState({ progress:progress,CountDownSec:theValue });
      }, 1000);
    
  }

  componentDidMount(){
  
    this.connectWIFI();
    if(!this.state.isCountDown)
    {
      this.state.progress=1;
      this.animate();
    
    }
    
  }
  
 

  componentWillUnmount(){
  
  }
  connectWIFI(){
    NativeModules.MyNativeModule.connectWIFI("myssid",'mypwd',0x13);
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

        <View style={styles.topView}>
        
        <Image
        
       source={require("../images/small_forbid.png")}
      />
        <Text style={styles.bigText}>Left safe area</Text>
        </View>

        <View style={styles.topView}>
        
        <Image
         
       source={require("../images/hand.png")}
      />
         <Text style={styles.bigText}>Help requested</Text>
        </View>

  
    <View style={styles.rightBottomView}>
   
 
    <TouchableOpacity>
   <Image
       source={require("../images/red_round_right_bottom_btn.png")}
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
  imgBg:{
    flexDirection:'row',
    width:250,
   
    height:150,
    marginBottom:10,
    justifyContent:'space-around',
    alignItems:'center',
  },
  bigText:{
      color:'#FFF',
      fontSize:22,
  },
  text: {
    fontSize: 18,
    color:"#FFF",
    marginVertical: 3,
  },
  textLeft:{
    fontSize: 18,
    color:"#FFF",
    top:10,
    left:10,
    position:'absolute',

  },
  textRight:{
    fontSize: 18,
    color:"#FFF",
    top:10,
    right:10,
    position:'absolute',

  },
  textBig: {
    fontSize: 33,
    color:"#FFF",
    marginVertical: 3,
  },
  innerView:{
    position: 'absolute',
    top:100,
    right:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkView:{
marginTop:5,
  },
  topView:{
    width:250,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  bottomView:{
    marginTop:5,
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  rightBottomView:{
    position:'absolute',
    bottom:0,
    right:0,  
  },
  timeView:{
      position:'absolute',
      top:1,
      right:1,
  }
})