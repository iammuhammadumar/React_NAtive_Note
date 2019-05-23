import { Badge, Body, Button, Card, CardItem, Icon, Right, Thumbnail } from 'native-base';
import React from 'react';
import { Alert, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import InputText from '../components/InputText';
import { commonStyles } from './styles';
import { withNavigation } from 'react-navigation';
import Lodaer from '../components/Loader';
class Noteslist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      NoteList: this.props.NoteList
    };
  }

  handlePressItem = (note) => {
    this.props.navigation.navigate('NewNote', { note: note })
  }

  componentDidMount() {
    this.setState({
      NoteList: this.props.NoteList
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.NoteList !== nextProps.NoteList) {
      this.setState({
        NoteList: nextProps.NoteList
      })
    }
  }

  handleSearch = (search) => {
    this.setState({
      search
    }, () => {
      const filteredList = this.props.NoteList.filter((note) => {
        return note.type.includes(search) || note.tag.includes(search) || note.tag2.includes(search);
      })
      this.setState({
        NoteList: filteredList
      })
    })
  }

  render() {
    return (

      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ height: '20%', width: "100%", marginTop: 40 }}>
          <Text style={{ textAlign: 'center', fontSize: 16, color: '#000' }}>ALL NOTES</Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
            <InputText
              placeholderTextColor={"black"}
              style={[
                commonStyles.dividerTop,
                {
                  borderRadius: 30,
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 1,
                  width: 300
                }
              ]}
              placeholder="Search of notes..."
              autoCapitalize="none"
              value={this.state.search}
              onChangeText={search => this.handleSearch(search)}
            />
            <View
              style={{
                position: 'absolute',
                zIndex: 10,
                alignSelf: 'center',
                right: 50,
              }}
            >
              <Button transparent>
                <Icon
                  name="search"
                  style={{
                    fontSize: 20,
                    color: 'black'
                  }}
                />
              </Button>
            </View>
          </View>


        </View>
        <View style={{ marginTop: 10, flex: 1 }}>
          <ScrollView>
            <View style={{ marginTop: 10 }}>
              {this.state.NoteList.map((l, i) => (
                <TouchableOpacity onPress={() => this.handlePressItem(l)} key={i}>
                  <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Card style={{ marginLeft: 20, marginRight: 20, borderRadius: 5 }}>
                      <CardItem>
                        <Body style={{ flexDirection: 'row' }}>
                          <Thumbnail
                            large
                            square
                            size={100}
                            source={{
                              uri: l.imgUri
                            }}
                            style={{
                              marginRight: 10,
                              borderRadius: 5,
                              marginTop: 10
                            }}
                          />
                          <View style={{ flexDirection: 'column' }}>
                            <Text style={[commonStyles.textLarge, commonStyles.mb3]}>
                              {l.type}
                            </Text>
                            <Text style={{ fontSize: 11 }}>
                              {l.date}
                            </Text>

                            <Text numberOfLines={2} style={{ fontSize: 12, width: 200 }}>
                              {l.text}
                            </Text>
                            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
                              {l.audio && l.audio.length > 0 ? 'Audio' : ''}
                            </Text>
                          </View>
                        </Body>
                        <Right>
                          <Body>
                            <View style={[commonStyles.row, { right: -10 }]}>
                              <Badge
                                style={[
                                  commonStyles.alignCenter,
                                  commonStyles.badgeSize,
                                  {
                                    marginLeft: 8,
                                    backgroundColor: 'black',
                                    flexDirection: 'row'
                                  }
                                ]}
                              >
                                <Text style={[{ color: 'white', fontSize: 10 }]}>
                                  {l.tag}
                                </Text>
                              </Badge>
                              {(l.tag2 && l.tag2.length > 0) ?
                                <Badge
                                  style={[
                                    commonStyles.alignCenter,
                                    commonStyles.badgeSize,
                                    {
                                      marginLeft: 10,
                                      backgroundColor: 'red',
                                      flexDirection: 'row'
                                    }
                                  ]}
                                >
                                  <Text
                                    style={[
                                      {
                                        color: 'white',
                                        fontSize: 10,
                                        textAlign: 'center'
                                      }
                                    ]}
                                  >
                                    {l.tag2}
                                  </Text>

                                </Badge>
                                : null
                              }
                            </View>
                          </Body>
                        </Right>
                      </CardItem>
                    </Card>
                    {/* <Card style={{ borderRadius: 5 }}>
                    <CardItem>
                      <Body>
                        <Text>{l.type}</Text>
                        <Text>{l.date}</Text>
                        <Text style={{ marginTop: 10, width: 300 }}>
                          {l.text}
                        </Text>
                      </Body>
                      <Right>
                        <Body>
                          <View style={[{ flexDirection: 'row', right: -10 }]}>
                            <Badge
                              style={[
                                commonStyles.alignCenter,
                                commonStyles.badgeSize,

                                {
                                  marginLeft: 10,
                                  backgroundColor: 'red',
                                  flexDirection: 'row'
                                }
                              ]}
                            >
                              <Text
                                style={[
                                  {
                                    color: 'white',
                                    fontSize: 10,
                                    textAlign: 'center',
                                    padding: 5,
                                  }
                                ]}
                              >
                                {l.tag}
                              </Text>
                            </Badge>
                            {l.tag2 && l.tag2.length > 0 ?
                            <Badge
                              style={[
                                commonStyles.alignCenter,
                                commonStyles.badgeSize,

                                {
                                  marginLeft: 8,
                                  backgroundColor: 'black',
                                  flexDirection: 'row'
                                }
                              ]}
                            >
                              <Text style={[{ color: 'white', padding: 5, fontSize: 10 }]}>
                                {l.tag2}
                              </Text>
                            </Badge> : null
                            }
                          </View>
                        </Body>
                      </Right>
                    </CardItem>
                  </Card> */}
                  </View>
                </TouchableOpacity>
              )
              )}
            </View>
          </ScrollView>
          {/* <TouchableOpacity>
            <Card style={{ marginLeft: 20, marginRight: 20, borderRadius: 5 }}>
              <CardItem>
                <Body style={{ flexDirection: 'row' }}>
                  <Thumbnail
                    large
                    square
                    size={80}
                    source={{
                      uri:
                        'https://i.ytimg.com/vi/Lo-OXY1iXVU/maxresdefault.jpg'
                    }}
                    style={{
                      marginRight: 20,
                      borderRadius: 5
                    }}
                  />
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={[commonStyles.textLarge, commonStyles.mb3]}>
                      NOMA
                    </Text>
                    <Text style={{ fontSize: 12, width: 200 }}>
                      FROM GOOGLE.COM | 05.10.18
                    </Text>
                    <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
                      Audio
                    </Text>
                  </View>
                </Body>
                <Right>
                  <Body>
                    <View style={[commonStyles.row, { right: -10 }]}>
                      <Badge
                        style={[
                          commonStyles.alignCenter,
                          commonStyles.badgeSize,

                          {
                            marginLeft: 8,
                            backgroundColor: 'black',
                            flexDirection: 'row'
                          }
                        ]}
                      >
                        <Text style={[{ color: 'white', fontSize: 10 }]}>
                          VISITS
                        </Text>
                      </Badge>
                      <Badge
                        style={[
                          commonStyles.alignCenter,
                          commonStyles.badgeSize,

                          {
                            marginLeft: 10,
                            backgroundColor: 'red',
                            flexDirection: 'row'
                          }
                        ]}
                      >
                        <Text
                          style={[
                            {
                              color: 'white',
                              fontSize: 10,
                              textAlign: 'center'
                            }
                          ]}
                        >
                          TRAVEL
                        </Text>
                      </Badge>
                    </View>
                  </Body>
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity> */}
        </View>
      </View>
    )
  }
}

Noteslist.defaultProps = {
  NoteList: []
}

Noteslist.propTypes = {
  NoteList: PropTypes.array,
}
export default withNavigation(Noteslist);
