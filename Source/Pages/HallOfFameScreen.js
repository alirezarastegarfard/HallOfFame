import React from "react";
import {FlatList, View, TouchableOpacity, Image, ActivityIndicator, BackHandler} from "react-native";
import {AccentColor, height} from "../Public/Ui";
import MyText from "../CustomComponent/MyText";
import {FetchDataFromAPI} from "../Public/Functions";
import {Actions} from 'react-native-router-flux';


export default class HallOfFameScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            ListLoading: false,
            page: 1,
            EmptyList: false
        }
    }
    handleBackButton(){
        //Traversing between Welcome Screen, Hall of Fame List is in a circular way
        Actions.reset("RootWelcome");
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress',this.handleBackButton);

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
        this.setState({refreshing: true});
        this.fetchDataFromAPI();
    }

    render() {
        return (
            <View
                style={{backgroundColor: 'transparent'}}>
                <FlatList
                    style={{backgroundColor: 'transparent'}}
                    data={this.state.data}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    keyExtractor={(item) => item.PersonID.toString()}
                    showsVerticalScrollIndicator={false}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh.bind(this)}
                    onEndReached={this.onEndPage.bind(this)}
                    ListEmptyComponent={() => this.renderEmptyList()}
                    ListFooterComponent={this.getRenderFooter.bind(this)}
                    onEndReachedThreshold={0.5}
                />
            </View>
        )
    }

    renderItem = (item, index) => {

        // Sheldon Cooper image at 3rd place always
        if ((index) % 2 !== 0 ||index===0)
            return (
                <View style={{height: height * .3, padding: 5}}>
                    <Image style={{width: '100%', height: '100%'}}
                           source={{uri: 'data:image/png;base64,{' + item.PersonImageBase64 + '}'}}/>
                </View>

            );
        else
            return (
                <View>
                    <View style={{height: height * .3, padding: 5}}>
                        <Image style={{width: '100%', height: '100%'}}
                               source={{uri: 'https://i.pinimg.com/originals/2e/29/c4/2e29c41787d04c4b3de4aa3832566357.jpg'}}/>
                    </View>

                    <View style={{height: height * .3, padding: 5}}>
                        <Image style={{width: '100%', height: '100%'}}
                               source={{uri: 'data:image/png;base64,{' + item.PersonImageBase64 + '}'}}/>
                    </View>

                </View>

            )
    };


    fetchDataFromAPI() {


        let Parameter = JSON.stringify({
            Page: this.state.page
        });


        FetchDataFromAPI("FamousActors", Parameter, (response) => {

            console.log(response);

            if (response.Response === null) {
                this.setState({refreshing: false, ListLoading: false});
                return;
            }


            if (response.Response.length > 0) {

                this.setState(preState => {
                    return {
                        data: this.state.page === 1 ? response.Response : [...preState.data, ...response.Response],
                        refreshing: false,
                    }
                });
            } else
                this.setState({refreshing: false, ListLoading: false});


        }).done(() => this.setState({refreshing: false, ListLoading: false, EmptyList: this.state.data.length <= 0}))

    }

    handleRefresh() {
        this.setState({page: 1, refreshing: true, data: [], ListLoading: false}, () =>
            this.fetchDataFromAPI());
    };

    renderEmptyList() {


        if (this.state.EmptyList)
            return (
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>

                    <MyText
                        componentStyles={{color: AccentColor, fontSize: 16}}
                        text={"اطلاعاتی برای نمایش وجود ندارد"}/>

                </View>
            );

        if (this.state.refreshing && this.state.ListLoading)
            return <ActivityIndicator color={AccentColor} size={"large"}/>;

        return null;


    }

    onEndPage() {

        if (this.state.data.length >= 3) {
            this.setState({page: this.state.page + 1, ListLoading: true, refreshing: false}, () =>
                this.fetchDataFromAPI());
        }

    }

    getRenderFooter() {
        if (this.state.data.length <= 0) return null;

        if (this.state.ListLoading)
            return <ActivityIndicator color={AccentColor} size={"large"}/>;
        else
            return null;
    }


}

