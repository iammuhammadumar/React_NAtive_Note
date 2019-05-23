import { Badge, Button, Footer, FooterTab, Icon } from 'native-base';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { commonStyles } from '../../screens/styles';

class AppFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.activeTab,
      result: ''
    };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab = tab => {
    this.setState({ activeTab: tab });
    // this.props.navigation.replace(tab);
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <View>
        <Footer>
          <FooterTab
            style={{
              backgroundColor: 'white',
              flexDirection: 'row'
            }}
          >
            <Button
              style={[this.state.activeTab === 'Menu']}
              onPress={
                () => this.changeTab('Menu')
              }
              vertical
            >
              <Icon
                type="MaterialIcons"
                name="reorder"
                style={
                  this.state.activeTab === 'Menu'
                    ? commonStyles.bluetext
                    : commonStyles.textDark
                }
              />
              <Text
                style={[
                  this.state.activeTab === 'Menu'
                    ? commonStyles.bluetext
                    : commonStyles.textDark,
                  { fontSize: 10, textAlign: 'center' }
                ]}
              >
                MENU
              </Text>
            </Button>

            <Button
              vertical
              onPress={this.props.onPress}
            >

              <Badge
                style={[
                  commonStyles.closeIcon1,
                  commonStyles.justifyCenter,
                  commonStyles.alignCenter,
                  { bottom: 25, alignSelf: 'center', }


                ]}
              >
              <TouchableOpacity          onPress={this.props.onPress}>
                <Text style={{ color: 'white', fontSize: 14 }}>{this.props.text}</Text>
                </TouchableOpacity>
              </Badge>

              {/* <Icon
                onPress={() => this.props.navigation.navigate('NewNote')}

                type="MaterialIcons"
                name="add-circle"
                style={[
                  this.state.activeTab === 'SocialMedia'
                    ? commonStyles.bluetext
                    : commonStyles.textDark,
                  { fontSize: 50, bottom: 25 }
                ]}
              /> */}

              {/* <Text
                style={[
                  this.state.activeTab === 'SocialMedia'
                    ? commonStyles.bluetext
                    : commonStyles.textDark,
                  { fontSize: 10, textAlign: 'center' }
                ]}
              >
                footer
              </Text> */}
            </Button>

            <Button
              style={[this.state.activeTab === 'UploadScreen']}
              vertical
            // onPress={()=>{this.props.navigation.navigate('')}}
            >
              <Icon
                type="MaterialIcons"
                name="filter-b-and-w"
                style={[
                  this.state.activeTab === 'UploadScreen'
                    ? commonStyles.bluetext
                    : commonStyles.textDark
                ]}
              />
              <Text
                style={[
                  this.state.activeTab === 'UploadScreen'
                    ? commonStyles.bluetext
                    : commonStyles.textDark,
                  { fontSize: 10, textAlign: 'center' }
                ]}
              >
                FEED
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}
export default AppFooter;
