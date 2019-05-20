
import { createStackNavigator } from "react-navigation";

import Lists from "../views/lists.js";
import Detail from "../views/detail.js";



const AppNavigator  = createStackNavigator({
    Home: Lists,
    Detail: Detail

},{
    initialRouteName: "Home",
    defaultNavigationOptions: {
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