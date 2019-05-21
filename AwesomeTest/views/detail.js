/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableNativeFeedback,
  Alert,
  Dimensions,
  CameraRoll,
} from 'react-native';

import RNFetchBlob from 'react-native-fetch-blob';
const android = RNFetchBlob.android

import WallPaperModlue from '../assets/utils/WallPaperModule.js';
import Toast from '../assets/utils/ToastModule.js';
// import console = require('console');



const win = Dimensions.get('window');

const server = "http://192.168.3.156:5500/server/data.json";

export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            detail: {},
            loaded: false,
            id: props.navigation.getParam('id',0),
        }

        this.getDetail = this.getDetail.bind(this);
        this.downloadFn = this.downloadFn.bind(this);
        this.setWallPaper = this.setWallPaper.bind(this);

    }

    static navigationOptions = ({ navigation } ) => {
        return {
            title: navigation.getParam('title','detail')
        }
    }

    componentDidMount(){
        this.getDetail();
      }

    getDetail(){
        let _this = this;
        fetch(server)
        .then(response => response.json())
        .then(responseData =>{
            // print(data)
            console.log(responseData );
            let detail = {};
            responseData.list.forEach((item,i)=>{
                if(item.id==_this.state.id){
                    detail = item;
                    
                }
            });
            console.log('detail',detail);
            this.setState({
            detail: detail,
            loaded: true
            });
        })
    }

    // 下载图片到系统相册
    downloadFn(){
        RNFetchBlob
        .config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache : true,
          })
        .fetch('GET', this.state.detail.url)
        
        // when response status code is 200
        .then((res) => {
            console.log('file://'+res.path())
            android.actionViewIntent(res.path(), 'image/png');
            let promise = CameraRoll.saveToCameraRoll('file://'+res.path());
            promise.then(result=>{
                Alert.alert('保存成功，地址：'+result);
                console.log('result',result);
                RNFetchBlob.fs.unlink(res.path()).then(() => {
                    console.log('缓存图片删除成功')
                })
            }).catch(e=>{
                console.log(e)
            })

        })
        // Status code is not 200
        .catch((errorMessage, statusCode) => {
            // error handling
            console.log(errorMessage);
            Alert.alert('图片下载失败');
        })
        
    }


    setWallPaper(){
        WallPaperModlue.setWallPaper(this.state.detail.url,win.width,win.height,()=>{
            Toast.show('壁纸设置成功',Toast.SHORT);
        },(e)=>{
            console.log(e);
            Toast.show('壁纸设置失败',Toast.SHORT);
        });
    }

    


    render(){
        return (
            <View style={s.container}>
                <Image style={s.bgImage} source={{uri: this.state.detail.url}}></Image>

                <View style={s.operation}>
                    <TouchableNativeFeedback
                        onPress={this.downloadFn}
                        background={TouchableNativeFeedback.SelectableBackground()}
                    >
                        <View style={s.downloadBox} >
                            <Image style={s.downloadImg} source={require('../assets/images/download.png')}></Image>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={s.downloadBox}>
                        <Image style={s.downloadImg} source={require('../assets/images/love.png')}></Image>
                    </View>
                    <TouchableNativeFeedback
                        onPress={this.setWallPaper}
                        background={TouchableNativeFeedback.SelectableBackground()}
                    >
                        <View style={s.downloadBox}>
                            <Image style={s.downloadImg} source={require('../assets/images/desktop.png')}></Image>
                        </View>

                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }
}



const s = StyleSheet.create({
    container: {
        position: 'relative',
        width: win.width,
        height: win.height,
    },
    bgImage: {
        position: 'absolute',
        left: 0,
        top:0,
        zIndex: 1,
        width: win.width,
        height: win.height,
    },

    operation: {
        position:'absolute',
        bottom: 80,
        right: 20,
        width: 50,
        height: 250,
        zIndex: 2,
        // backgroundColor: 'red',
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    downloadBox: {
        width: 50,
        height: 50,
        backgroundColor:'rgba(0,0,0,0.5)',
        borderRadius: 25,
    },
    downloadImg: {
        width: 32,
        height: 32,
        margin: 9,
    }
})