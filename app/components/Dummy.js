import React, { Component } from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { styles } from '../screens/Home/styles';

export default class Dummy extends Component {
  render() {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Dummy Tab</Text>
      </View>
    );
  }
}
