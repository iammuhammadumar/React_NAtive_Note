import React, { Component } from 'react';
import { TouchableOpacity, View, Image, StyleSheet, Text } from 'react-native';
import { dimens } from '../config/styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    bottomMenuBar: {
        height: '10%',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
    },
    tabBarIcon: {
        width: "5%",
        height: "55",
        resizeMode: 'contain',
        alignSelf: 'center',
    }
});

export default class TabBar extends Component {
    constructor(props) {
        super(props);
        this.image = [
            require('../assets/images/TabBar/home.png'),
            require('../assets/images/TabBar/devices.png'),
            require('../assets/images/TabBar/saved.png'),
            require('../assets/images/TabBar/cart.png')
        ];
        this.text = [
            'Home',
            'Devices',
            'SavedItems',
            'Cart',
        ];
    }

    render() {
        let navigation = this.props.navigation;
        //console.log("Routes", JSON.stringify(navigation.state));
        return (
            <View style={styles.bottomMenuBar}>

            
            </View>
        );
    }
}
