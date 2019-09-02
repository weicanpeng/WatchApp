import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Progress from 'react-native-progress';
import TimeView from './TimeView';
import { Dimensions } from "react-native";

//也可以在这里先取出屏幕的宽高
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').Height;

export default class View10 extends Component {

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
  
    if(!this.state.isCountDown)
    {
      this.state.progress=1;
      this.animate();
    
    }
    
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

        <View style={styles.topView}>
        
        <Image
       source={require("../images/battery_danger.png")}
      />
        <TimeView/>
        </View>

     <View  style={styles.bottomView}>
     <Progress.Circle
          //外部边框宽度，0表示没有边框	
          borderWidth={0}
          //圆的直径
          size={200}
          style={styles.progress}
          progress={this.state.progress}
          //如果设置为true，指示器将旋转，进度属性将被忽略
          indeterminate={false}
        >
      </Progress.Circle>
      <View style={styles.innerView}>
      <Image
       source={require("../images/green_help_now.png")}
      />
    </View>      
     

     </View>
    <View style={styles.rightBottomView}>
   
 
    <TouchableOpacity>
   <Image
       source={require("../images/cancel_bottom_right.png")}
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
  bigText:{
      color:'#FFF',
      fontSize:38,
  },
  text: {
    fontSize: 18,
    color:"#FFF",
    marginVertical: 3,
  },
  textBig: {
    fontSize: 48,
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
    width:windowWidth,
    flex:1,
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