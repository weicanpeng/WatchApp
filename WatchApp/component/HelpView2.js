import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Progress from 'react-native-progress';
import {AudioRecorder, AudioUtils} from 'react-native-audio'
import Sound from 'react-native-sound'

export default class HelpView2 extends Component {
  constructor(props) {
    super(props);
    SplashScreen.hide(); // 关闭启动屏幕
    this.state = {
      progress: 1,
      indeterminate: true,
      hasPermission: undefined, //授权状态
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.MP3', // 文件路径
      recording: false, //是否录音
      pause: false, //录音是否暂停
      stop: false, //录音是否停止
      currentTime: 0, //录音时长
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
        progress -= 0.0067;
        if (progress <0) {
          progress = 0;
        }
        this.setState({ progress });
      }, 100);
    
  }

  componentDidMount(){
  // 请求授权
  AudioRecorder.requestAuthorization()
  .then(isAuthor => {
    console.log('是否授权: ' + isAuthor)
    if(!isAuthor) {
      return alert('请前往设置开启录音权限')
    }
    this.setState({hasPermission: isAuthor})
    this.prepareRecordingPath(this.state.audioPath);
    // 录音进展
    AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
    };
    // 完成录音
    AudioRecorder.onFinished = (data) => {
      // data 返回需要上传到后台的录音数据
      console.log(this.state.currentTime)
      console.log(data)
    };
  })
   
    
  }

  componentWillUnmount(){
  
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
    AudioRecorder.prepareRecordingAtPath(path,option)
  }

  // 开始录音
  _record = async () => {
    if(!this.state.hasPermission) {
      return alert('没有授权')
    }
    if(this.state.recording) {
      return alert('正在录音中...')
    }
    if(this.state.stop) {
      this.prepareRecordingPath(this.state.audioPath)
    }
    this.setState({recording: true,pause: false})
 
    try {
      await AudioRecorder.startRecording()
    } catch (err) {
      console.log(err)
    }
  }
 
  // 暂停录音
  _pause = async () => {
    if(!this.state.recording) {
      return alert('当前未录音')
    }
 
    try {
      await AudioRecorder.pauseRecording()
      this.setState({pause: true, recording: false})
    } catch (err) {
      console.log(err)
    }
  }
 
  // 恢复录音
  _resume = async () => {
    if(!this.state.pause) {
      return alert('录音未暂停')
    }
 
    try {
      await AudioRecorder.resumeRecording();
      this.setState({pause: false, recording: true})
    } catch (err) {
      console.log(err)
    }
  }
 
  // 停止录音
  _stop = async () => {
    this.setState({stop: true, recording: false, paused: false});
    try {
      await AudioRecorder.stopRecording();
    } catch (error) {
      console.error(error);
    }
  }
 
  // 播放录音
  _play = async () => {
    let whoosh = new Sound(this.state.audioPath, '', (err) => {
      if(err) {
        return console.log(err)
      }
      whoosh.play(success => {
        if(success) {
          console.log('success - 播放成功')
        }else {
          console.log('fail - 播放失败')
        }
      })
    })
  }

  async onVoiceRecord(){
    if(!this.state.recording)
    {
      this.state.progress=1;
      this.animate();
     await this._record();
    }
  
  }
 async stopVoiceRecord()
 {
  clearInterval(this.state.Interv);
  await this._stop();
  await this._play();
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
        position: 'absolute',top:70,right:70}}>
       <TouchableOpacity
      onLongPress={this.onVoiceRecord.bind(this)}
      onPressOut={this.stopVoiceRecord.bind(this)}
      >
     <View style={styles.roundView}>
          <Text style={styles.helpText}>Help Now</Text>
     </View>
      </TouchableOpacity>
      </View>      
      </View>
     <View  style={styles.circleView}></View>
     <Image
        source={require("../images/cancel.png")}
        style={styles.cancelImg}
     >
     </Image>
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
  helpText:{
    fontSize:38,
    flex:1,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    textAlignVertical:'center',
    color:"#fff",
  },
  roundView:{
    width:200,
    height:200,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#F00',
    borderRadius:100,
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
  cancelImg:{
      position:'absolute',
      bottom:0,
      right:0,
  }
})