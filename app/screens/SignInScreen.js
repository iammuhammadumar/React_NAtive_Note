import { Button, Segment } from 'native-base';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import InputText from '../components/InputText';
import { commonStyles } from './styles';

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seg: 2,
      name: '',
      email: '',
      password: ''
    };
  }

  onSubmit = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) {
      Alert.alert('Alert', 'Email address is empty or invalid.');
    } else if (this.state.password.length < 6) {
      Alert.alert('Alert', 'Password must be 6-15 characters long.');
    } else if (this.state.password.length > 15) {
      Alert.alert('Alert', 'Password cannot be longer than 15 characters.');
    } else if (this.state.name.match(/\d+/g) || this.state.name.length < 2) {
      Alert.alert(
        'Alert',
        'Name must be 2-25 characters long. Do not enter numbers.'
      );
    } else if (this.state.name.match(/\d+/g) || this.state.name.length > 25) {
      Alert.alert(
        'Alert',
        'Name cannot be longer than 25 characters. Do not enter numbers.'
      );
    } else {
      this.props.navigation.navigate('HomeScreen');
    }
  };

  render() {
    const { seg } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ marginTop: 80 }}>
          <Segment style={{ backgroundColor: 'black' }}>
            <Button
              style={{ width: '50%' }}
              first
              active={this.state.seg === 1 ? true : false}
              onPress={() => this.setState({ seg: 1 })}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1
                }}
              >
                <Text
                  style={{
                    color: seg === 1 ? 'black' : 'white'
                  }}
                >
                  REGISTER
                </Text>
              </View>
            </Button>
            <Button
              style={{ width: '50%' }}
              active={this.state.seg === 2 ? true : false}
              onPress={() => this.setState({ seg: 2 })}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1
                }}
              >
                <Text style={{ color: seg === 2 ? 'black' : 'white' }}>
                  SIGN IN
                </Text>
              </View>
            </Button>
          </Segment>
          <View style={{ marginTop: 50 }}>
            <InputText
              placeholderTextColor={"black"}

              style={[
                commonStyles.dividerTop,
                {
                  borderRadius: 5,

                }
              ]}
              placeholder="Email"
              autoCapitalize="none"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <InputText
              placeholderTextColor={"black"}
              style={[
                commonStyles.dividerTop,
                {
                  borderRadius: 5
                }
              ]}
              placeholder="Password"
              autoCapitalize="none"
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <InputText
              placeholderTextColor={"black"}
              style={[
                {
                  borderRadius: 5
                }
              ]}
              placeholder="Full Name"
              autoCapitalize="none"
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />
          </View>
          <View style={{ marginTop: 60 }}>
            <TouchableOpacity
              onPress={this.onSubmit}
              style={[
                commonStyles.button,
                {
                  alignSelf: 'center'
                }
              ]}
            >
              <Text style={[commonStyles.buttonText]}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default SignInScreen;
