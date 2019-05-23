import React, {Component} from "react";
import {Dimensions, ImageBackground, StatusBar, Text, View} from "react-native";
import Loader from "../components/Loader";
import FirstScreen from "../screens/FirstScreen";
import HomeScreen from "../screens/HomeScreen";
import Menu from "../screens/Menu";
import MenuScreen from "../screens/MenuScreen";
import NewNote from "../screens/NewNote";
import NewNote2 from "../screens/NewNote2";
import Noteslist from "../screens/Noteslist";
import SignInScreen from "../screens/SignInScreen";
import UploadScreen from "../screens/UploadScreen";
import {createAppContainer, createDrawerNavigator, createStackNavigator} from "react-navigation";
import Drawer from '../components/Drawer';

 const {width, height} = Dimensions.get("screen");

const MainTab = createStackNavigator(
    {
        HomeScreen: {screen: HomeScreen},
        NewNote: {screen: NewNote},
        NewNote2: {screen: NewNote2},
        Noteslist: {screen: Noteslist},
        Menu: {screen: Menu},
        MenuScreen: {screen: MenuScreen},
        SignInScreen: {screen: SignInScreen},
        UploadScreen: {screen: UploadScreen},
    },
    {
        initialRouteName: 'HomeScreen',
        headerMode: "none"
    }
);

// const CartStack = createStackNavigator(
//     {
//         CheckoutForm: {screen: CheckoutForm},
//         BillingInformation: {screen: BillingInformation},
//         PaymentInfo: {screen: PaymentInfo},
//         OrderConfirmation: {screen: OrderConfirmation}
//     },
//     {
//         headerMode: "none"
//     }
// );

// const HomeTabs = createBottomTabNavigator(
//     {
//         Home: {screen: MainTab},
//         Devices: {screen: MyDevices},
//         Bag: {screen: Dummy},
//         SavedItems: {screen: SavedPasses},
//         Cart: {screen: Cart},
//         Search: {screen: Search},
//         SearchResult: {screen: SearchResult},
//     },
//     {
//         tabBarComponent: TabBar,
//         swipeEnabled: false,
//         animationEnabled: false,
//         backBehavior: "none",
//         lazy: true
//     }
// );

// const AppDrawer = createDrawerNavigator(
//     {
//         Home: {screen: MainTab},
//         Noteslist: {screen: Noteslist},
//         Menu: {screen: Menu},
//         MenuScreen: {screen: MenuScreen},
//         MenuScreen: {screen: MenuScreen},

//     },
//     {
//         drawerWidth: Math.min(height, width),
//         drawerPosition: "left",
//         contentOptions: {
//             activeTintColor: "white"
//         },
      
//     }
// );
const AppDrawer = createDrawerNavigator(
    {
        Home: {screen: MainTab},
    },
    {
        drawerWidth: Math.min(height, width),
        drawerPosition: "left",
        contentOptions: {
            activeTintColor: "white"
        },
        contentComponent: props => <Drawer navigation={props.navigation}/>
    }
);

const AppContainer = createAppContainer(AppDrawer);

export default class AppNavigator extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <AppContainer/>
            </View>
        );
    }
}

