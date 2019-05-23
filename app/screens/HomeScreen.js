import { Badge, Body, Card, CardItem, Right } from 'native-base';
import React from 'react';
import { Alert, TouchableOpacity, View, AsyncStorage } from 'react-native';
import Footer from '../components/Footer';
import { commonStyles } from './styles';
import FirstScreen from './FirstScreen';
import Modal from "react-native-modal";
import Lodaer from '../components/Loader';
import AddComponent from './AddComponent';
import Noteslist from './Noteslist';
import { NavigationEvents } from 'react-navigation';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true,
      ShowLoader: true,
      emtyList: true,
      NoteList:[]
    };
  }
  _toggleModal = async () => {
    await AsyncStorage.setItem('key', 'true');
    this.setState({ isModalVisible: false });
  }
  navigateToHome =async () => {
    await AsyncStorage.setItem('key', 'true');
    this.setState({ isModalVisible: false },()=>{
      this.props.navigation.navigate('NewNote2');
    });
    // this.setState({ isModalVisible: false }, () => {
    //   this.props.navigation.navigate('NewNote2');
    // });
  }
  _storeData = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
        await this.setState({ isModalVisible: false });
      }
    } catch (error) {
      // Error saving data
    }
  }
  fetchData = async () => {
    try {
        let myArray = await AsyncStorage.getItem('NotesList')
        // .then(
        // (value) => this.setState({ emtyList: false ,
        //   NoteList: JSON.parse(value)  
        // }))
      if (myArray !== null) {
        this.setState({ emtyList: false }, ()=>{
        this.setState({NoteList: JSON.parse(myArray)});
        });
       
      }
    } catch (error) {
      // Error retrieving data
      alert("Error")
    }
  }
  componentDidMount() {
    this.fetchData();
    this._storeData();
    setTimeout(() => { this.setState({ ShowLoader: false }) }, 2000);
  }
  render() {
    return !this.state.ShowLoader ? (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
              <NavigationEvents
      onDidFocus={() => this.fetchData() }
    />
        <Modal isVisible={this.state.isModalVisible}>
          <FirstScreen
            navigateToHome={this.navigateToHome}
            _toggleModal={this._toggleModal} />
        </Modal>
        {
          this.state.emtyList ?
            <AddComponent
              navigation={this.props.navigation}
              onPress={() => this.props.navigation.navigate('NewNote2')} /> :
            <Noteslist NoteList={this.state.NoteList} fetchData = {this.fetchData}/>
        }
        <Footer navigation={this.props.navigation} text={"+"} onPress={() => this.props.navigation.navigate('NewNote2')} />
      </View>
    ) : <Lodaer />
  }
}

export default HomeScreen;
