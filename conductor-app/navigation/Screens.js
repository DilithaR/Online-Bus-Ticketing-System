import React from 'react';
import {Dimensions} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";

// screens
import Home from '../screens/Home';
import Login from '../screens/Login';

// header for screens
import {Header} from '../components';

const {width} = Dimensions.get("screen");

const Stack = createStackNavigator();

function HomeStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Buzzy Conductor"
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
            <Stack.Screen name="App" component={HomeStack}/>
        </Stack.Navigator>
    );
}

