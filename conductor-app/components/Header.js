import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import {Dimensions, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {Block, NavBar, theme} from 'galio-framework';
import {AntDesign} from '@expo/vector-icons';
import nowTheme from '../constants/Theme';

const {height, width} = Dimensions.get('window');
const iPhoneX = () =>
    Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class Header extends React.Component {
    handleLeftPress = () => {
        const {back, navigation} = this.props;
        return back ? navigation.goBack() : navigation.openDrawer();
    };
    renderRight = () => {
        return [
            <TouchableOpacity key="logout btn" style={styles.button} onPress={() => navigation.navigate('Onboarding')}>
                <AntDesign
                    name="logout"
                    size={20}
                    color="black"
                />
            </TouchableOpacity>
        ]
    };

    renderHeader = () => {
        const {search, options, tabs} = this.props;
        if (search || tabs || options) {
            return (
                <Block center>
                    {search ? this.renderSearch() : null}
                    {options ? this.renderOptions() : null}
                    {tabs ? this.renderTabs() : null}
                </Block>
            );
        }
    };

    render() {
        const {
            back,
            title,
            white,
            transparent,
            bgColor,
            iconColor,
            titleColor,
            navigation,
            ...props
        } = this.props;

        const noShadow = ['Home', 'Search', 'Categories', 'Deals', 'Pro', 'Profile', 'Buzzy Conductor'].includes(title);
        const headerStyles = [
            !noShadow ? styles.shadow : null,
            transparent ? {backgroundColor: 'rgba(0,0,0,0)'} : null
        ];

        const navbarStyles = [styles.navbar, bgColor && {backgroundColor: bgColor}];

        return (
            <Block style={headerStyles}>
                <NavBar
                    back={false}
                    title={title}
                    style={navbarStyles}
                    transparent={transparent}
                    right={this.renderRight()}
                    rightStyle={{alignItems: 'center', marginRight: 0}}
                    titleStyle={[
                        styles.title,
                        {color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER']},
                        titleColor && {color: titleColor}
                    ]}
                    {...props}
                />
                {this.renderHeader()}
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 0,
        position: 'relative'
    },
    title: {
        width: 'auto',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: "400",
        fontFamily: 'montserrat-regular'
    },
    navbar: {
        paddingVertical: 0,
        paddingBottom: theme.SIZES.BASE * 1.5,
        paddingTop: iPhoneX ? theme.SIZES.BASE * 2 : theme.SIZES.BASE,
        zIndex: 5,
    },
    shadow: {
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 3
    },
    notify: {
        backgroundColor: nowTheme.COLORS.SUCCESS,
        borderRadius: 4,
        height: theme.SIZES.BASE / 2,
        width: theme.SIZES.BASE / 2,
        position: 'absolute',
        top: 9,
        right: 12
    },
    header: {
        backgroundColor: theme.COLORS.WHITE
    },
    divider: {
        borderRightWidth: 0.3,
        borderRightColor: theme.COLORS.ICON
    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: nowTheme.COLORS.BORDER
    },
    options: {
        marginBottom: 24,
        marginTop: 10,
        elevation: 4
    },
    tab: {
        backgroundColor: theme.COLORS.TRANSPARENT,
        width: width * 0.35,
        borderRadius: 0,
        borderWidth: 0,
        height: 24,
        elevation: 0
    },
    tabTitle: {
        lineHeight: 19,
        fontWeight: '400',
        color: nowTheme.COLORS.HEADER
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: 'center'
    },
});

export default withNavigation(Header);
