import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, YellowBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Progress from 'react-native-progress';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';
import TimeView from './TimeView';
import Storage from './DeviceStorage';
import { Dimensions } from "react-native";
import fs from 'react-native-fs';
import { Promise } from 'core-js';
import Tools from './Tools';
//var fs1 = require('fs'); 
//import fs1 from 'fs'

//也可以在这里先取出屏幕的宽高
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').Height;

export default class RECORD_MESSAGE_SCREEN extends Component {

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
      indeterminate: true,
      isPress: false,
      isCountDown: false,
      Interv: undefined,
      hasPermission: undefined, //授权状态
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.MP3', // 文件路径
      recording: false, //是否录音
      pause: false, //录音是否暂停
      stop: false, //录音是否停止
      currentTime: 0, //录音时长
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

    var item = {};
    var pp = new Promise(function (resolve, reject) {

      Storage.get('auth').then(res => {
        item.token = res.token;
        resolve(item);
      });
    });

    pp.then(Tools.getImeiFromHardware).then(Tools.triggerLocationEventPromise).then(function (data) {

      alert(JSON.stringify(data));
    }).catch(function(err){
      alert("出错了"+JSON.stringify(err));
    });
    

    // 请求授权
    AudioRecorder.requestAuthorization()
      .then(isAuthor => {
        console.log('是否授权: ' + isAuthor)
        if (!isAuthor) {
          return alert('请前往设置开启录音权限')
        }
        this.setState({ hasPermission: isAuthor })
        this.prepareRecordingPath(this.state.audioPath);
        // 录音进展
        AudioRecorder.onProgress = (data) => {
          this.setState({ currentTime: Math.floor(data.currentTime) });
        };
        // 完成录音
        AudioRecorder.onFinished = (data) => {
          // data 返回需要上传到后台的录音数据
          console.log(this.state.currentTime)
          console.log(data)
        };
      })
  }



  componentWillUnmount() {

  }


  /**
   * AudioRecorder.prepareRecordingAtPath(path,option)
   * 录制路径
   * path 路径
   * option 参数
   */
  prepareRecordingPath = (path) => {
    const option = {
      SampleRate: 44100.0, //采样率
      Channels: 2, //通道
      AudioQuality: 'High', //音质
      AudioEncoding: 'mp3', //音频编码
      OutputFormat: 'mpeg_4', //输出格式
      MeteringEnabled: false, //是否计量
      MeasurementMode: false, //测量模式
      AudioEncodingBitRate: 32000, //音频编码比特率
      IncludeBase64: true, //是否是base64格式
      AudioSource: 0, //音频源
    }
    AudioRecorder.prepareRecordingAtPath(path, option)
  }

  // 开始录音
  _record = async () => {
    if (!this.state.hasPermission) {
      return alert('没有授权')
    }
    if (this.state.recording) {
      return alert('正在录音中...')
    }
    if (this.state.stop) {
      this.prepareRecordingPath(this.state.audioPath)
    }
    this.setState({ recording: true, pause: false })

    try {
      await AudioRecorder.startRecording()
    } catch (err) {
      console.log(err)
    }
  }

  // 暂停录音
  _pause = async () => {
    if (!this.state.recording) {
      return alert('当前未录音')
    }

    try {
      await AudioRecorder.pauseRecording()
      this.setState({ pause: true, recording: false })
    } catch (err) {
      console.log(err)
    }
  }

  // 恢复录音
  _resume = async () => {
    if (!this.state.pause) {
      return alert('录音未暂停')
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({ pause: false, recording: true })
    } catch (err) {
      console.log(err)
    }
  }

  // 停止录音
  _stop = async () => {
    this.setState({ stop: true, recording: false, paused: false });
    try {
      await AudioRecorder.stopRecording();
     // this.uploadFile2();
     this.uploadFile();
    } catch (error) {
      console.error(error);
    }
  }

  uploadFilePromise(item) {
    return new Promise(function (resolve, reject) {
      let formData = new FormData()

      formData.append("circleId", "5da2983938c1252ac8fcb0d6");
      formData.append("kind", "AUDIO");

      // file是字段名，根据后端接受参数的名字来定,android上通过react-native-file-selector获取的path是不包含'file://'协议的，android上需要拼接协议为'file://'+path，而IOS则不需要,type可以是文件的MIME类型或者'multipart/form-data'
      //formData.append('file',{uri:'file://'+path,type:'multipart/form-data'})

      formData.append('data', item.content);
      // 可能还会有其他参数 formData.append(key,value)
      fetch(item.url, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + item.token
        },
        body: formData
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    });
  }

  readFile(item) {
    return new Promise(function (resolve, reject) {
      fs.readFile(item.path,'base64').then(content => {
        item.content = content;
        resolve(item);
      });
    });
  }

  /*
  uploadFile2()
  {
     //JS-Promise（使异步操作同步执行） - zjffun - 博客园  https://www.cnblogs.com/jffun-blog/p/9128196.html?tdsourcetag=s_pcqq_aiomsg
     var path = this.state.audioPath;
     var content= fs1.readFileSync(path);
   
    var item = {
      path: path,
      content: content,
      url: 'https://api.healthjay.com/message-attachment',
    };
    var p = new Promise(function (resolve, reject) {

      Storage.get('auth').then(res => {
        item.token = res.token;
        resolve(item);
      });
    });
    p.then(this.uploadFilePromise).then(res => {
      alert(JSON.stringify(res));
    },err=>{
      alert(JSON.stringify(err));
    }).catch(ex=>{
      alert(JSON.stringify(ex));
    });

  }
 
*/

  uploadFile() {

    //JS-Promise（使异步操作同步执行） - zjffun - 博客园  https://www.cnblogs.com/jffun-blog/p/9128196.html?tdsourcetag=s_pcqq_aiomsg
    var path = this.state.audioPath;
    var item = {
      path: path,
      url: 'https://api.healthjay.com/message-attachment',
    };
    var p = new Promise(function (resolve, reject) {

      Storage.get('auth').then(res => {
        item.token = res.token;
        resolve(item);
      });
    });
    p.then(this.readFile).then(this.uploadFilePromise).then(res => {
      alert(JSON.stringify(res));
    },err=>{
      alert(JSON.stringify(err));
    }).catch(ex=>{
      alert(JSON.stringify(ex));
    });


  }

  // 播放录音
  _play = async () => {
    let whoosh = new Sound(this.state.audioPath, '', (err) => {
      if (err) {
        return console.log(err)
      }
      whoosh.play(success => {
        if (success) {
          console.log('success - 播放成功')
        } else {
          console.log('fail - 播放失败')
        }
      })
    })
  }

  async startVoiceRecord() {
    if (!this.state.recording) {
      this.state.progress = 1;
      this.animate();
      await this._record();
    }

  }

  async onLongPress() {
    if (!this.state.recording) {
      await this.startVoiceRecord();
    }
  }

  async onPress() {
    this.state.isPress = true;
    if (this.state.recording) {
      await this.stopVoiceRecord();
    } else {
      await this.startVoiceRecord();
    }

  }

  async stopVoiceRecord() {
    clearInterval(this.state.Interv);
    await this._stop();
    await this._play();
  }

  async PressOut() {
    if (!this.state.isPress) {
      if (this.state.recording) {
        await this.stopVoiceRecord();
      }

    }

  }


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.topView}>

          <Text></Text>

          <TimeView />
        </View>

        <View style={styles.bottomView}>
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
              source={require("../images/green_record.png")}
            />
          </View>


        </View>
        <View style={styles.rightBottomView}>


          <TouchableOpacity
            onPress={this.onPress.bind(this)}
            onLongPress={this.onLongPress.bind(this)}
            onPressOut={this.PressOut.bind(this)}
          >
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
  bigText: {
    color: '#FFF',
    fontSize: 38,
  },
  text: {
    fontSize: 18,
    color: "#FFF",
    marginVertical: 3,
  },
  textBig: {
    fontSize: 48,
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
    width: windowWidth,
    flex: 1,
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