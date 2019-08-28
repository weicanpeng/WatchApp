import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Dimensions,Image,StyleSheet,YellowBox} from 'react-native';

export default class HeartRate extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Async Storage has been extracted from react-native core',
    ]);
     

      
      
  }
  static get defaultProps() {
    return {
        TopText: "",
        BottomText: '',
    }
}
  
  

  componentDidMount(){
  
  }

  componentWillUnmount(){
  
  }

  renderTopView(topText,TopTextColor,img){
      if(img==''||img==undefined||img==null)
      {
    return(
        <View style={styles.topView}>
        <Text style={{color:TopTextColor,fontSize:20}}>{topText}</Text>
        </View>
    )
      }else{
        return (
        <View style={styles.topView}>
        <Text style={{color:TopTextColor,fontSize:20}}>{topText}</Text>
        <Image 
         style={styles.topImg}
         source={img}
        />
        </View>
        )
      }
  }
  renderBottomView(bottomText,bottomTextColor,img){
    if(img==''||img==undefined||img==null)
    {
  return(
    <View>
    <Text style={{color:bottomTextColor,fontSize:20}}>{bottomText}</Text>
    </View>
  )
    }else{
      return (
      <View style={{flexDirection:'row'}}>
      <Text style={{color:bottomTextColor,fontSize:20}}>{bottomText}</Text>
      <Image
       source={img}
      />
      </View>
      )
    }
}


  render() {
    return (
      <View style={styles.container}>

      {this.renderTopView(this.props.TopText,this.props.TopTextColor,this.props.TopImg)}
      {this.renderBottomView(this.props.BottomText,this.props.BottomTextColor,this.props.BottomImg)}
        
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
  topImg:{
      position:'absolute',
      bottom:0,
      right:0
  },
  topView:{
    marginBottom:5,
    paddingBottom:5,
  }
})