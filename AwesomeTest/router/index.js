import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator ,createBottomTabNavigator} from "react-navigation";

import Lists from "../views/lists.js";
import Detail from "../views/detail.js";
import Index from "../views/index.js";
import HomeScreen from '../views/HomeScreen.js';

import React from 'react';
import { Text, View } from 'react-native';

  
  class SettingsScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text onPress={()=>{this.props.navigation.navigate('Lists')}}>Settings!</Text>
        </View>
      );
    }
  }
  
  const TabNavigator = createBottomTabNavigator({
    Home: HomeScreen,
    Settings: SettingsScreen,
  },{
    defaultNavigationOptions: ({ navigation }) => ({
        
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent = Ionicons;
          let iconName;
          if (routeName === 'Home') {
            iconName = `ios-analytics`;
          } else if (routeName === 'Settings') {
            iconName = `ios-options`;
          }
  
          // You can return any component that you like here!
          return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
  });



const AppNavigator  = createStackNavigator({
    Index: TabNavigator,
    Lists: Lists,
    Detail: Detail

},{
    initialRouteName: "Index",
    defaultNavigationOptions: {
        title: 'wallpaper App',
        headerStyle: {
            backgroundColor: '#409EFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }
});

export default AppNavigator;