import React, {PropTypes} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';


import TimeView from './TimeView';


export default class HelpView extends React.Component {

    // 7jd5udcy
    constructor(props) {
        super(props);
        
        SplashScreen.hide();
        this.state = {
         
        };
    }



    componentDidMount(){
  
          
        }

    render() {
        console.log('render');
        return (
            <View style={styles.container}>
             <View style={styles.topView}>
                 <Text style={styles.text}>John</Text>
                 <Image 
                  style={styles.text}
                  resizeMode='center'
                  source={require("../images/battery_less.png")}
                 ></Image>
                 <TimeView/>
             </View>
             <View>
                 <View style={styles.outRoundView}>
                   <Image style={styles.imgStyle}
                    resizeMode='center'
                   source={require("../images/logo_small.png")}
                   ></Image>
                 <View style={styles.roundView}>
                   <Text style={styles.helpText}>Get Help</Text>
                 </View>
                 </View>
                 
             </View>
             <View style={{flexDirection:'row'}}>
               <View style={styles.smallRoundAtive}></View>
               <View style={styles.smallRound}></View>
             </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center', 
        backgroundColor: '#000',
    },
    text:{
      fontSize:28,
      flex:1,
      marginLeft:10,
      color:"#fff",
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
      backgroundColor:'#00F',
      borderRadius:100,
    },
    topView:{
      flexDirection:'row',
      marginBottom:10,
     justifyContent:'space-between',
    },
    outRoundView:{
      width:250,
      height:250,
      alignItems:'center',
      justifyContent:'center',
      opacity:0.3,
      backgroundColor:'#00F',
      borderRadius:125,
    },
   
    smallRound:{
      width:10,
      height:10,
      margin:5,
      backgroundColor:'#c7c7c7',
      borderRadius:5,
    },
    imgStyle:{
      position:'absolute',
      top:0,
      color:'#fff',
      left:100
    },
    smallRoundAtive:{
      width:10,
      margin:5,
      height:10,
      backgroundColor:'#00F',
      borderRadius:5,
    }
  });
  