import React from "react";
import {Dimensions, Image, ScrollView, StyleSheet} from "react-native";
import {Block, theme} from "galio-framework";
import {useSafeArea} from "react-native-safe-area-context";
import Images from "../constants/Images";
import {DrawerItem as DrawerCustomItem, Icon} from "../components";

const {width} = Dimensions.get("screen");

function CustomDrawerContent({
                                 drawerPosition,
                                 navigation,
                                 profile,
                                 focused,
                                 state,
                                 ...rest
                             }) {
    const insets = useSafeArea();
    const screens = [
        "Home",
        "Travel History"
    ];
    return (
        <Block
            style={styles.container}
            forceInset={{top: "always", horizontal: "never"}}
        >
            <Block style={styles.header}>
                <Image style={styles.logo} source={Images.Logo}/>
                <Block right style={styles.headerIcon}>
                    <Icon
                        name="align-left-22x"
                        family="NowExtra"
                        size={15}
                        color={"white"}
                    />
                </Block>
            </Block>
            <Block flex style={{paddingLeft: 8, paddingRight: 14, marginTop: 50}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    {screens.map((item, index) => {
                        return (
                            <DrawerCustomItem
                                title={item}
                                key={index}
                                navigation={navigation}
                                focused={state.index === index ? true : false}
                            />
                        );
                    })}
                    <Block flex style={{marginTop: 400, marginVertical: 8, paddingHorizontal: 8}}>
                        <Block
                            style={{
                                borderColor: 'white',
                                width: '93%',
                                borderWidth: StyleSheet.hairlineWidth,
                                marginHorizontal: 10
                            }}
                        />
                    </Block>
                    <DrawerCustomItem title="LOGOUT" navigation={navigation}/>
                </ScrollView>
            </Block>
        </Block>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingHorizontal: 28,
        paddingBottom: theme.SIZES.BASE,
        paddingTop: theme.SIZES.BASE * 3,
        justifyContent: "center"
    },
    headerIcon: {
        marginTop: -20
    },
    logo: {
        height: 40,
        width: 37
    }
});

export default CustomDrawerContent;
