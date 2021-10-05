import React from "react";
import {AsyncStorage, Dimensions, ScrollView, StyleSheet, View} from "react-native";
import {Block, Text, theme} from "galio-framework";
import * as Permissions from 'expo-permissions';

import {BarCodeScanner} from 'expo-barcode-scanner';

import {Button} from "../components";

const {width} = Dimensions.get("screen");

const intialState = {
    user: {},
    hasCameraPermission: null,
    scanned: false,
    name: '',
    mobile: '',
    package: '',
    expiryDate: ''
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
            expiryDate: userData.expiryDate
        });
    };

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
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                width: 300,
                                height: 400
                            }}
                            >
                                <BarCodeScanner
                                    onBarCodeScanned={
                                        scanned ? undefined : this.handleBarCodeScanned
                                    }
                                    style={StyleSheet.absoluteFillObject}
                                />
                                {scanned && (
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
                                )}
                            </View>
                            <Block style={{marginTop: 40}}>
                                <Text muted style={styles.cameraText}>
                                    Passenger Name: {this.state.name}
                                </Text>
                                <Text muted style={styles.cameraText}>
                                    Passenger Mobile: {this.state.mobile}
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
        paddingVertical: 40
    },
    qrContainer: {
        width: 300,
        height: 300,
        alignSelf: "center",
        marginTop: 40
    },
    cameraText: {
        width: 300
    }
});

export default Home;
