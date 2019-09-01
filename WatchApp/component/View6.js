import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Progress from 'react-native-progress';
export default class View6 extends Component {

  //隐藏header
  static navigationOptions = {
    header: null
  };


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
     

      <View style={styles.circles}>
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
<View style={{
    position: 'absolute',top:50,right:50}}>
      <TouchableOpacity
      onLongPress={this.onVoiceRecord.bind(this)}
      onPressOut={this.stopVoiceRecord.bind(this)}
      >
      <Image
       source={require("../images/inner_eyes.png")}
       
      />
      </TouchableOpacity>
      </View>      
      </View>
    {/*  <View  style={styles.circleView}></View>
   */}
    <View style={styles.bottomView}>
    <Image
       source={require("../images/btn_play.png")}
       
      />
       <Image
       style={{marginLeft:2}}
       source={require("../images/red_round.png")}
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
  text: {
    fontSize: 18,
    color:"#FFF",
    marginVertical: 10,
  },
  
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleView:{
    marginTop:5,
    width:50,
    height:50,
    borderRadius:25,
    borderWidth:2,
    borderColor:'#FFFFFF',
    backgroundColor:'#FF0000',
  },
  progress: {
    margin: 10,
  },
  bottomView:{
    marginTop:5,
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  }
})