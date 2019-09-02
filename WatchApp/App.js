import React, { Component } from 'react';
import {View,Text,StyleSheet,YellowBox,NativeModules,DeviceEventEmitter,PermissionsAndroid} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SensorManager } from 'NativeModules';
import SplashScreen from 'react-native-splash-screen';
import { init, Geolocation } from "react-native-amap-geolocation";
import * as Progress from 'react-native-progress';
import Storage from './component/DeviceStorage';

import HomePage  from './component/View7';
import QRCodeView from './component/View6';
import VoiceScreen from './component/VoiceScreen';
import ContactView from './component/View9';
import HeartRate from './component/HeartRate'
import View3  from './component/View3';
import View10  from './component/View10';
import View14  from './component/View14';
import View15  from './component/View15';
import View18  from './component/View18';
import View119  from './component/View19';


const RootStack = createStackNavigator(
  {
    Home: {
      screen: View18,
    },
    Details: {
      screen: QRCodeView,
    },
    VoiceRecord:{
      screen:VoiceScreen,
    },
    ContactView:{
      screen:ContactView,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
     
    };

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Async Storage has been extracted from react-native core',
    ]);
      // do anything while splash screen keeps, use await to wait for an async task.
      // 在入口文件处隐藏掉启动页
      SplashScreen.hide(); // 关闭启动屏幕

      DeviceEventEmitter.addListener('StepCounter', function (data) {
  
        //alert(JSON.stringify(data))
        Storage.save('stepData',{data:data.steps});
      });
      
  }
  

  async initGaodeMapInfo()
  {
   // 对于 Android 需要自行根据需要申请权限
 await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
 // 使用自己申请的高德 App Key 进行初始化
 await init({
   ios: "1f8080e7e8e0e043480e6853b6bdd6e7",
    android: "1f8080e7e8e0e043480e6853b6bdd6e7"
  });
  }

  getLocation(){
    Geolocation.getCurrentPosition((location)=>{
      alert(JSON.stringify(location));
    },(err)=>{
      alert(JSON.stringify(err));
    });
    }

  async componentDidMount(){
    SensorManager.startStepCounter(1000);
   await this.initGaodeMapInfo();
  }

  componentWillUnmount(){
  
   SensorManager.stopStepCounter();
  }

  render() {
    return (
       <AppContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  text: {
    fontSize: 18,
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
  progress: {
    margin: 10,
  },
})