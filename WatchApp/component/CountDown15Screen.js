import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Progress from 'react-native-progress';


export default class CountDown15Screen extends Component {
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
<View style={styles.innerView}>
    
      <Text style={styles.textBig}>{this.state.CountDownSec}</Text>
      <Text style={styles.text}>&nbsp;&nbsp;&nbsp;sec</Text>
    
      </View>      
      </View>
     <View  style={styles.circleView}></View>
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