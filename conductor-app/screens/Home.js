import React from "react";
import * as Snackbar from "react-native";
import {AsyncStorage, Dimensions, Platform, ScrollView, StyleSheet} from "react-native";
import {Block, Text, theme} from "galio-framework";
import * as Permissions from 'expo-permissions';

import {BarCodeScanner} from 'expo-barcode-scanner';

import {Button, Input} from "../components";
import axios from "axios";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";

const {width} = Dimensions.get("screen");

const intialState = {
    user: {},
    hasCameraPermission: null,
    scanned: false,
    userId: '',
    name: '',
    mobile: '',
    package: '',
    expiryDate: '',
    start: '',
    end: ''
}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = intialState;
    }

    async componentDidMount() {
        await this.getPermissionsAsync();
        try {
            this.setState({user: JSON.parse(await AsyncStorage.getItem('user'))});
        } catch (e) {
            console.log(e);
        }
    }

    getPermissionsAsync = async () => {
        const {
            status
        } = await Permissions.askAsync(Permissions.CAMERA).catch((err) => {
            console.log(err)
        });
        this.setState({
            hasCameraPermission: status === 'granted'
        });
        console.log(this.state.hasCameraPermission)
    };

    handleBarCodeScanned = ({type, data}) => {
        this.setState({
            scanned: true
        });
        const userData = JSON.parse(data);
        this.setState({
            name: userData.name,
            mobile: userData.mobile,
            package: userData.package,
            expiryDate: userData.expiryDate,
            userId: userData._id
        });
    };

    handleButtonClick = () => {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        const journey = {
            passengerId: this.state.userId,
            startJourney: this.state.start,
            endJourney: this.state.end,
            date: date,
            time: time
        }

        axios.post('http://192.168.8.152:8080/journey', journey)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        scanned: false,
                        name: '',
                        mobile: '',
                        package: '',
                        expiryDate: '',
                        start: '',
                        end: ''
                    })
                    if (Platform.OS != 'android') {
                        Snackbar.show({
                            text: "Journey added successfully",
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    } else {
                        ToastAndroid.show("Journey added successfully", ToastAndroid.SHORT);
                    }
                } else {
                    alert("An error occurred while adding journey.")
                }
            })
    }

    render() {
        const {
            hasCameraPermission,
            scanned
        } = this.state;

        if (hasCameraPermission === null) {
            return (
                <Block flex center style={styles.home}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.articles}
                    >
                        <Block flex style={styles.mainContainer}>
                            <Text muted>
                                Requesting for camera permission
                            < /Text>
                        </Block>
                    </ScrollView>
                </Block>
            );
        }

        if (hasCameraPermission === false) {
            return (
                <Block flex center style={styles.home}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.articles}
                    >
                        <Block flex style={styles.mainContainer}>
                            <Text muted>
                                No access to camera
                            < /Text>
                        </Block>
                    </ScrollView>
                </Block>);
        }

        if (hasCameraPermission === true) {
            return (
                <Block flex center style={styles.home}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.articles}
                    >
                        <Block flex style={styles.mainContainer}>
                            <Text muted style={styles.cameraText}>
                                Focus the camera on passenger's QR code to retrieve data
                            </Text>
                            <Block style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 300,
                                height: 400,
                                marginVertical: 20
                            }}
                            >
                                <BarCodeScanner
                                    onBarCodeScanned={
                                        scanned ? undefined : this.handleBarCodeScanned
                                    }
                                    style={StyleSheet.absoluteFillObject}
                                />
                                {scanned && (
                                    <Block style={{
                                        flexDirection: "column",
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Block style={{flexDirection: "row"}}>
                                            <Input
                                                style={styles.inputStyles}
                                                placeholder={"Start of journey"}
                                                iconContent={<Block/>}
                                                value={this.state.start}
                                                onChangeText={(text) => this.setState({start: text})}
                                            />
                                            <Input
                                                style={styles.inputStyles}
                                                placeholder={"End of journey"}
                                                iconContent={<Block/>}
                                                value={this.state.end}
                                                onChangeText={(text) => this.setState({end: text})}
                                            />
                                        </Block>
                                        <Button
                                            textStyle={{fontFamily: 'montserrat-regular', fontSize: 12}}
                                            color="info"
                                            style={styles.button}
                                            onPress={this.handleButtonClick}
                                        >
                                            Add journey
                                        </Button>
                                        <Button
                                            title={'Tap to Scan Again'}
                                            onPress={() => this.setState({
                                                scanned: false,
                                                name: '',
                                                mobile: '',
                                                package: '',
                                                expiryDate: ''
                                            })}
                                        >
                                            Scan again
                                        </Button>
                                    </Block>
                                )}
                            </Block>
                            <Block style={{marginTop: 10}}>
                                <Text muted style={styles.cameraText}>
                                    Passenger Name: {this.state.name}
                                </Text>
                                <Text muted style={styles.cameraText}>
                                    Travel Package: {this.state.package}
                                </Text>
                                <Text muted style={styles.cameraText}>
                                    Package expiry date: {this.state.expiryDate}
                                </Text>
                            </Block>
                        </Block>
                    </ScrollView>
                </Block>
            );
        }
    }
}

const styles = StyleSheet.create({
    home: {
        width: width
    },
    articles: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE,
        paddingHorizontal: 2,
        fontFamily: 'montserrat-regular'

    },
    mainContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30
    },
    qrContainer: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginTop: 40
    },
    cameraText: {
        width: 300
    },
    inputStyles: {
        width: 140,
        marginHorizontal: 5
    }
});

export default Home;
