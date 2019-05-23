import { Badge, Body, Card, CardItem, Right } from 'native-base';
import React from 'react';
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { commonStyles } from './styles';

class AddComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true,
      ShowLoader: true
    };
  }
  _toggleModal = async () => {
    await AsyncStorage.setItem('key', 'true');
    this.setState({ isModalVisible: false });
  }
  navigateToHome = () => {
    this.setState({ isModalVisible: false }, () => {
      this.props.navigation.navigate('NewNote2', { NoteList: this.props.navigation.state.params.NoteList })
    });
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
  componentDidMount() {
    this._storeData();
    setTimeout(() => { this.setState({ ShowLoader: false }) }, 1000)
  }
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ marginTop: 40, flex: 1 }}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>ALL NOTES</Text>
          <TouchableOpacity
            onPress={() => this.props.onPress()}
          >
            <Card
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20
              }}
            >
              <CardItem>
                <Body>
                  <Text style={{ fontSize: 18 }}>ADD TITLE HERE</Text>
                  <Text style={{ fontSize: 12 }}>NOTES INFO</Text>
                  <Text style={{ fontSize: 12, marginTop: 10 }}>
                    Types your notes here...
                  </Text>
                </Body>
                <Right>
                  <Body>
                    <View style={{ right: -40 }}>
                      <Badge
                        style={[
                          {
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: 'black'
                          },

                          commonStyles.badgeSize,
                          commonStyles.alignCenter,
                          commonStyles.row
                        ]}
                      >
                        <Text style={[commonStyles.text8, { color: 'black' }]}>
                          ADD TAGS
                        </Text>
                      </Badge>
                    </View>
                  </Body>
                </Right>
              </CardItem>
            </Card>

          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default AddComponent;
