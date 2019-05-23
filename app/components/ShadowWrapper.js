import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const COLOR = '#000';
const ShadowWrapper = ({ style, children }) => (
  <View style={[style, {
    shadowColor: COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: wp('4.0000%'),
    elevation: wp('2.0000%'),
    overflow: 'hidden',
  }]}>
    {children}
  </View>
);

export default ShadowWrapper;
