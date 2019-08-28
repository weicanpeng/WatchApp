import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Dimensions,Image,StyleSheet,YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Progress from 'react-native-progress';
import HeartRateText from './HeartText'
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').Height;

export default class HeartRate extends Component {
  constructor(props) {
    super(props);
    SplashScreen.hide(); // 关闭启动屏幕
    var timeInfo=this.getTimeInfo();
    this.state = {
    
    timeInfo:timeInfo
    };

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Async Storage has been extracted from react-native core',
    ]);
     

      
      
  }
  

  componentDidMount(){
  
  setInterval(() => {
var timeInfo=this.getTimeInfo();
      this.setState({timeInfo:timeInfo});
  }, 1000*60);
    
  }

  getTimeInfo(){
    var date = new Date();

    var year = date.getFullYear().toString();
    var month = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    var hour =  date.getHours().toString();
    var minute = date.getMinutes().toString();
    var timeInfo=month+'/'+day+' '+hour.padStart(2,'0')+':'+minute.padStart(2,'0');
    return timeInfo;
  }

  componentWillUnmount(){
  
  }
  startHeart(){
      alert('开始测试心率');
  }


  render() {

    let up=require('../images/up.png');
    let down=require('../images/down.png');
    let heart=require('../images/heart.png');


    return (
      <View style={styles.container}>
          <View style={styles.topView}>
              <Image
              source={require("../images/heart_line.png")}
              ></Image>
              <Text style={styles.text}>{this.state.timeInfo}</Text>
          </View>
          <View style={styles.topView}>
              <HeartRateText
               TopText='血压'
               TopTextColor='#FFF'
             
               BottomText='158'
               BottomTextColor='#FF0000'
               BottomImg={up}
              />
                <HeartRateText
               TopText='心率'
               TopTextColor='#FFF'
               TopImg={heart}
               BottomText='158'
               BottomTextColor='#FF0000'
               BottomImg={down}
              />
                <HeartRateText
               TopText='血氧'
               TopTextColor='#FFF'
              
               BottomText='158'
               BottomTextColor='#FF0000'
              />
          </View>
          <View style={styles.topView}>
              <HeartRateText
               TopText='66'
               TopTextColor='#FFF'
               BottomText='偏高'
               BottomTextColor='#FF0000'
              />
                <HeartRateText
               TopText='76'
               TopTextColor='#FFF'
               BottomText='偏高'
               BottomTextColor='#FF0000'
              />
                <HeartRateText
               TopText=''
               TopTextColor='#FFF'
               BottomText='正常'
               BottomTextColor='#008B00'
              />
          </View>
          <View>
              <TouchableOpacity
              onPress={this.startHeart.bind(this)}
              >
              <Image
              source={require("../images/heart_test_button.png")}
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
  topView:{
      flexDirection:'row',
      flex: 1,
      width:windowWidth,
      justifyContent:'space-around',
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
    top:70,
    right:85,
    justifyContent: 'center',
    alignItems: 'center',
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
})