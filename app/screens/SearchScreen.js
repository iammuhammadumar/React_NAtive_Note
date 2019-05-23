import { Badge, Container, Content, Header, Icon, Item, Left, List, ListItem } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import InputText from '../components/InputText';
import { commonStyles } from './styles';
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false
    };
  }

  render() {
    return (
      <Container>
        <Header
          searchBar
          style={[commonStyles.header, commonStyles.divider, { marginTop: 20 }]}
        >
          <Item>
            <Icon
              type="MaterialIcons"
              name="arrow-back"
              onPress={() => this.props.navigation.goBack()}
            />
            <InputText
              placeholderTextColor={"black"}

              style={{
                borderBottomWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0
              }}
              placeholder="Search"
              onChangeText={this.handleSearch}
              value={this.state.searchText}
              autoFocus={this.state.search}
            />
            <Badge
              style={[
                commonStyles.closeIcon,
                commonStyles.justifyCenter,
                commonStyles.alignCenter,
                { top: 8, left: 20 }
              ]}
            >
              <Icon
                name="md-close"
                style={[
                  {
                    color: 'white',
                    fontSize: 12
                  }
                ]}
              />
            </Badge>
          </Item>
        </Header>
        <ScrollView>
          <Content>
            <List>
              <ListItem itemDivider style={{ backgroundColor: 'white' }}>
                <Text style={{ fontSize: 14 }}>RECENT SEARCHES</Text>
              </ListItem>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(151,151,151,0.1)'
                }}
              >
                <ListItem noBorder>
                  <Icon
                    type="MaterialIcons"
                    name="search"
                    style={[{ fontSize: 18 }]}
                  />
                  <Left style={{ marginLeft: 20 }}>
                    <Text>TAGS</Text>
                  </Left>
                </ListItem>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(151,151,151,0.1)'
                }}
              >
                <ListItem noBorder>
                  <Icon
                    type="MaterialIcons"
                    name="search"
                    style={[{ fontSize: 18 }]}
                  />
                  <Left style={{ marginLeft: 20 }}>
                    <Text>TAGS</Text>
                  </Left>
                </ListItem>
              </View>
              <ListItem itemDivider style={{ backgroundColor: 'white' }}>
                <Text style={{ fontSize: 14 }}>TOP RESULTS</Text>
              </ListItem>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(151,151,151,0.1)'
                }}
              >
                <ListItem noBorder>
                  <Icon
                    type="MaterialIcons"
                    name="bookmark-border"
                    style={[{ fontSize: 18 }]}
                  />
                  <Left style={{ marginLeft: 20 }}>
                    <Text>The power of the creator</Text>
                  </Left>
                </ListItem>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(151,151,151,0.1)'
                }}
              >
                <ListItem noBorder>
                  <Icon
                    type="MaterialIcons"
                    name="bookmark-border"
                    style={[{ fontSize: 18 }]}
                  />
                  <Left style={{ marginLeft: 20 }}>
                    <Text>The power of the creator</Text>
                  </Left>
                </ListItem>
              </View>
            </List>
          </Content>
        </ScrollView>
      </Container>
    );
  }
}
