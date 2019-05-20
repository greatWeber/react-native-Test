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
} from 'react-native';

const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

const server = "http://192.168.3.156:5500/server/data.json";

export default class Lists extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      loaded: false
    };
    

    this.fetchData = this.fetchData.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  static navigationOptions = {
    title: 'Home'
  }

  _onPressButton(item){
    // Alert.alert("你点击了列表");
    console.log('你点击了列表');
    this.props.navigation.navigate('Detail',{
      id: item.id,
      title: item.title
    })
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    loaderHandler.showLoader("Loading"); 
    fetch(server)
      .then(response => response.json())
      .then(responseData =>{
        // print(data)
        console.log(responseData );
        this.setState({
          data: this.state.data.concat(responseData.list),
          loaded: true
        });
        setTimeout(()=>{
          loaderHandler.hideLoader();
        },1000)
      })
  }


  render() {
    return (
      <View style={s.container}>

        <FlatList
          data={this.state.data}
          renderItem={this.renderList}
          keyExtractor={item=>item.id}
        />
      </View>
    )
  }

  renderLoading(){
    return (
      <View style={s.loadWrapper}>
        
        <Text style={s.loadText}>loading...</Text>
      </View>
    )
  }

  renderList({item}){
    // 渲染列表
    let _this = this;
    return (
      <TouchableNativeFeedback
        onPress={()=>{_this._onPressButton(item)}}
        background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={s.listItem}>
            <Image style={s.listImage} source={{uri: item.url}}/>
            <View style={s.infoBox}>
              <Text style={s.listTitle}>{item.title}</Text>
              <Text style={s.listTime}>{item.time}</Text>
            </View>
          </View> 
        </TouchableNativeFeedback>
      
    );
  }

  
}

const s = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  listItem: {
    // flex: 1,
    height: 120,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#eee',
    // backgroundColor: '#000000',
  },
  listImage: {
    width: 200,
    height: 100
  },
  infoBox: {
    flex: 1,
    height: 100,
    flexDirection: 'column', 
    justifyContent: 'space-between',
    alignItems:'flex-start',
    marginLeft: 20, 
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  listTime: {
    fontSize: 16,
    color: '#666'
  },

  loadWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  }


});
