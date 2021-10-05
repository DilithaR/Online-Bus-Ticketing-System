import React from 'react';
import {Image, LogBox} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {Asset} from 'expo-asset';
import {Block, GalioProvider} from 'galio-framework';
import {NavigationContainer} from '@react-navigation/native';

import Screens from './navigation/Screens';
import {articles, Images, nowTheme} from './constants';

// cache app images
const assetImages = [
    Images.Onboarding,
    Images.Logo,
    Images.Pro,
    Images.NowLogo,
    Images.iOSLogo,
    Images.androidLogo,
    Images.ProfilePicture,
    Images.CreativeTimLogo,
    Images.InvisionLogo,
    Images.RegisterBackground,
    Images.ProfileBackground
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
        fontLoaded: false
    };

    render() {
        LogBox.ignoreLogs(['Warning: ...']);
        LogBox.ignoreAllLogs();
        if (!this.state.isLoadingComplete) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <NavigationContainer>
                    <GalioProvider theme={nowTheme}>
                        <Block flex>
                            <Screens/>
                        </Block>
                    </GalioProvider>
                </NavigationContainer>
            );
        }
    }

    _loadResourcesAsync = async () => {
        await Font.loadAsync({
            'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
            'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf'),
            'poppins-regular': require('./assets/font/Poppins-Regular.ttf'),
            'poppins-bold': require('./assets/font/Poppins-Bold.ttf'),
            'poppins-extra-bold': require('./assets/font/Poppins-ExtraBold.ttf'),
            'poppins-extra-light': require('./assets/font/Poppins-ExtraLight.ttf'),
            'poppins-medium': require('./assets/font/Poppins-Medium.ttf'),
            'poppins-light': require('./assets/font/Poppins-Light.ttf'),
            'poppins-semi-bold': require('./assets/font/Poppins-SemiBold.ttf'),
            'poppins-thin': require('./assets/font/Poppins-Thin.ttf')
        });

        this.setState({fontLoaded: true});
        return Promise.all([...cacheImages(assetImages)]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        if (this.state.fontLoaded) {
            this.setState({isLoadingComplete: true});
        }
    };
}
