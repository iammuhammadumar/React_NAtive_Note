import React from "react";
import { dimens } from "../config/styles";
import { View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const IconView = ({ style, children }) => (
  <View
    style={[{style},{
      width: wp("6.4000%"),
      height: hp("3.5983%"),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: wp("6.4000%") / 2,
      backgroundColor: "#d4d4d4"
    }]}>
    {children}
    </View>
);

export default IconView;
