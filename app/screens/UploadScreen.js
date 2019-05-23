import { Button, Container, Segment } from 'native-base';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, AsyncStorage } from 'react-native';
import { commonStyles } from './styles';
import CropImageFile from './CropImageFile';
import { ImageManipulator } from 'expo-image-crop';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seg: 2,
      isVisible: false,
      uri: this.props.navigation.state.params.imgUri,
    };
  }
  
  cropImage = () => {
    const { isVisible } = this.state
    this.setState({ isVisible: !isVisible })
  }

  render() {
     console.log('this.props.navigation.state.params.imgUri',this.props.navigation.state.params.imgUri);
    const { seg , uri} = this.state;
        return (
      <Container style={{ marginTop: 24, backgroundColor: 'gray' }}>
        <View style={{
          height: "70%",
          width: "95%",
          backgroundColor: 'gray'
        }}>

          <ImageManipulator
            photo={{uri}}
            isVisible={this.state.isVisible}
            onPictureChoosed={uriM => this.setState({ uri: uriM })}
            onToggleModal={this.cropImage}
          />
          <Image ref={(ref) => this.imageView = ref}
            style={{
              height: "80%",
              width: "90%",
              resizeMode: 'cover',
              marginTop: 20,
              marginLeft: 30,
              marginBottom: 20,
            }}
            source={{ uri: this.state.uri }}
          />
        </View>
        <Segment style={{ backgroundColor: 'white' }}>
          <Button
            style={{
              width: '50%',
              height: '100%',
              borderBottomWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              backgroundColor: seg === 1 ? 'black' : 'white'
            }}
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
                    color: seg === 1 ? 'white' : 'black',
                    fontSize: 12,
                    textAlign:'center',
                  }}
                >
                  USE FULL IMAGE
                  </Text>
              </View>
          </Button>
          <Button
            style={{
              width: '50%',
              height: '100%',
              borderBottomWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              borderTopWidth: 0,

              backgroundColor: seg === 2 ? 'black' : 'white'
            }}
            active={this.state.seg === 2 ? true : false}
            onPress={() => this.setState({ seg: 2 })}
          >
         
            
            <TouchableOpacity
              onPress={() => { this.cropImage() }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }}
            >
              <Text
                style={{
                  color: seg === 2 ? 'white' : 'black',
                  fontSize: 12
                }}
              >
                HIGHLIGHT PORTION
                  </Text>
            </TouchableOpacity>
          
          </Button>
        </Segment>

        <View
          style={{
            marginTop: 40,
            alignSelf: 'center'
          }}
        >
          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('NewNote2', {uri: this.state.uri}) }}
            style={[
              commonStyles.upload,
              {
                shadowOffset: { width: 10, height: 10 },
                shadowColor: 'black',
                shadowOpacity: 1,
                elevation: 3
              }
            ]}
          >
            <Text style={[commonStyles.uploadText]}>COMPLETE SCAN</Text>
          </TouchableOpacity>

        </View>
      </Container>
    );
  }
}
