import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    AlertIOS,
    StatusBar,
    Dimensions,
    ListView,
    View,
    ActivityIndicator,
    InteractionManager,
    RefreshControl,
    Platform,
    TouchableWithoutFeedback
} from "react-native";
import {TabHeading, Tab, Spinner, CardItem, Subtitle, Icon, Text, StyleProvider} from "native-base";

// ========================================================

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const LIST_BOTTOM_PADDING = Platform.OS === 'ios' ? 5 : 15;

// ======================================================== ========================================================

export default class ListFooter extends Component {

    render() {
        if (!this.props.hasNext) {
            return (
                <View
                    style={{ height: 80, marginTop: 20, marginBottom: 20, width: DEVICE_WIDTH, justifyContent: 'center', alignItems: 'center' }}>
                    <CardItem style={{ alignItems: 'center' }}>
                        <Icon name="information-circle" ios="ios-information-circle" android="md-information-circle"/>
                        <Text>没有更多数据了......</Text>
                    </CardItem>
                </View>
            );
        }

        if (this.props.isFetching) {
            return (
                <View
                    style={{ height: 80, marginTop: 20, flexDirection:'row', marginBottom: 20, width: DEVICE_WIDTH, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner />
                    <Text>正在拼命加载数据......</Text>
                </View>
            );
        }

        return null;
    }


}
