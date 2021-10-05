import React from 'react';
import {AsyncStorage, ScrollView, StyleSheet} from 'react-native';
//galio
import {Block, theme} from 'galio-framework';

import {nowTheme} from '../constants/';
import Card from "../components/Card";
import axios from "axios";

const intialState = {
    user: {},
    history: []
}

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = intialState;
    }

    async componentDidMount() {
        try {
            this.setState({user: JSON.parse(await AsyncStorage.getItem('user'))});
        } catch (e) {
            console.log(e);
        }

        axios.get('http://192.168.8.152:8080/journey')
            .then(response => {
                console.log(response.data.journey)
                this.setState({history: response.data.journey})
            })
    }

    render() {
        return (
            <Block flex>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.state.history.length > 0 && this.state.history.map(i => {
                        if (i.passengerId === this.state.user._id) {
                            return (
                                <Card
                                    key={i._id}
                                    item={{
                                        title: i.date,
                                        subtitle: i.startJourney + " > " + i.endJourney,
                                        description: i.time
                                    }}
                                />
                            )
                        }
                    })}
                </ScrollView>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: theme.SIZES.BASE
    },
    title: {
        fontFamily: 'montserrat-bold',
        paddingBottom: theme.SIZES.BASE,
        marginTop: 44,
        color: nowTheme.COLORS.HEADER
    },
    cardImage: {
        maxWidth: 0,
        maxHeight: 0
    }
});

export default History;
