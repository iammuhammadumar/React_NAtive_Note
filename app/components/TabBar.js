import React, {Component} from 'react';
import {TouchableOpacity, View, Image, StyleSheet, Text} from 'react-native';
import {dimens} from '../config/styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  bottomMenuBar: {
    height: hp('9.7830%'),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
  },
  tabBarIcon: {
    width: wp('6.1200%'),
    height: wp('6.1200%'),
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
    const {routes, index} = navigation.state;
    //console.log("Routes", JSON.stringify(navigation.state));
    return (
      <View style={styles.bottomMenuBar}>
        {this.text.map((route, idx) => {
          const isActive = routes[index].routeName === this.text[idx];
          const color = isActive ? '#5e3393' : 'black';
          //const color = 'black';
          return (
            <View style={{
              height: hp('6.0602%'), width: wp('13.0000%'),
              justifyContent: 'center', alignItems: 'center'
            }}
                  key={this.text[idx]}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(this.text[idx])}>
                <Image style={[styles.tabBarIcon, {
                  tintColor: color,
                }]} source={this.image[idx]}/>
                <Text style={{
                  fontFamily: isActive ? "Montserrat-Bold" : "Montserrat",
                  fontSize: hp('1.4%'),
                  fontWeight: "300",
                  textAlign: 'center',
                  color: isActive ? '#5e3393' : "#555555"
                  //color: "#555555"
                }}>{this.text[idx] === "SavedItems" ? "Saved" : this.text[idx]}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    );
  }
}
