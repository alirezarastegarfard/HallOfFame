import React, {Component} from 'react';
import {Router, Scene} from "react-native-router-flux";
import Intro from "./Source/Pages/Intro";
import Splash from "./Source/Pages/Splash";
import WelcomeScreen from "./Source/Pages/WelcomeScreen";
import HallOfFameScreen from "./Source/Pages/HallOfFameScreen";


export default class App extends Component {
    render() {
        return (
            <Router>

                <Scene hideNavBar>
                    <Scene key="Splash" component={Splash} initial hideNavBar/>

                    <Scene key="IntroScene">
                        <Scene key="Intro" component={Intro} initial hideNavBar/>
                    </Scene>

                    <Scene key="RootWelcome">
                        <Scene key="WelcomeScreen" component={WelcomeScreen} initial hideNavBar/>


                    </Scene>
                    <Scene key="RootFame">
                        <Scene key="HallOfFameScreen" component={HallOfFameScreen} initial hideNavBar/>

                    </Scene>
                </Scene>

            </Router>


        );
    }
}

