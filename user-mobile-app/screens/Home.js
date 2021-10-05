import React from "react";
import {AsyncStorage, Dimensions, ScrollView, StyleSheet} from "react-native";
import {Block, Text, theme} from "galio-framework";
import QRCode from 'react-native-qrcode-svg';

const {width} = Dimensions.get("screen");

const intialState = {
    user: {}
}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = intialState;
    }

    async componentDidMount() {
        try {
            this.setState({user: JSON.parse(await AsyncStorage.getItem('user'))});
            console.log(this.state.user)
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <Block flex center style={styles.home}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.articles}
                >
                    <Block flex style={styles.mainContainer}>
                        <Text h4>
                            {this.state.user.name}
                        </Text>
                        <Block center middle shadow shadowColor={"black"} style={styles.qrContainer}>
                            <QRCode
                                value={JSON.stringify(this.state.user)}
                                size={250}
                            />
                        </Block>
                        <Text p>
                            Travel Package: {this.state.user.package}
                        </Text>
                        <Text muted>
                            {/*<FontAwesome5
                  name="history"
                  size={15}
                  color={nowTheme.COLORS.PRIMARY}
                  style={{ opacity: 0.5,marginRight: 15 }}
              />*/}
                            Expiry Date: {this.state.user.expiryDate}
                        </Text>
                    </Block>
                </ScrollView>
            </Block>
        );
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
    }
});

export default Home;
