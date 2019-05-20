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

export default class Detail extends Component {
    constructor(props){
        super(props);

    }

    static navigationOptions = ({ navigation } ) => {
        return {
            title: navigation.getParam('title','detail')
        }
    }

    render(){
        return (
            <View></View>
        )
    }
}