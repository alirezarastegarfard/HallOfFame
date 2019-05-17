import React from "react";
import {TouchableOpacity, View, Image, SafeAreaView, ScrollView, BackHandler, StyleSheet} from 'react-native';
import shuffleSeed from 'shuffle-seed';
import {height, MyResponsiveFont, SecondaryTextColor, AccentColor} from "../Public/Ui";
import MyInput from "../CustomComponent/MyInput";
import MyText from "../CustomComponent/MyText";
import {Actions} from 'react-native-router-flux';

export default class WelcomeScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            CounterItemOfGif: 0,
            InputValue: undefined,
            ArrayOfGif: [require('../Assets/Gif/One.gif'),
                require('../Assets/Gif/Two.gif'),
                require('../Assets/Gif/Three.gif'),
                require('../Assets/Gif/Four.gif'),
                require('../Assets/Gif/Five.gif')],
            DefaultArrayOfGif: []
        }
    }

    handleBackButton() {
        //Traversing between Welcome Screen, Hall of Fame List is in a circular way
        Actions.reset("RootFame");
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        // keep first situation of my array
        this.setState({DefaultArrayOfGif: this.state.ArrayOfGif});


        //  every 5 seconds change animations
        this.Interval = setInterval(() => {
            this.setState({CounterItemOfGif: this.state.CounterItemOfGif + 1});
            if (this.state.CounterItemOfGif === 5) {
                this.setState({CounterItemOfGif: 0})
            }
        }, 5000);

    }

    render() {

        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.ImageViewStyle}>

                        <Image
                            style={{width: '100%', height: '100%'}}
                            source={this.state.ArrayOfGif[this.state.CounterItemOfGif]}/>
                    </View>
                    <View style={styles.InputViewStyle}>
                        <MyInput
                            value={this.state.InputValue}
                            onChangeText={(InputValue) => this.setState({InputValue: InputValue})}
                            placeholder={'Insert Your Number'}
                            placeholderTextColor={SecondaryTextColor}
                            viewStyle={{height: 50, width: '50%'}}
                            inputStyle={{
                                fontSize: MyResponsiveFont(2, 18), textAlign: 'left',
                            }}
                        />
                    </View>

                    <View
                        style={styles.ButtonViewStyle}>
                        <TouchableOpacity
                            onPress={() => this.ChangeShowingGif('Save')}
                            style={styles.TouchableStyle}>
                            <MyText text={'Save'}
                                    componentStyles={{color: 'white'}}
                            />
                        </TouchableOpacity>

                    </View>

                    <View
                        style={styles.ButtonViewStyle}>
                        <TouchableOpacity
                            onPress={() => this.ChangeShowingGif('Randomise')}
                            style={styles.TouchableStyle}>
                            <MyText text={'Randomise'}
                                    componentStyles={{color: 'white'}}
                            />
                        </TouchableOpacity>

                    </View>



                </ScrollView>
            </SafeAreaView>

        )

    }


    ChangeShowingGif(ButtonType) {

        //  both button call this function


      // checking input be number
        if (isNaN(this.state.InputValue) && ButtonType === 'Save') {
            alert('please enter number 3!');
            return;
        }

        // checking which button clicked

      //we shuffle the order of displaying animations based on the current InputValue inserted by user
        if (ButtonType === 'Save') {
            this.setState({ArrayOfGif: shuffleSeed.shuffle(this.state.DefaultArrayOfGif, parseInt(this.state.InputValue))}, () => console.log(this.state.ArrayOfGif));
        }


        //we shuffle  number between 1- 9 instead of current number
        if (ButtonType === 'Randomise') {
            let rand = 1 + (Math.random() * (9 - 1));
            this.setState({ArrayOfGif: shuffleSeed.shuffle(this.state.ArrayOfGif, rand)}, () => console.log(this.state.ArrayOfGif));
        }

    }
}

const styles = StyleSheet.create({
 ImageViewStyle: {height: height * 0.6, padding: 20},
 InputViewStyle:{justifyContent: 'center', alignItems: 'center'},
    ButtonViewStyle:{
        marginRight: '4%',
        marginLeft: '4%',
        marginTop: '4%', height: 60,
    },
TouchableStyle:{
    width: '100%', height: '100%',
    backgroundColor: AccentColor,
    borderRadius: 4,
    alignItems: 'center', justifyContent: 'center'
}

});