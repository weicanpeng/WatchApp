import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,ScrollView ,YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Dimensions } from "react-native";

//也可以在这里先取出屏幕的宽高
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').Height;


export default class View7 extends Component {

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


  onPress(){
    this.props.navigation.push('Details');
  
  }


  render() {
    return (
      <View style={styles.container}>
     
      <ScrollView style={styles.scrollStyle}
       // 垂直滚动
       horizontal={false}
       >
       <View style={styles.scrollInnerView}>
        <Text style={styles.text}>
            你好，今晚一起出去玩玩，哈哈哈水水水水没事没事没事没事没事
        </Text>
       </View>
       <View style={styles.scrollInnerView}>
        <Text style={styles.text}>
            你好，今晚一起出去玩玩，哈哈哈水水水水没事没事没事没事没事
        </Text>
       </View>
       <View style={styles.scrollInnerView}>
        <Text style={styles.text}>
            你好，今晚一起出去玩玩，哈哈哈水水水水没事没事没事没事没事
        </Text>
       </View>
       <View style={styles.scrollInnerView}>
        <Text style={styles.text}>
            你好，今晚一起出去玩玩，哈哈哈水水水水没事没事没事没事没事
        </Text>
       </View>
       <View style={styles.scrollInnerView}>
        <Text style={styles.text}>
            你好，今晚一起出去玩玩，哈哈哈水水水水没事没事没事没事没事
        </Text>
       </View>
       <View style={styles.scrollInnerView}>
        <Text style={styles.text}>
            你好，今晚一起出去玩玩，哈哈哈水水水水没事没事没事没事没事
        </Text>
       </View>
       <View style={styles.scrollInnerView}>
        <Text style={styles.text}>
            你好，今晚一起出去玩玩，哈哈哈水水水水没事没事没事没事没事
        </Text>
       </View>
       <View style={styles.scrollInnerView}>
        <Text style={styles.text}>
            你好，今晚一起出去玩玩，哈哈哈水水水水没事没事没事没事没事
        </Text>
       </View>
       <View style={styles.scrollInnerView}>
        <Text style={styles.text}>
            你好，今晚一起出去玩玩，哈哈哈水水水水没事没事没事没事没事
        </Text>
       </View>
       <View style={styles.scrollInnerView}>
        <Text style={styles.text}>
            你好，今晚一起出去玩玩，哈哈哈水水水水没事没事没事没事没事
        </Text>
       </View>
       <View style={styles.scrollInnerView}>
        <Text style={styles.text}>
            你好，今晚一起出去玩玩，哈哈哈水水水水没事没事没事没事没事
        </Text>
       </View>
      </ScrollView>

       <View style={styles.bottomView}>
  
      <TouchableOpacity
      onPress={this.onPress.bind(this)}
      >

       <Image
       source={require("../images/red_round.png")}
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
  scrollStyle:{
    margin:10,
},
scrollInnerView:{
 backgroundColor:'#00F',
 width:windowWidth-20,
 borderRadius:10,
marginTop:5,
},
  text: {
    fontSize: 16,
    color:"#FFF",
    padding:6,
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
  bottomView:{
    position:'absolute',
    bottom:1,
    marginTop:5,
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  }
})