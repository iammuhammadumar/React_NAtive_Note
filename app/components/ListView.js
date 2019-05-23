import React from "react";
import {FlatList, Image, Platform, Share, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {deleteSavedItem, saveActivity} from "../actions/asyncActions/appuser";
import ShadowWrapper from "../components/ShadowWrapper";
import InspiredItem from "./InspiredItem";
import {getImage} from "../actions/asyncActions/review";
import {updateAppState} from "../actions/syncActions";
import helpers from "../utils/helpers";

const styles = StyleSheet.create({
  inspiredDetailText: {
    flex: 1,
    //fontFamily: "Mont-DEMO",
    fontSize: hp("1.4956%"),
    //fontWeight: "200",
    fontStyle: "normal",
    lineHeight: hp("2.7775%"),
    letterSpacing: 0,
    textAlign: "left",
    color: "#000000"
  },
  inspiredDateText: {
    //fontFamily: "Mont-DEMO",
    fontSize: hp("1.9454%"),
    //fontWeight: "900",
    fontStyle: "normal",
    lineHeight: hp("2.7775%"),
    letterSpacing: 0,
    textAlign: "left",
    color: "#000000"
  },
  inspiredListView: {
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginStart: wp("2.4000%"),
    marginEnd: wp("2.4000%"),
    marginTop: Platform.OS === "ios" ? hp("3.1485%") : hp("1.6867%"),
    marginBottom: Platform.OS === "ios" ? hp("3.1485%") : hp("1.6867%")
  },
  iconImage: {
    height: hp("2.0241%"),
    width: wp("3.6000%"),
    resizeMode: "contain",
    tintColor: "black"
  }
});

class ListView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  saveItem = (item, index) => {
    // console.log("saved item from ListView..", item.isSaved);
    {
      item.isSaved
        ? this.props.actions
          .deleteSavedItem(item.savedItemId)
          .then(res => {
            // this.props.updateItemState(index, !item.isSaved, false);
            this.props.updateItemState(null, index, !item.isSaved, false);
            console.log("deleteSavedItem done...");
          })
          .catch(err => console.log(err))
        : this.props.actions
          .saveActivity(this.props.user.id, item.id)
          .then(res => {
            this.props.updateItemState(res.id, index, !item.isSaved, false);
            // this.props.updateItemState(index, !item.isSaved, false);
            console.log("saveActivity done...");
          })
          .catch(err => console.log(err));
    }
  };

  onItemPress = (item, index, onSavePress, updateItemState) => {
    this.props.actions.updateAppState({isLoading: true});
    this.props.actions.getImage(item.code).then(resp => {
      this.props.actions.updateAppState({isLoading: false});
      if (resp.errorName === "ProductNotFoundException") {
        this.props.showToast("This product is not available anymore");
      } else {
        this.props.navigation.navigate("ActivitiesAndArt", {
          item: item,
          index: index,
          onSavePress: onSavePress
        })
      }
      //console.log("Response", resp)
    }).catch(err => {
      this.props.actions.updateAppState({isLoading: false});
      console.log(err)
    });
  };

  _renderFlatListItem = ({item, index}) => (
    <ShadowWrapper
      style={[
        styles.inspiredListView,
        index === 0 ? {marginStart: wp("5.8600%")} : {}
      ]}
    >
      <Image
        style={{
          height: hp("21.1402%"),
          width: wp("76.0000%"),
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10
        }}
        source={{uri: item.bannerImage}}
      />
      {/* <View style={{
        width: wp('15.0000%'),
        height: hp('2.8112%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13.3,
        borderStyle: "solid",
        borderWidth: 0.7,
        borderColor: "#ffffff",
        position: 'absolute',
        top: '43%', left: '8%', right: 0, bottom: 0,
      }}>
        <Text style={{ color: "#ffffff" }}>{item.type}</Text>
      </View> */}
      <View
        style={{
          height: hp("9.5581%"),
          width: wp("76.0000%"),
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "white",
          alignItems: "center",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            marginTop: hp("1.7992%"),
            marginStart: wp("3.0000%"),
            marginEnd: wp("2.0000%")
          }}
        >
          <Text numberOfLines={1} style={styles.inspiredDetailText}>
            {item.title}
          </Text>
          <Text style={styles.inspiredDateText}>{"28.07.2018"}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginEnd: wp("4.2600%")
          }}
        >
          <TouchableOpacity
            onPress={()=>helpers.share(item)}
            style={{
              width: wp("8.0000%"),
              height: wp("8.0000%"),
              opacity: 0.5,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: wp("8.0000%"),
              backgroundColor: "#d4d4d4"
            }}
          >
            <Image
              source={require("../assets/images/HomeScreen/share.png")}
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
            onPress={() => this.onSavePress(item, index)}
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
    </ShadowWrapper>
  );
  _keyExtractor = (item, index) => item.id + "";

  render() {
    //  console.log("janePick Item....1 and 2", this.props.items);
    return (
      <FlatList
        // style={{marginStart: 15}}
        data={this.props.items}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item, index}) => (
          <InspiredItem
            item={item}
            index={index}
            onSavePress={this.saveItem}
            navigation={this.props.navigation}
            onItemPress={this.onItemPress}
          />
        )}
        keyExtractor={item => item.id + ""}
        onEndReachedThreshold={1}
        // onEndReached={() => this.props.loadInspiredData()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.loggedInUser
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        saveActivity,
        deleteSavedItem,
        getImage,
        updateAppState
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView);
