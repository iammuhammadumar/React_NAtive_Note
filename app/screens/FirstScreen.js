import { Icon } from 'native-base';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from './styles';

class FirstScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <View
          style={{
            flex: 1,
            height: '100%'
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              top: 80,
              alignSelf: 'center'
            }}
          >
            <TouchableOpacity
            onPress ={this.props._toggleModal}
              style={[
                commonStyles.button,
                {
                  alignSelf: 'center'
                }
              ]}
            >
              <Text style={[commonStyles.buttonText, { fontSize: 14 }]}>
                SKIP THIS
              </Text>
            </TouchableOpacity>
            <View
              style={[
                commonStyles.notebutton,
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 20
                }
              ]}
            >
              <Text
                style={[
                  commonStyles.notebuttonText,
                  { fontSize: 22, width: 200 }
                ]}
              >
                WELCOME TO THE{' '}
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
                  NOTE APP
                </Text>
              </Text>
            </View>
            <View
              style={[
                commonStyles.note,
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 20,
                  alignSelf: 'center'
                }
              ]}
            >
              <Text style={[commonStyles.notetext, { fontSize: 12 }]}>
                CLICK THE (+) ICON TO CREATE THE NOTE
              </Text>
            </View>
            <View
              style={[
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 2,
                  height: '48%',
                  backgroundColor: 'white',
                  alignSelf: 'center'
                }
              ]}
            />
            <TouchableOpacity
                onPress={this.props.navigateToHome}>
            <Icon
              type="MaterialIcons"
              name="add-circle"
              style={[{ fontSize: 50, bottom: 5 }]}
            />
            </TouchableOpacity>
          </View>
        </View>
     
    );
  }
}

export default FirstScreen;
