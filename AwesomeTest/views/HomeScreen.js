import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import Tab from './tabs.js';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

export default  class HomeScreen extends Component {

    constructor(props){
        super(props)
    }
    
    render(){

        return (
            <ScrollableTabView
                style={{marginTop: 20}}
                initialPage={0}
                tabBarPosition="top"
                renderTabBar={() => <DefaultTabBar  />}
            >
                <ScrollView tabLabel="最火" style={styles.tabView}>
                    
                </ScrollView>
                <ScrollView tabLabel="最新" style={styles.tabView}>
                    
                </ScrollView>
                <ScrollView tabLabel="图集" style={styles.tabView}>
                    
                </ScrollView>
            </ScrollableTabView>
        )
    }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  
});