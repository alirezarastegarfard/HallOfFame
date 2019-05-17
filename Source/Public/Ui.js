import React from "react";
import { Platform, StatusBar,Dimensions} from "react-native";
// this section is for all color and everything is link with ui and we use repeatedly


export const {height, width} = Dimensions.get("window");
export const AppFont = 'IRANSansMobile(FaNum)';
export const SecondaryTextColor = '#959595';
export const BorderColor = '#DCDCDC';
export const AccentColor = '#3897F1';
export const backColor = '#FAFAFA';
export const PrimaryTextColor = '#282828';
export const NavyBlue = '#023565';
export const TealColor = '#59b2ab';
export const OrangeColor = '#febe29';
export const TealLightColor = '#22bcb5';


//ResponsiveFont use for changing font with size of screen
export function MyResponsiveFont(percent, MaxFont = 35) {

    const deviceHeight = Platform.OS === "ios"
        ? height * 0.9
        : Platform.OS === "android" ? height - StatusBar.currentHeight : height;

    const heightPercent = percent * deviceHeight / 100;

    if (MaxFont < heightPercent)
        return MaxFont;

    return Math.round(heightPercent);
}

