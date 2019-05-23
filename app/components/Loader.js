import React from "react";
import {dimens} from "../config/styles";
import {
  View,
  ActivityIndicator
} from 'react-native';

const Loader = () => (
  <View style={{
    width: dimens.screenWidth,
    height: dimens.screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000020',
    position: 'absolute',
    zIndex: 5
  }}>
    <ActivityIndicator size='large' color='black'/>
  </View>
);

export default Loader;
