import React, { Component } from 'react';
import {View,Text,StyleSheet,YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Progress from 'react-native-progress';

export default class CircleView extends Component {
  constructor(props) {
    super(props);
    SplashScreen.hide(); // 关闭启动屏幕
    this.state = {
      progress: 1,
      indeterminate: true,
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

  componentDidMount(){
  
    this.animate();
    
  }

  componentWillUnmount(){
  
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
    position: 'absolute',top:100,right:90}}><Text>内部元素</Text></View>      
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