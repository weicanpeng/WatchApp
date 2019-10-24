import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, FlatList } from 'react-native';
import msgData from '../data/message';
import moment from 'moment';

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MessageData: [],
        };
    }

    componentWillMount() {

    }
    keyExtractor(item, index) {
        console.log(JSON.stringify(item));//这里的item就是data里的每一项
        console.log(index);//index就是每一项的索引
    }
    renderText(item) {


        //let time = moment("2018-10-30T07:00:00+0000").ValueOf();
        let timeStr = moment(item.created).format("mm:ss a");

        if (item.kind == 'text') {
            return (
                <View style={styles.textItemStyle}>
                    <Image style={styles.leftImage} source={require("../images/logo_small.png")} />
                    <Text style={styles.textCenter}>{item.text}</Text>
                </View>
            )
        } else {
            return (<ImageBackground
                source={require("../images/bg_chat.png")}
                style={styles.imgBg}
            >
                <Text style={styles.textLeft}>Sam</Text>
                <Text style={styles.textRight}>10:28AM</Text>
            </ImageBackground>
            )
        }
    }
    renderItem(item) {
        if (item.kind == 'text') {
            return (<View key={item._id}>
                {this.renderText(item)}
            </View>)
        } else {
            return (
                <View key={item._id}>
                    <View style={styles.topView}>
                        <Image  source={require("../images/bell.png")} />
                        <Text style={styles.bigText}>Fall Detected</Text>
                    </View>
                    <TouchableOpacity>
                        {this.renderText(item)}
                    </TouchableOpacity>
                </View>)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={msgData.data}
                    horizontal={false}
                    initialNumToRender={3}
                    refreshing={true}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={this.keyExtractor} />
            </View>);
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
    leftImage:{
        height: 44,
        alignContent:'flex-start',
        width:39,
    },
    bigText: {
        color: '#FFF',
        fontSize: 28,
       
    },
    textItemStyle:{
        marginBottom:10,
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent:'flex-start'
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
    viewCenter: {
        color: '#FFF',
        fontSize: 28,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    textCenter: {
        textAlign: "center",
        alignItems:'center',
        paddingLeft:5,
        justifyContent:'center',
        textAlignVertical:'center',
        color: '#FFF',
        lineHeight:44,
        fontSize: 35,
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