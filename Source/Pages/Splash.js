import React from "react";
import {SafeAreaView, View, ActivityIndicator, StatusBar, StyleSheet} from 'react-native';
import {AccentColor, width, NavyBlue, MyResponsiveFont, height} from "../Public/Ui";
import MyText from "../CustomComponent/MyText";
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';

export default class Splash extends React.Component {

    componentWillMount() {
        this.getData();
    }

    getData = async () => {
        // check AsyncStorage that user come for first time in app or no
        // this  AsyncStorage  setItem is in Intro page
        try {
            const value = await AsyncStorage.getItem('FirstLogin');
            if(value === null) {
                Actions.reset("IntroScene");
            }

            if (value !== null) {
                Actions.reset("RootWelcome");
            }

        } catch(e) {
            // error reading value
        }
    };


    render() {
        //The purpose of SafeAreaView is to render content within the safe area boundaries of a device
        return(
            <SafeAreaView
                style={styles.SafeAreaStyle}>
                <StatusBar hidden/>

                    <MyText text={'Splash'}
                            componentStyles={{color: 'white', fontSize: MyResponsiveFont(2.5)}}/>


                <View style={styles.ContentViewStyle}>

                    <ActivityIndicator
                        color={AccentColor} size={"large"}/>

                </View>


            </SafeAreaView>

        )


    }
}

const styles = StyleSheet.create({
    SafeAreaStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: NavyBlue},
        ContentViewStyle:{
            position: 'absolute',
            width,
            height: 100,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center'
        }

});