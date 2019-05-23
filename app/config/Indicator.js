import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  ProgressBarAndroid,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default class Indicator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
        {/* <ActivityIndicator
                    animating
                    color = '#bc2b78'
                    size = "large"
                    style = {styles.activityIndicator}/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 70
  },
  activityIndicator: {
    flex: 1,
    height: 80
  }
});
