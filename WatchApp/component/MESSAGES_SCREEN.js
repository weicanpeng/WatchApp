import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, NativeModules, PermissionsAndroid, ImageBackground, YellowBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Progress from 'react-native-progress';
import TimeView from './TimeView';
import { Dimensions } from "react-native";
import Storage from './DeviceStorage';
import MessageList from './MessageList';
//也可以在这里先取出屏幕的宽高
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').Height;

export default class MESSAGES_SCREEN extends Component {

  //隐藏header
  static navigationOptions = {
    header: null
  };


  constructor(props) {
    super(props);
    SplashScreen.hide(); // 关闭启动屏幕

    this.state = {
      progress: 1,
      CountDownSec: 15,
      imei: '',
      token: '',
      indeterminate: true,
      isCountDown: false,
      Interv: undefined,
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
    if (this.state.Interv) {
      clearInterval(this.state.Interv);
    }

    this.setState({ indeterminate: false });
    this.state.Interv = setInterval(() => {
      progress -= 0.067;
      if (progress < 0) {
        progress = 0;
      }
      let theValue = this.state.CountDownSec - 1;
      if (theValue <= 0) {
        clearInterval(this.state.Interv);
      }
      this.setState({ progress: progress, CountDownSec: theValue });
    }, 1000);

  }

  componentDidMount() {

  
    var p = new Promise(function (resolve, reject) { resolve() });
    p.then(this.getImeiFromHardware).then(this.auth).then(function (data) {
        alert(JSON.stringify(data));
       
        Storage.save("auth", data);
        Storage.save('token',data.token);
    });

    if (!this.state.isCountDown) {
      this.state.progress = 1;
      this.animate();

    }
  }

  auth(imei) {
     
    return new Promise(function (resolve, reject) {
      fetch('https://api.healthjay.com/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         // hardwareId: imei,
         email:"weicanpeng@126.com",
         password:'123456'
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.message = "Auth success") {
          
            resolve(responseJson);
          }
        })
        .catch((error) => {
          console.error(error);
          resolve(JSON.stringify(error));
        });
    });

  }

  getImei() {
    var that = this;

    return new Promise(function (resolve, reject) {
      Storage.get('stepData').then((result) => {
        if (result.imei == "" || result.imei == undefined || result.imei == null) {
          that.getImeiFromHardware();
        } else {
         // that.setState({ imei: result.imei });
        }
        resolve(result.imei);
      });
    });


  }

  async getImeiFromHardware() {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
    return new Promise(function (resolve, reject) {
      NativeModules.MyNativeModule.getImei((result) => {
       // alert(result)
        Storage.save('imei', { imei: result });
      //  this.setState({ imei: result });
        resolve(result);
      });
    });

  }

  componentWillUnmount() {

  }


  goRecordMessageScreen() {
    /*
    NativeModules
      .IntentMoudle
      .startActivityFromJS("com.watchapp.SerialPortActivity", null);
      */
    this.props.navigation.navigate('RECORD_MESSAGE_SCREEN');
  }

  onPressVoiceMessage() {

    this.props.navigation.navigate('PLAY_MESSAGE_SCREEN');
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.timeView}>
          <TimeView />
        </View>
        <View style={styles.topView}>
          {/* <MessageList /> */}
        </View>
        <View style={styles.rightBottomView}>
          <TouchableOpacity onPress={this.goRecordMessageScreen.bind(this)}>
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
  imgBg: {
    flexDirection: 'row',
    width: 250,

    height: 150,
    marginBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bigText: {
    color: '#FFF',
    fontSize: 28,
  },
  text: {
    fontSize: 18,
    color: "#FFF",
    marginVertical: 3,
  },
  textLeft: {
    fontSize: 18,
    color: "#FFF",
    top: 10,
    left: 10,
    position: 'absolute',

  },
  textRight: {
    fontSize: 18,
    color: "#FFF",
    top: 10,
    right: 10,
    position: 'absolute',

  },
  textBig: {
    fontSize: 33,
    color: "#FFF",
    marginVertical: 3,
  },
  innerView: {
    position: 'absolute',
    top: 100,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkView: {
    marginTop: 5,
  },
  topView: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomView: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightBottomView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  timeView: {
    position: 'absolute',
    top: 1,
    right: 1,
  }
})