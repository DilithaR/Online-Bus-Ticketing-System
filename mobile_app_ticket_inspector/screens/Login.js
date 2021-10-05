import React from 'react';
import * as Snackbar from 'react-native';
import {
    AsyncStorage,
    Dimensions,
    Image,
    ImageBackground,
    Platform,
    StatusBar,
    StyleSheet,
    TextInput
} from 'react-native';
import {Block, Button, Text, theme} from 'galio-framework';
import {Images, nowTheme} from '../constants/';
import {baseURL, HeaderHeight} from '../constants/utils';
import axios from "axios";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";

const {height, width} = Dimensions.get('screen');

const intialState = {
    username: '',
    password: ''
}

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.onLoginPress = this.onLoginPress.bind(this);
        this.state = intialState;
    }

    onLoginPress(navigation) {
        const loginData = {
            username: this.state.username,
            password: this.state.password
        };
        axios.post(baseURL + 'inspector/login', loginData)
            .then(response => {
                if (response.data.success === true) {
                    AsyncStorage.setItem('user', JSON.stringify(response.data.user));
                    navigation.navigate('App')
                } else {
                    if (Platform.OS != 'android') {
                        Snackbar.show({
                            text: response.data.message,
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    } else {
                        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                    }
                }
            }).catch(error => {
            console.log(error);
        })
    }

    render() {
        const {navigation} = this.props;

        return (
            <Block flex style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <Block flex>
                    <ImageBackground
                        source={Images.Onboarding}
                        style={{flex: 1, height: height, width, zIndex: 1}}
                    />
                    <Block space="between" style={styles.padded}>
                        <Block>
                            <Block middle>
                                <Image source={Images.NowLogo}
                                       style={{width: 115, height: 124, bottom: 50, position: 'absolute'}}/>
                            </Block>
                            <Block>
                                <Block>
                                    <Text
                                        style={{
                                            fontFamily: 'montserrat-regular',
                                            bottom: 50,
                                            letterSpacing: 2,
                                            paddingHorizontal: 20,
                                            textAlign: 'center'
                                        }}
                                        color="white"
                                        size={44}
                                    >
                                        Buzzy Inspector
                                    </Text>
                                    <TextInput
                                        placeholder="Username"
                                        placeholderColor="#c4c3cb"
                                        name={"username"}
                                        value={this.state.username}
                                        onChangeText={(text) => this.setState({username: text})}
                                        style={styles.loginFormTextInput}
                                    />
                                    <TextInput
                                        placeholder="Password"
                                        placeholderColor="#c4c3cb"
                                        name={"password"}
                                        value={this.state.password}
                                        onChangeText={(text) => this.setState({password: text})}
                                        style={styles.loginFormTextInput}
                                        secureTextEntry={true}
                                    />
                                </Block>
                            </Block>
                            <Block
                                row
                                style={{
                                    marginTop: theme.SIZES.BASE * 2.5,
                                    marginBottom: theme.SIZES.BASE * 2
                                }}
                            >
                                <Button
                                    shadowless
                                    style={styles.button}
                                    color={nowTheme.COLORS.PRIMARY}
                                    /*onPress={() => navigation.navigate('App')}*/
                                    onPress={() => {
                                        this.onLoginPress(navigation)
                                    }}
                                >
                                    <Text
                                        style={{fontFamily: 'montserrat-bold', fontSize: 14}}
                                        color={theme.COLORS.WHITE}
                                    >
                                        Login
                                    </Text>
                                </Button>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.BLACK,
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        zIndex: 3,
        position: 'absolute',
        bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0
    },

    gradient: {
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 66
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,

    },
});
