import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    Dimensions,
    ListView,
    View,
    ActivityIndicator,
    InteractionManager,
    RefreshControl,
    Platform,
    TouchableWithoutFeedback,
    Text,
    NativeModules,
    Navigator,
    BackAndroid,
} from "react-native";


import {Container, Header, Body, Title} from "native-base";

import BookListPage from './pages/book_list';

export default class ListPage extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {


    }

    _configureScene(route) {
        if (route.key === 'user_login') {
            return Navigator.SceneConfigs.FloatFromBottom;
        }

        return Navigator.SceneConfigs.FloatFromRight
    }

    _renderScene(route, navigator) {
        const Component = route.component;
        return (
            <View style={styles.container}>
                <Component navigator={navigator} route={route} passProps={route.passProps}/>
            </View>
        );
    }




    render() {

        const initialRoute = {
            component: BookListPage
        };

        return (<Navigator
            ref={(nav) => { navigator = nav; } }
            initialRoute={initialRoute}
            configureScene={(route) => this._configureScene(route)}
            renderScene={(route, navigator) => this._renderScene(route, navigator)}/>);

    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
