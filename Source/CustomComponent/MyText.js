import React, {Component} from 'react';
import {Text,StyleSheet} from "react-native";
import {AppFont, MyResponsiveFont, PrimaryTextColor} from "../Public/Ui";
import propTypes from 'prop-types';


// use this class when i want use text because has default style
export default class MyText extends Component {
    render() {
        return (
            <Text
                style={[Styles.TextStyle, this.props.componentStyles]}
                {...this.props}>
                {this.props.text}
            </Text>
        )
    }
}

const Styles = StyleSheet.create({

    TextStyle : {
        fontSize: MyResponsiveFont(2),
        color: PrimaryTextColor,
        fontFamily: AppFont,
        textAlign : 'right'
    }

});

MyText.propTypes = {
    text            : propTypes.string,
    componentStyles : Text.propTypes.style
};

