import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,YellowBox} from 'react-native';

export default class DateTimeView extends Component {
  constructor(props) {
    super(props);
    var timeInfo=this.getTimeInfo();
    this.state = {
    timeInfo:timeInfo,
    Interval:undefined,
    };
      
  }


  componentDidMount(){
  
   this.state.Interval= setInterval(() => {
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
    if(this.state.Interval)
    {
      clearInterval(this.state.Interval);
    }
  }



  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.timeText}>{this.state.timeInfo}</Text>
      </View>    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText:{
    color:'#FFF',
    fontSize:16,
  },
})