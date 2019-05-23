import { Audio, Camera, FileSystem, ImagePicker, Permissions } from 'expo';
import { Badge, Body, Card, CardItem, Icon, Right } from 'native-base';
import React from 'react';
import { Alert, AsyncStorage, CameraRoll, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Dialog from "react-native-dialog";
import Footer from '../components/Footer';
import { commonStyles } from './styles';


const ICON_RECORD_BUTTON = new Icon(require('../assets/images/record_button.png'), 70, 119);
const ICON_RECORDING = new Icon(require('../../assets/images/record_icon.png'), 20, 14);

// const ICON_PLAY_BUTTON = new Icon(require('./assets/images/play_button.png'), 34, 51);
// const ICON_PAUSE_BUTTON = new Icon(require('./assets/images/pause_button.png'), 34, 51);
// const ICON_STOP_BUTTON = new Icon(require('./assets/images/stop_button.png'), 22, 22);

// const ICON_MUTED_BUTTON = new Icon(require('./assets/images/muted_button.png'), 67, 58);
// const ICON_UNMUTED_BUTTON = new Icon(require('./assets/images/unmuted_button.png'), 67, 58);

// const ICON_TRACK_1 = new Icon(require('./assets/images/track_1.png'), 166, 5);
// const ICON_THUMB_1 = new Icon(require('./assets/images/thumb_1.png'), 18, 19);
// const ICON_THUMB_2 = new Icon(require('./assets/images/thumb_2.png'), 15, 19);

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 3.0;


class NewNote2 extends React.Component {

	constructor(props) {
		super(props);
		this.recording = null;
		this.sound = null;

		this.state = {
			dialogVisible: false,
			dialogeOpenCount: 0,
			feildName: '',
			title: '',
			description: '',
			myDate: '',
			tag: '',
			tag2: '',
			ImageSource: null,
			data: null,
			displayView: false,
			imageText: "",
			hasCameraPermission: null, //Permission value
			type: Camera.Constants.Type.back, //specifying app start with back camera.
			imgUri: null,
			photos: [],

			haveRecordingPermissions: false,
			isLoading: false,
			isPlaybackAllowed: false,
			muted: false,
			soundPosition: null,
			soundDuration: null,
			recordingDuration: null,
			shouldPlay: false,
			isPlaying: false,
			isRecording: false,
			fontLoaded: false,
			shouldCorrectPitch: true,
			volume: 1.0,
			rate: 1.0,
		};
		this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY));
	}
	// async componentWillMount() {
	// 	//Getting Permission result from app details.

	// 	await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
	// 	this.setState({ hasCameraPermission: status === 'granted' });
	//   }



	componentDidMount() {
		this.askPermissionsAsync();
		this.getAllPhotos();
		let date = new Date().getDate();
		let month = new Date().getMonth() + 1;
		let year = new Date().getFullYear();
		let myDate = "BY YOU |" + " " + date + "-" + month + "-" + year
		this.setState({ myDate: myDate })

	}

	_askForPermissions = async () => {
		const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
		this.setState({
			haveRecordingPermissions: response.status === 'granted',
		});
	};

	_updateScreenForRecordingStatus = status => {
		if (status.canRecord) {
			this.setState({
				isRecording: status.isRecording,
				recordingDuration: status.durationMillis,
			});
		} else if (status.isDoneRecording) {
			this.setState({
				isRecording: false,
				recordingDuration: status.durationMillis,
			});
			if (!this.state.isLoading) {
				this._stopRecordingAndEnablePlayback();
			}
		}
	};


	async _stopPlaybackAndBeginRecording() {
		this._askForPermissions();
		console.log('aaaa')
		this.setState({
			isLoading: true,
		});
		if (this.sound !== null) {
			await this.sound.unloadAsync();
			this.sound.setOnPlaybackStatusUpdate(null);
			this.sound = null;
		}
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: true,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			playThroughEarpieceAndroid: true,

		});
		if (this.recording !== null) {
			this.recording.setOnRecordingStatusUpdate(null);
			this.recording = null;
		}

		const recording = new Audio.Recording();
		await recording.prepareToRecordAsync(this.recordingSettings);
		recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

		this.recording = recording;
		await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
		this.setState({
			isLoading: false,
		});
	}

	async _stopRecordingAndEnablePlayback() {
		console.log('bbbbbb');
		this.setState({
			isLoading: true,
		});
		try {
			await this.recording.stopAndUnloadAsync();
		} catch (error) {
			// Do nothing -- we are already unloaded.
		}
		const info = await FileSystem.getInfoAsync(this.recording.getURI());
		// console.log(`FILE INFO: ${JSON.stringify(info)}`);
		// await Audio.setAudioModeAsync({
		//   allowsRecordingIOS: false,
		//   interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
		//   playsInSilentModeIOS: true,
		//   playsInSilentLockedModeIOS: true,
		//   shouldDuckAndroid: true,
		//   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
		//   playThroughEarpieceAndroid: true,
		// });
		// const { sound, status } = await this.recording.createNewLoadedSound(
		//   {
		//     isLooping: true,
		//     isMuted: this.state.muted,
		//     volume: this.state.volume,
		//     rate: this.state.rate,
		//     shouldCorrectPitch: this.state.shouldCorrectPitch,
		//   },
		//   this._updateScreenForSoundStatus
		// );
		// this.sound = sound;
		this.setState({
			isLoading: false,
		});
	}

	async _stopRecordingAndEnablePlayback2() {
		console.log('bbbbbb');
		this.setState({
			isLoading: true,
		});
		const info = await FileSystem.getInfoAsync(this.recording.getURI());
		console.log(`FILE INFO: ${JSON.stringify(info)}`);
		const soundObject = new Audio.Sound();
		try {
			await soundObject.loadAsync(this.recording._uri);
			await soundObject.playAsync();
			// Your sound is playing!
		} catch (error) {
			// An error occurred!
		}
		// try {
		//   await this.recording.stopAndUnloadAsync();
		// } catch (error) {
		//   // Do nothing -- we are already unloaded.
		// }
		// const info = await FileSystem.getInfoAsync(this.recording.getURI());
		// console.log(`FILE INFO: ${JSON.stringify(info)}`);
		// await Audio.setAudioModeAsync({
		//   allowsRecordingIOS: false,
		//   interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
		//   playsInSilentModeIOS: true,
		//   playsInSilentLockedModeIOS: true,
		//   shouldDuckAndroid: true,
		//   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
		//   playThroughEarpieceAndroid: true,
		// });
		// const { sound, status } = await this.recording.createNewLoadedSoundAsync(
		//   {
		//     isLooping: true,
		//     isMuted: this.state.muted,
		//     volume: this.state.volume,
		//     rate: this.state.rate,
		//     shouldCorrectPitch: this.state.shouldCorrectPitch,
		//   },
		//   this._updateScreenForSoundStatus
		// );
		// this.sound = sound;
		this.setState({
			isLoading: false,
		});
	}


	_onRecordPressed = () => {
		if (this.state.isRecording) {
			this._stopRecordingAndEnablePlayback();
		} else {
			this._stopPlaybackAndBeginRecording();
		}
	};

	_getRecordingTimestamp() {
		if (this.state.recordingDuration != null) {
			return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
		}
		return `${this._getMMSSFromMillis(0)}`;
	}


	_getMMSSFromMillis = (millis) => {
		const totalSeconds = millis / 1000;
		const seconds = Math.floor(totalSeconds % 60);
		const minutes = Math.floor(totalSeconds / 60);

		const padWithZero = number => {
			const string = number.toString();
			if (number < 10) {
				return '0' + string;
			}
			return string;
		};
		return padWithZero(minutes) + ':' + padWithZero(seconds);
	}

	playerComplete = (obj) => {
		console.log(obg, 'obj')
	}

	showDialog = (name) => {
		if (this.state.dialogeOpenCount == 0 || this.state.dialogeOpenCount == 1) {
			this.setState({ feildName: name }, () => {
				this.setState({ dialogVisible: true });
			});
		} else {
			Alert.alert('you have already added two tags');
		}

	};

	handleCancel = () => {
		this.setState({ dialogVisible: false });
	};

	onEnterTag = text => {
		if (this.state.dialogeOpenCount == 0) {
			this.setState({ tag: text })
		} else if (this.state.dialogeOpenCount == 1) {
			this.setState({ tag2: text })
		}
	}

	handleOK = () => {
		if (this.state.dialogeOpenCount == 0) {
			if (this.state.tag.length > 0) {
				this.setState({
					dialogVisible: false,
					dialogeOpenCount: this.state.dialogeOpenCount + 1,
				});
			}
		} else if (this.state.dialogeOpenCount == 1) {
			if (this.state.tag2.length > 0) {
				this.setState({
					dialogVisible: false,
					dialogeOpenCount: this.state.dialogeOpenCount + 1,
				});
			}

		}
	};

	addTitle = (text) => {
		this.setState({ title: text })
	}
	addDescripteion = (text) => {
		this.setState({ description: text })
	}


	NavigateToList = () => {
		if (this.state.title && this.state.myDate || this.state.description || this.state.tag || this.state.imgUri
			|| this.recording !== null) {
			this.createNote()
		} else {
			Alert.alert("PLease Enter All Feilds")
		}
	}

	createNote = async () => {

		try {
			const myArray = await AsyncStorage.getItem('NotesList');
			if (myArray !== null) {
				let NotesList = JSON.parse(myArray);
				let data = {
					type: this.state.title,
					date: this.state.myDate,
					text: this.state.description,
					tag: this.state.tag,
					tag2: this.state.dialogeOpenCount == 2 ? this.state.tag2 : '',
					imgUri: this.props.navigation.state.params.uri,
					audio: this.recording._uri

				}
				NotesList.push(data);
				await AsyncStorage.setItem('NotesList', JSON.stringify(NotesList));
				this.props.navigation.navigate('HomeScreen');
				Alert.alert('Your Item is Saved')
			} else {
				let NotesList = [];
				let data = {
					type: this.state.title,
					date: this.state.myDate,
					text: this.state.description,
					tag: this.state.tag,
					tag2: this.state.tag2,
					tag2: this.state.tag2,
					imgUri: this.props.navigation.state.params.uri,
					audio: this.recording._uri

				}
				NotesList.push(data);
				await AsyncStorage.setItem('NotesList', JSON.stringify(NotesList));
				this.props.navigation.navigate('HomeScreen');
				Alert.alert('Your Item is Saved')
				// this.props.navigation.navigate('Noteslist');
			}
		} catch (error) {
			Alert.alert(error)
			// Error retrieving data
		}
	}



	// When "Choose" is pressed, we show the user's image library
	// so they may show a photo from disk inside the image view.
	_onChoosePic = async () => {
		await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
		const {
			cancelled,
			uri,
		} = await ImagePicker.launchImageLibraryAsync();
		if (!cancelled) {
			this.setState({ imgUri: uri }, () => {
				this._onSave();
				this.props.navigation.navigate('UploadScreen', { imgUri: this.state.imgUri })
			});
			// console.log(uri) // this logs correctly
			// TODO: why isn't this showing up inside the Image on screen?
		}
	}
	askPermissionsAsync = async () => {
		await Permissions.askAsync(Permissions.CAMERA);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
		// you would probably do something to verify that permissions
		// are actually granted, but I'm skipping that for brevity
	};
	// When "Take" is pressed, we show the user's camera so they
	// can take a photo to show inside the image view on screen.
	_onTakePic = async () => {
		await this.askPermissionsAsync();
		const {
			cancelled,
			uri,
		} = await ImagePicker.launchCameraAsync({});
		if (!cancelled) {
			this.setState({ imgUri: uri }, () => {
				this._onSave();
				this.props.navigation.navigate('UploadScreen', { imgUri: this.state.imgUri })
			});
		}
	};

	// When "Save" is pressed, we snapshot whatever is shown inside
	// of "this.imageView" and save it to the device's camera roll.
	_onSave = async () => {
		await this.askPermissionsAsync();
		const uri = await ImagePicker.takeSnapshotAsync(this.imageView, {});
		await CameraRoll.saveToCameraRoll(uri);
		// TODO: show confirmation that it was saved (flash the word saved across bottom of screen?)
	};












	// For Image Share Function
	shareImage = async () => {
		let imageUrl = `http://img.gemejo.com/product/8c/${this.state.data}`;
		try {
			const result = await Share.share({
				message: imageUrl,
				url: `data:image/jpg;base64,${this.state.ImageSource}`
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		} zz
	};

	// For Camera Permission Function

	async requestCameraPermission() {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
				{
					title: "Cool Photo App Camera Permission",
					message:
						"Cool Photo App needs access to your camera " +
						"so you can take awesome pictures.",
					buttonNeutral: "Ask Me Later",
					buttonNegative: "Cancel",
					buttonPositive: "OK"
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You can use the camera");
			} else {
				console.log("Camera permission denied");
			}
		} catch (err) {
			console.warn(err);
		}
	}
	showHome = () => {
		this.setState(
			{
				displayView: !this.state.displayView
			},
			() => {
				this.clickedPhoto();
			}
		);
	};
	// handle Input Text
	changeText = key => value => {
		this.setState({ [key]: value })
	}


	getAllPhotos = () => {
		CameraRoll.getPhotos({
			first: 20,
			assetType: 'Photos',
		})
			.then(r => {

				this.setState({ photos: r.edges }, () => {
					// console.log(this.state.photos,"Alll photos...")
				});
			})
			.catch((err) => {
				//Error Loading Images
			});
	};

	recordAudio = async () => {
		// this.props.navigation.navigate('Audio');
		await Permissions.askAsync(Permissions.AUDIO_RECORDING);

		const recording = new Audio.Recording();
		try {
			await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
			await recording.startAsync();
			Alert.alert("Record Playing....", recording)

			// You are now recording!
		} catch (error) {
			// An error occurred!
		}
	}

	render() {
		console.log('this.recording', this.recording, this.sound);


		return (
			<View style={{ backgroundColor: 'white', flex: 1 }}>
				<Dialog.Container visible={this.state.dialogVisible}>
					<Dialog.Title style={{ fontSize: 25, textAlign: 'center' }}>Card Detail</Dialog.Title>
					<Text style={{
						textAlign: 'center',
						fontSize: 20,
						color: "#000000",
						paddingBottom: 10
					}}>{'Enter your' + " " + this.state.feildName}</Text>
					<Dialog.Input value={this.state.dialogeOpenCount == 0 ? this.state.tag : this.state.tag2} onChangeText={this.onEnterTag} style={{ height: 100, borderColor: '#cccccc', borderWidth: 2, borderRadius: 10 }} />
					<Dialog.Button label="Cancel" onPress={this.handleCancel} />
					<Dialog.Button label="OK" onPress={this.handleOK} />
				</Dialog.Container>
				<View style={{ marginTop: 40, flex: 1 }}>
					<Text style={{ textAlign: 'center', fontSize: 20 }}>CREATE NEW NOTES</Text>
					<Card
						style={{
							height: '60%',
							width: '90%',
							padding: 1,
							marginLeft: 20,
							marginRight: 20,
							marginTop: 20,
							borderRadius: 5
						}}
					>
						<CardItem style={{ flex: 1 }}>
							<Body >
								<TextInput style={{ height: '10%', width: '100%', fontSize: 18, }}
									underlineColorAndroid="transparent"
									placeholder="EDIT TITLE"
									placeholderTextColor="#cecece"
									autoCapitalize="none"
									onChangeText={this.addTitle} />
								<Text style={{ fontSize: 12, }}>{this.state.myDate}</Text>
								<TextInput
									style={{
										justifyContent: 'flex-start',
										alignItems: 'flex-start',
										height: '30%',
										width: '100%',
										fontSize: 16,
										padding: 1
									}}
									underlineColorAndroid="transparent"
									placeholder="Add Note Descriptions..."
									placeholderTextColor="#cecece"
									autoCapitalize="none"
									multiline={true}
									onChangeText={this.addDescripteion} />
							</Body>
							<Right>
								<Body>
									<View style={{ right: -40 }}>
										<TouchableOpacity onPress={() => { this.showDialog("Tag Title") }}>
											<Badge
												style={[
													{
														backgroundColor: 'white',
														borderWidth: 1,
														borderColor: 'black',
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
										</TouchableOpacity>
									</View>
								</Body>
							</Right>
						</CardItem>
					</Card>
					<View style={{ flexDirection: "row", }}>
						{
							this.state.imgUri ?
								<Image ref={(ref) => this.imageView = ref}
									style={{
										height: 50,
										width: 60,
										resizeMode: 'cover',
										marginTop: 20,
										marginLeft: 20,
										marginBottom: 20,
										borderWidth: 2,
										borderColor: "black",
									}}
									source={{ uri: this.state.imgUri }}
								/> :
								<TouchableOpacity
									style={[
										commonStyles.timer,
										{
											marginTop: 20,
											marginLeft: 20,
											marginBottom: 20
										}
									]}
									onPress={() => this._onTakePic()}
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
						}
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<TouchableOpacity
								onPress={() => this._onRecordPressed()}
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
									name="mic"
									style={{
										fontSize: 22,
										marginTop: 5,
										textAlign: 'center',
										color: 'black'
									}}
								/>
							</TouchableOpacity>
							<Text style={{ paddingLeft: 10 }}>
								{this.state.isRecording ? 'LIVE' : ''}
							</Text>

							<Text style={{ paddingLeft: 10 }}>
								{this._getRecordingTimestamp()}
							</Text>
							{/* <View style={styles.recordingContainer}>
								<View style={styles.recordingDataContainer}>
				
							
								</View>
							</View> */}
						</View>
						<FlatList
							style={{ marginLeft: 10 }}
							horizontal={true}
							data={this.state.photos}
							renderItem={({ item, index }) => {
								return (
									<TouchableOpacity
										onPress={() => this._onChoosePic()}
										style={
											{
												marginTop: 20,
												marginLeft: 10,
												marginBottom: 20,
												borderRadius: 10,
											}
										}
									>
										<Image
											key={index}
											style={{
												height: 50,
												width: 60,
												resizeMode: 'cover',
												borderWidth: 2,
												borderColor: "black",
											}}
											source={{ uri: item.node.image.uri }}
										/>
									</TouchableOpacity>
								);
							}}
						/>
					</View>
				</View>
				<Footer navigation={this.props.navigation} text={"Done"}
					// onPress={this.creteNote}
					//  onPress={()=>{this.props.navigation.navigate('NewNote')}}
					onPress={this.NavigateToList}
					activeTab={'SignInScreen'} />
			</View>
		);
	}
}

export default NewNote2;

const styles = StyleSheet.create({
	emptyContainer: {
		alignSelf: 'stretch',
		backgroundColor: BACKGROUND_COLOR,
	},
	noPermissionsText: {
		textAlign: 'center',
	},
	recordingContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	recordingDataContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	recordingDataRowContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	liveText: {
		color: LIVE_COLOR,
	},
	recordingTimestamp: {
		paddingLeft: 1,
	},
	playbackTimestamp: {
		textAlign: 'left',
		alignSelf: 'stretch',
		paddingRight: 2,
	},
	image: {
		backgroundColor: BACKGROUND_COLOR,
	},
	textButton: {
		backgroundColor: BACKGROUND_COLOR,
		padding: 10,
	},

});


