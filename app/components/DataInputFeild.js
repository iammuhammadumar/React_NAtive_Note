
import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

export default class DataInputFeild extends Component {
  state = {
    dialogVisible: false
  };

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  render() {
    return (
      <View style={{flex:1, backgroundColor:'#000'}}>
        <TouchableOpacity onPress={()=> this.props.showDialog()}>
          <Text style={{ textAlign: 'center', padding: 150 }}>Show Dialog</Text>
        </TouchableOpacity>
        <Dialog.Container  visible={this.props.dialogVisible}>
          <Dialog.Title style={{ fontSize: 25, textAlign: 'center' }}>Card Detail</Dialog.Title>
          <Text style={{ textAlign: 'center', fontSize: 16, color: "#000000", paddingBottom: 10}}>{'Enter your' +" " +  this.props.feildName}</Text>
          <Dialog.Input style={{borderColor:'#cccccc', borderWidth:2,borderRadius:10}}/>
          <Dialog.Button label="Cancel" onPress={this.props.handleCancel} />
          <Dialog.Button label="OK" onPress={this.props.handleDelete} />
        </Dialog.Container>
      </View>
    );
  }
}