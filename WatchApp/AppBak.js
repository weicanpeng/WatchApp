import React, { Component } from 'react';
import {View,Text,StyleSheet,YellowBox,NativeModules,DeviceEventEmitter,PermissionsAndroid} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { SensorManager } from 'NativeModules';
import SplashScreen from 'react-native-splash-screen';
import { init, Geolocation } from "react-native-amap-geolocation";
import * as Progress from 'react-native-progress';
import Storage from './component/DeviceStorage';




export default class AppBak extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      progress: 1,
      indeterminate: true,
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
  
        alert(JSON.stringify(data))
      Storage.save('stepData',{data:data.steps});
      });
      
  }
  animate() {
    let progress = 1;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress -= Math.random() / 5;
        if (progress <0) {
          progress = 0;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }
   getTodayDate() {
    var date = new Date();

    var year = date.getFullYear().toString();
    var month = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    var hour =  date.getHours().toString();
    var minute = date.getMinutes().toString();

    return year+'年'+month+'月'+day+'日'+' '+hour+':'+minute;
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
 // 添加定位监听函数
//addLocationListener(location => alert(JSON.stringify(location)));

// 开始连续定位
//start();

 // android，10 秒请求一次定位
//setInterval(1000*10);

  }
  getLocation(){
    Geolocation.getCurrentPosition((location)=>{
      alert(JSON.stringify(location));
    },(err)=>{
      alert(JSON.stringify(err));
    });
    }

    async  getImei(){
      try {
          //返回string类型
          await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE)
          NativeModules.MyNativeModule.getImei((result)=>{
          alert(result);
          Storage.save('imei',{imei:result});
          });
      } catch (err) {
          alert(err.toString())
      }
  }
  getBattery(){
    NativeModules.MyNativeModule.getBattery2((result)=>{
        alert(result);
      });
  }
  async componentDidMount(){
    SensorManager.startStepCounter(1000);
   await this.initGaodeMapInfo();
    
    this.animate();
    var dateStr=this.getTodayDate();
    alert(dateStr);
    //this.getImei();
   // this.getBattery();
   // this.getLocation();
   //NativeModules.MyNativeModule.setDateTime(2018,07,23,12,12,12);
    Storage.get('stepData').then((tags) => {
      //alert(JSON.stringify(tags));
  });
  }

  componentWillUnmount(){
   // 在不需要的时候停止高德定位服务
   //stop();
   SensorManager.stopStepCounter();
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>Progress Example</Text>
      <Progress.Bar
        style={styles.progress}
        progress={this.state.progress}
        indeterminate={this.state.indeterminate}
      />
      <View style={styles.circles}>
        <Progress.Circle
          //外部边框宽度，0表示没有边框	
          borderWidth={1}
          //圆的直径
          size={200}
          style={styles.progress}
          progress={this.state.progress}
          //如果设置为true，指示器将旋转，进度属性将被忽略
          indeterminate={false}
          //可在进度条内部添加组件
         
        >
 </Progress.Circle>
<View style={{
    position: 'absolute',top:100,right:90}}><Text>可以吗</Text></View>      
      </View>
      <View  style={styles.circles}>
      <Progress.Pie
          style={styles.progress}
          progress={this.state.progress}
          indeterminate={this.state.indeterminate}
        />
        <Progress.Circle
          style={styles.progress}
          progress={this.state.progress}
          indeterminate={this.state.indeterminate}
          direction="counter-clockwise"
        />
      </View>
      <View style={styles.circles}>
        <Progress.CircleSnail style={styles.progress} />
        <Progress.CircleSnail
          style={styles.progress}
          color={['#F44336', '#2196F3', '#009688']}
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