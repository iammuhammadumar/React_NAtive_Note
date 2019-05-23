import { Badge, Body, Card, CardItem, Icon, Right } from 'native-base';
import React from 'react';
import { Alert, TouchableOpacity, Slider, Text, View } from 'react-native';
import { Player } from 'react-native-audio-player-recorder-no-linking';
import Footer from '../components/Footer';
import { commonStyles } from './styles';
import { Audio } from 'expo';
const initialState = {
  isLoaded: false,
  isBuffering: 'NOT_STARTED',
  playStatus: 'LOADING', // LOADING, BUFFERING, PAUSED, STOPPED, PLAYING
  // legacy items
  isPlaying: false,
  durationMillis: 0,
  playbackMillis: 0,
  maxSliderValue: 0,
  currentSliderValue: 0,
  debugStatements: 'debug info will appear here'
};
class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.sound = null;
    this.state = {
      ...initialState
    };
  }


  componentDidMount = () => {
    this.loadSound();
  };

  loadSound = async () => {
    let sound = new Audio.Sound();
    try {
      sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      let soundInfo = await sound.loadAsync({ uri: this.props.navigation.state.params.note.audio });
      this.setState({
        maxSliderValue: soundInfo.durationMillis,
        durationMillis: soundInfo.durationMillis,
        positionMillis: soundInfo.positionMillis,
        currentSliderValue: soundInfo.positionMillis,
        shouldPlay: soundInfo.shouldPlay,
        isPlaying: soundInfo.isPlaying,
        rate: soundInfo.rate,
        muted: soundInfo.isMuted,
        volume: soundInfo.volume,
        shouldCorrectPitch: soundInfo.shouldCorrectPitch,
        isPlaybackAllowed: true
      });
      this.sound = sound;
    } catch (error) {
      // An error occurred!
      console.warn(`Player.js loadSound error : ${error}`);
    }
  };

  addDebugStatement = (statement) => {
    this.setState({
      debugStatements: this.state.debugStatements.concat(`- ${statement}\n`)
    });
  };

  componentWillUnmount = () => {
    this.setState({ ...initialState });
    this.sound.setOnPlaybackStatusUpdate(null);
  };
  /*
  Function used to update the UI during playback
  Playback Status Order:
  1. isLoaded: false
  2. isLoaded: true, isBuffering: true, duration 1st available
  3. isloaded: true, isBuffering: false
  */
  onPlaybackStatusUpdate = (playbackStatus) => {
    let that = this;
    this.setState({
      prevPlaybackStatus: that.state.playbackStatus,
      playbackStatus: playbackStatus
    });

    if (playbackStatus.error) {
      this.setState({ playBackStatus: 'ERROR' });
      this.addDebugStatement(
        `Encountered a fatal error during playback: ${playbackStatus.error}
        Please report this error as an issue.  Thank you!`
      );
    }

    if (playbackStatus.isLoaded) {
      // don't care about buffering if state.playStatus is equal to one of the other states
      // state.playStatus can only be equal to one of the other states after buffer
      // has completed, at which point state.playStatus is set to 'STOPPED'
      if (
        this.state.playStatus !== 'PLAYING' &&
        this.state.playStatus !== 'PAUSED' &&
        this.state.playStatus !== 'STOPPED' &&
        this.state.playStatus !== 'ERROR'
      ) {
        if (playbackStatus.isLoaded && !this.state.isLoaded) {
          this.setState({ isLoaded: true });
          this.addDebugStatement(`playbackStatus.isLoaded`);
        }
        if (this.state.isLoaded && playbackStatus.isBuffering) {
          this.setState({
            playStatus: 'BUFFERING'
          });
          this.addDebugStatement(`playbackStatus.isBuffering IN_PROGRESS`);
        }
        if (
          this.state.isLoaded &&
          !playbackStatus.isBuffering &&
          playbackStatus.hasOwnProperty('durationMillis')
        ) {
          this.setState({
            playStatus: 'STOPPED'
          });
          this.addDebugStatement(`playbackStatus.isBuffering COMPLETE`);
        }
      }

      // Update the UI for the loaded state
      if (playbackStatus.isPlaying) {
        this.addDebugStatement(
          `playbackStatus.positionMillis (here): ${
          playbackStatus.positionMillis
          }`
        );

        // Update  UI for the playing state
        this.setState({
          positionMillis: playbackStatus.positionMillis,
          currentSliderValue: playbackStatus.positionMillis
        });
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        this.addDebugStatement('playbackStatus is stopped');
        this.setState({
          playStatus: 'STOPPED',
          isPlaying: false,
          positionMillis: playbackStatus.durationMillis,
          currentSliderValue: playbackStatus.durationMillis
        });
      }
    }
  };

  onSliderValueChange = (value) => {
    // set the postion of the actual sound object
    this.addDebugStatement(`onSliderValueChange: ${value}`);
    this.sound.setPositionAsync(value);
  };

  onPausePress = () => {
    if (this.sound != null) {
      this.sound.pauseAsync().then(() => {
        this.setState({ playStatus: 'PAUSED' });
      });
    }
  };

  onPlayPress = () => {
    if (this.sound != null) {
      if (this.state.positionMillis === this.state.durationMillis) {
        this.sound.stopAsync().then(() => {
          this.sound.playAsync().then(() => {
            this.setState({ playStatus: 'PLAYING' });
          });
        });
      } else {
        // just play from wherever we are
        this.sound
          .playAsync()
          .then(() => {
            this.setState({ playStatus: 'PLAYING' });
          })
          .catch((err) => {
            console.warn(`Player.js onPlayPress error: ${err}`);
          });
      }
    }
  };












  NavigateToList = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  render() {
    const { note } = this.props.navigation.state.params;
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ marginTop: 40, flex: 1 }}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>Note Detail</Text>
          <Card
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginTop: 20,
              borderRadius: 5
            }}
          >
            <CardItem>
              <Body>
                <Text style={{ fontSize: 18 }}>{note.type}</Text>
                <Text style={{ fontSize: 12 }}>{note.date}</Text>
                <Text style={{ fontSize: 12, marginTop: 10, width: 300 }}>
                  {note.text}
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
                        {note.tag}
                      </Text>
                    </Badge>
                    {note.tag2 && note.tag2.length > 0 ?
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
                          {note.tag2}
                        </Text>
                      </Badge> : null
                    }
                  </View>
                </Body>
              </Right>
            </CardItem>
            <CardItem style={{ backgroundColor: '#646569' }}>
              <Body>
                <Text>
                  Excerpts From{' '}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textDecorationLine: 'underline'
                    }}
                  >
                    IMAGE
                  </Text>{' '}
                </Text>
                <Text style={{ width: 300 }}>
                  The fixedLabel property creates an Input component, whose
                  Label is fixed at the{' '}
                </Text>
              </Body>
            </CardItem>
            <CardItem
              style={{
                backgroundColor: '#646569',
                marginTop: 5,
                marginBottom: 10
              }}
            >
              <Body>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <TouchableOpacity onPress={()=>this.onPlayPress()}>
                  <Badge
                    style={[
                      commonStyles.alignCenter,
                      commonStyles.badgeSize,

                      {
                        marginLeft: 10,
                        backgroundColor: 'white',
                        flexDirection: 'row'
                      }
                    ]}
                  >
                    <Icon
                      name="fast-forward"
                      type="MaterialIcons"
                      style={{
                        fontSize: 16,
                        color: 'black',
                        marginRight: 5
                      }}
                    />
                    <Text
                      style={[
                        {
                          color: 'black',
                          fontSize: 10,
                          textAlign: 'center'
                        }
                      ]}
                    >
                      PLAY AUDIO
                    </Text>
                  </Badge>
                  </TouchableOpacity>
                  <Badge
                    style={[
                      commonStyles.alignCenter,
                      commonStyles.badgeSize,

                      {
                        marginLeft: 8,
                        backgroundColor: 'white',
                        flexDirection: 'row'
                      }
                    ]}
                  >
                    <Icon
                      name="description"
                      type="MaterialIcons"
                      style={{
                        fontSize: 16,
                        color: 'black',
                        marginRight: 5
                      }}
                    />
                    <Text style={[{ color: 'black', fontSize: 10 }]}>
                      HIDE TRANSCRIPTION
                    </Text>
                  </Badge>
                </View>
                <Text style={{ marginTop: 5 }}>
                  using this voicenote to remind my self later
                </Text>
              </Body>
            </CardItem>
          </Card>
          {/* <FlatList
            style={{ marginLeft: 10 }}
            horizontal={true}
            data={[
              { key: 'a' },
              { key: 'b' },
              { key: 'c' },
              { key: 'd' },
              { key: 'e' },
              { key: 'f' },
              { key: 'g' },
              { key: 'h' }
            ]}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={[
                    commonStyles.timer,
                    {
                      marginTop: 20,
                      marginLeft: 10,
                      marginBottom: 20
                    }
                  ]}
                >
                  <Icon
                    name="camera"
                    style={{
                      fontSize: 22,
                      marginTop: 5,
                      textAlign: 'center',

                      color: 'black'
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          /> */}
          {/* {note.audio && note.audio.length > 0 &&
            <Player
              style={{ flex: 1 }}
              uri={note.audio}
              showDebug={false}
              showBackButton={false}
              playbackSlider={(renderProps) => {
                return (
                  <Slider
                    minimimValue={0}
                    maximumValue={renderProps.maximumValue}
                    onValueChange={renderProps.onSliderValueChange}
                    value={renderProps.value}
                    style={{
                      width: '100%'
                    }}
                  />
                );

              }}

            />
          } */}
        </View>
        <Footer navigation={this.props.navigation} text={"Back"}
          onPress={() => this.props.navigation.goBack()}
          activeTab={'SignInScreen'} />

      </View>
    );
  }
}

export default NewNote;
