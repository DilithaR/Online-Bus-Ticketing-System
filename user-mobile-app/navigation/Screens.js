import React from 'react';
import {Dimensions} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
// screens
import Home from '../screens/Home';
import History from '../screens/History';
import Login from '../screens/Login';
// drawer
import CustomDrawerContent from "./Menu";
// header for screens
import {Header} from '../components';
import {nowTheme} from "../constants";

const {width} = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HistoryStack(props) {
    return (
        <Stack.Navigator initialRouteName="History" mode="card" headerMode="screen">
            <Stack.Screen name="Travel History" component={History} options={{
                header: ({navigation, scene}) => (
                    <Header title="Travel History" navigation={navigation} scene={scene}/>),
                backgroundColor: '#FFFFFF'
            }}/>
        </Stack.Navigator>
    );
}

function HomeStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Home"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#FFFFFF"}
                }}
            />
        </Stack.Navigator>
    );
}

function AppStack(props) {
    return (
        <Drawer.Navigator
            style={{flex: 1}}
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerStyle={{
                backgroundColor: nowTheme.COLORS.PRIMARY,
                width: width * 0.8
            }}
            drawerContentOptions={{
                activeTintcolor: nowTheme.COLORS.WHITE,
                inactiveTintColor: nowTheme.COLORS.WHITE,
                activeBackgroundColor: "transparent",
                itemStyle: {
                    width: width * 0.75,
                    backgroundColor: "transparent",
                    paddingVertical: 16,
                    paddingHorizonal: 12,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                },
                labelStyle: {
                    fontSize: 18,
                    marginLeft: 12,
                    fontWeight: "normal"
                }
            }}
            initialRouteName="Home"
        >
            <Drawer.Screen name="Home" component={HomeStack}/>
            <Drawer.Screen name="Travel History" component={HistoryStack}/>
        </Drawer.Navigator>
    );
}

export default function OnboardingStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="none">
            <Stack.Screen
                name="Onboarding"
                component={Login}
                option={{
                    headerTransparent: true
                }}
            />
            <Stack.Screen name="App" component={AppStack}/>
        </Stack.Navigator>
    );
}

