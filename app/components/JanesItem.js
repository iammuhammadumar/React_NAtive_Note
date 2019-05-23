import React from "react";
import {Image, Platform, Share, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import ShadowWrapper from "./ShadowWrapper";
import helpers from "../utils/helpers";

const styles = StyleSheet.create({
  janeListView: {
    width: hp("38.5697%") * 0.74308,
    height: hp("38.5697%"),
    borderRadius: wp("2.0000%"),
    borderColor: "#000",
    marginStart: wp("3.6000%"),
    marginEnd: wp("2.4000%"),
    marginTop: Platform.OS === "ios" ? hp("3.1485%") : hp("1.6867%"),
    marginBottom: Platform.OS === "ios" ? hp("3.1485%") : hp("1.6867%")
  },
  dummyText: {
    //fontFamily: "Mont-DEMO",
    fontSize: hp("1.4956%"),
    //fontWeight: "200",
    color: "black",
    paddingTop: hp("0.2249%")
  },
  janeListImage: {
    height: hp("21.2527%"),
    width: hp("21.2527%") * 1.3551
  },
  janeListInnerView: {
    width: hp("17.4294%") * 1.65395,
    height: hp("17.4294%"),
    backgroundColor: "white"
    // alignItems: 'center',
  },
  janeListText: {
    //fontFamily: "Mont-DEMO",
    fontSize: hp("1.7992%"),
    //fontWeight: "200",
    fontStyle: "normal",
    color: "black"
  },
  janeRatingText: {
    //fontFamily: "Mont-DEMO",
    fontSize: 17.3,
    //fontWeight: "900",
    color: "#000000"
  },
  jansRatingsText: {
    fontSize: hp("2.4739%")
  },
  iconImage: {
    height: wp("3.6000%"),
    width: wp("3.6000%"),
    resizeMode: "contain",
    tintColor: "black"
  }
});
const JanesItem = ({item, index, onSavePress, navigation, updateItemState, onItemPress}) => (
  <ShadowWrapper
    style={[
      styles.janeListView,
      index === 0
        ? {marginStart: wp("5.8600%")}
        : {marginStart: wp("3.6000%")},
      {backgroundColor: "white"}
    ]}
  >
    <TouchableOpacity
      onPress={() => onItemPress(item, index, onSavePress, updateItemState)}
    >
      <View
        style={{
          borderTopStartRadius: wp("2%"),
          borderBottomStartRadius: wp("2%")
        }}
      >
        <Image
          style={styles.janeListImage}
          source={{uri: item.bannerImage}}
        />
      </View>
    </TouchableOpacity>
    <View
      style={{
        height: hp("17.4294%"),
        paddingStart: wp("5.2000%"),
        paddingTop: hp('1.7992%'),
        paddingEnd: wp("4.8000%")
      }}
    >
      <Text numberOfLines={1} style={styles.janeListText}>
        {item.title}
      </Text>
      <Text numberOfLines={2} style={styles.dummyText}>
        {item.content.replace(/(<([^>]+)>)/gi, "")}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: hp("2.8232%"),
          paddingBottom: hp("3.2610%")
        }}
      >
        <Text style={styles.jansRatingsText}>
          {item.rating}
          <Text
            style={{
              fontSize: hp("2.4739%"),
              fontWeight: "200",
              color: "#707070"
            }}
          >
            /
            <Text
              style={{
                opacity: 0.3,
                //fontFamily: "Mont-DEMO",
                fontSize: hp("2.4739%"),
                //fontWeight: "200",
                color: "#707070"
              }}
            >
              5.0
            </Text>
          </Text>
        </Text>
        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
          <TouchableOpacity
            onPress={()=>helpers.share(item)}
            style={{
              width: wp("8.0000%"),
              height: wp("8.0000%"),
              opacity: 0.5,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: wp("8.0000%") / 2,
              backgroundColor: "#d4d4d4"
            }}
          >
            <Image
              source={require("../assets/images/Icons/share.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: wp("8.0000%"),
              height: wp("8.0000%"),
              opacity: 0.5,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: wp("8.0000%") / 2,
              backgroundColor: item.isSaved ? "#00b3e0" : "#d4d4d4",
              marginStart: wp("1.6600%")
            }}
            onPress={() => onSavePress(item, index)}
          >
            <Image
              source={require("../assets/images/HomeScreen/bookmark.png")}
              style={[
                styles.iconImage,
                {tintColor: item.isSaved ? "white" : "black"}
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </ShadowWrapper>
);

export default JanesItem;
