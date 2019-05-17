import React from 'react';

import {StyleSheet, View, Image,SafeAreaView } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import MyText from "../CustomComponent/MyText";
import {MyResponsiveFont,TealColor,OrangeColor,TealLightColor} from "../Public/Ui";
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';


const slides = [
    {
        key: 'somethun',
        title: 'First Title',
        text: 'Description.\nSay something cool',
        image: require('../Assets/Image/IntroImage/1.jpg'),
        backgroundColor: TealColor,
    },
    {
        key: 'somethun-dos',
        title: 'Two Title',
        text: 'Other cool stuff',
        image: require('../Assets/Image/IntroImage/2.jpg'),
        backgroundColor: OrangeColor,
    },
    {
        key: 'somethun1',
        title: 'Three Title',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../Assets/Image/IntroImage/3.jpg'),
        backgroundColor: TealLightColor,
    }
];

export default class Intro extends React.Component {

    constructor(props){
        super(props);

    }

    componentWillMount() {
        this.storeData();
    }

    storeData = async () => {
        try {
            await AsyncStorage.setItem('FirstLogin', 'True');
            const value = await AsyncStorage.getItem('FirstLogin');

        } catch (e) {
            // saving error
        }
    };

    _renderItem = (item) => {
        return (
            <SafeAreaView  style={{backgroundColor: item.backgroundColor, flex: 1}}>
                <View style={styles.HeaderContent}>
                    <MyText text={item.title}
                            componentStyles={{color: 'white', fontSize: MyResponsiveFont(2.5)}}/>
                </View>
                <View style={styles.ImageContent}>
                    <Image style={{width: '100%', height: '100%'}} source={item.image}/>
                </View>

                <View style={styles.DescriptionContent}>
                    <MyText text={item.text}
                            componentStyles={{textAlign: 'center', color: 'white'}}/>
                </View>
            </SafeAreaView>
        )
    };

    render() {
        return (
            <AppIntroSlider
                slides={slides}
                renderItem={this._renderItem}
                showPrevButton
                showSkipButton
                onDone={()=>Actions.reset('RootWelcome')}
                // onSkip={() => console.log("skipped")}
            />

        );
    }


}

const styles = StyleSheet.create({
    HeaderContent: {
        flex: .2, justifyContent: 'center', alignItems: 'center'
    },
    ImageContent: {flex: .5, justifyContent: 'center', alignItems: 'center'},
    DescriptionContent: {flex: .15, justifyContent: 'center', alignItems: 'center'}

});