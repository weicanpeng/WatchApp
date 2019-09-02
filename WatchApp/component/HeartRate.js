import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Dimensions,Image,StyleSheet,YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Progress from 'react-native-progress';
import HeartRateText from './HeartText'
import DateTimeView from './DateTimeView';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').Height;


export default class HeartRate extends Component {

  //隐藏header
  static navigationOptions = {
    header: null
  };

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
  startHeart(){
      alert('start get heart rate');
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
              <DateTimeView/>
          </View>
          <View style={styles.topView}>
              <HeartRateText
               TopText='Pressure'
               TopTextColor='#FFF'
             
               BottomText='90'
               BottomTextColor='#FF0000'
               BottomImg={up}
              />
                <HeartRateText
               TopText='Heart'
               TopTextColor='#FFF'
               TopImg={heart}
               BottomText='80'
               BottomTextColor='#FF0000'
               BottomImg={down}
              />
                <HeartRateText
               TopText='Oxygen'
               TopTextColor='#FFF'
              
               BottomText='89'
               BottomTextColor='#FF0000'
              />
          </View>
          <View style={styles.topView}>
              <HeartRateText
               TopText='66'
               TopTextColor='#FFF'
               BottomText='High'
               BottomTextColor='#FF0000'
              />
                <HeartRateText
               TopText='76'
               TopTextColor='#FFF'
               BottomText='Low'
               BottomTextColor='#FF0000'
              />
                <HeartRateText
               TopText=''
               TopTextColor='#FFF'
               BottomText='Normal'
               BottomTextColor='#008B00'
              />
          </View>
          <View>
              <TouchableOpacity
              onPress={this.startHeart.bind(this)}
              >
              {/* <Image
              source={require("../images/heart_test_button.png")}
              /> */}
              <View style={styles.btnView}><Text style={styles.btnText}>Start</Text></View>
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
  btnText:{
    fontSize: 22,
    color:"#000",
    textAlign:'center',
    textAlignVertical:'center',
    marginVertical: 3,
  },
  textBig: {
    fontSize: 48,
    color:"#FFF",
    marginVertical: 3,
  },
  btnView:{
    width:180,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#FFF",
    borderRadius:15
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