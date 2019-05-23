import { Badge, Body, Button, Icon, Left, List, ListItem, Thumbnail } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';
import InputText from '../components/InputText';
import { commonStyles } from './styles';

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ marginTop: 60 }}>
          <InputText
            placeholderTextColor={"white"}

            style={[
              commonStyles.dividerTop,
              {
                borderRadius: 30,
                backgroundColor: 'black',
                borderColor: 'white',
                borderWidth: 1,
                color: 'white'
              }
            ]}
            placeholder="Search of notes..."
            autoCapitalize="none"
            value={this.state.search}
            onChangeText={search => this.setState({ search })}
          />
          <View
            style={{
              position: 'absolute',
              zIndex: 10,
              alignSelf: 'center',
              right: 55,
              bottom: -2
            }}
          >
            <Button transparent>
              <Icon
                name="search"
                style={{
                  fontSize: 20,
                  color: 'white'
                }}
              />
            </Button>
          </View>
        </View>
        <List style={{ marginTop: 20 }}>
          <ListItem
            noBorder
            onPress={() => this.props.navigation.navigate('SearchScreen')}
          >
            <Icon
              type="MaterialIcons"
              name="notifications"
              style={[{ fontSize: 18, marginVertical: 10, color: 'white' }]}
            />

            <Left style={{ marginLeft: 20 }}>
              <Text style={{ color: 'white' }}>NOTIFICATIONS</Text>
            </Left>
          </ListItem>
          <Badge
            style={[
              commonStyles.badge,
              { zIndex: 10, position: 'absolute', left: 26, top: 20 }
            ]}
          >
            <Text style={{ fontSize: 12, textAlign: 'center' }}>3</Text>
          </Badge>
        </List>
        <List style={{ marginTop: 20 }}>
          <ListItem
            noBorder
            onPress={() => this.props.navigation.navigate('SignInScreen')}
          >
            <Icon
              type="MaterialIcons"
              name="bookmark-border"
              style={[{ fontSize: 18, marginVertical: 10, color: 'white' }]}
            />
            <Left style={{ marginLeft: 20 }}>
              <Text style={{ color: 'white' }}>TITLES</Text>
            </Left>
          </ListItem>
        </List>
        <List style={{ marginTop: 20 }}>
          <ListItem
            noBorder
            onPress={() => this.props.navigation.navigate('MenuScreen')}
          >
            <Icon
              type="MaterialIcons"
              name="bookmark-border"
              style={[{ fontSize: 18, marginVertical: 10, color: 'white' }]}
            />
            <Left style={{ marginLeft: 20 }}>
              <Text style={{ color: 'white' }}>TAGS</Text>
            </Left>
          </ListItem>
        </List>
        <List style={{ marginTop: 20 }}>
          <ListItem noBorder>
            <Icon
              type="MaterialIcons"
              name="image"
              style={[{ fontSize: 18, marginVertical: 10, color: 'white' }]}
            />
            <Left style={{ marginLeft: 20 }}>
              <Text style={{ color: 'white' }}>GALLERY</Text>
            </Left>
          </ListItem>
        </List>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <List>
            <ListItem thumbnail noBorder>
              <Left>
                <Thumbnail
                  circle
                  source={{
                    uri: 'https://i.ytimg.com/vi/Lo-OXY1iXVU/maxresdefault.jpg'
                  }}
                />
                <Badge style={[commonStyles.badge1]} />
              </Left>
              <Body>
                <Text style={{ color: 'white' }}>Niyi Akinyemi</Text>
                <Text style={{ color: 'white' }}>Product Designers</Text>
              </Body>
            </ListItem>
          </List>
        </View>
      </View>
    );
  }
}

export default SignInScreen;
