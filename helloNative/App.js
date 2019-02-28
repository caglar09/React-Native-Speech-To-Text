import React, {Component} from 'react';
import {Platform, StyleSheet, View,PermissionsAndroid} from 'react-native';
import { Container, Button, Text,Header,Content } from 'native-base';

// import Speech from 'react-native-speech';
import Voice from 'react-native-voice';
// import voiceAndroid from 'react-native-android-voice';
// import Speech from 'react-native-android-speech';

// var tts = require('react-native-android-speech')


async function requestRECORD_AUDIOPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        'title': ' microphone Permission',
        'message': 'microphone'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the microphone")
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

export default class App extends Component {

  componentWillMount()
  {
    requestRECORD_AUDIOPermission()
  }
    
  

  constructor(){
    super();
    this.state={
      results:[]
    }
    Voice.onSpeechResults=this.onSpeechResults.bind(this);
  }
  onSpeechResults(e){
    this.setState({
      results:e.value
    });
  }

  onSpeechStart(){
    Voice.start('tr_TR');
  }

  onSpeechEnd(){
    Voice.stop();
  }
  speech(){
    
  }

 


  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button style={styles.btn} light ><Text> Konuştur </Text></Button>
          <Button style={styles.btn}  primary onpress={this.onSpeechStart.bind()}><Text> Konuş </Text></Button>
          <Button  style={styles.btn} success onpress={this.onSpeechEnd.bind()}><Text> Konuşmayı sonlandır </Text></Button>
          {this.state.results.map( (text,index)=>  {
            return(
              <Text key={index}> {text} </Text>
              )
          })}
        </Content>
       
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  btn:{
    marginBottom:5,
    marginLeft: 5,
  }
});
