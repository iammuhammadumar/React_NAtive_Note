import React from "react";
import { dimens } from "../config/styles";
import { View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const Cross = ({ style }) => (
  <View
    style={{
      width: wp("7.4000%"),
      height: wp("7.4000%"),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: wp("7.4000%") / 2,
      backgroundColor: "white"
    }}
  >
    <Image
      source={require("../assets/images/Icons/cross.png")}
      style={[
        style,
        {
          width: wp("3.0000%"),
          height: wp("3.0000%")
        }
      ]}
    />
  </View>
);

export default Cross;
