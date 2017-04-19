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
    Text,
    TouchableWithoutFeedback
} from "react-native";
import moment from "moment";

// ========================================================

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const LIST_BOTTOM_PADDING = Platform.OS === 'ios' ? 5 : 15;

// ======================================================== ========================================================

export default class BookRowItem extends Component {

    render() {
        let item = this.props.item;
        let height = parseInt(DEVICE_HEIGHT / 4);
        if (height % 2 !== 0) {
            height = height + 1;
        }
        // height=300;

        console.log('DEVICE_HEIGHT', DEVICE_HEIGHT, 'DEVICE_WIDTH', DEVICE_WIDTH);

        console.log(height);

        let mm = moment(item.upFlag);
        let time = mm.format('YYYY-MM-DD HH:mm:ss');

        let ww = (DEVICE_WIDTH / 3) - 8;

        let tt = item.name;

        return (
            <View style={{width:ww, margin:2, height:height}}>
                <TouchableWithoutFeedback onPress={() => { this.props.handerPressRowItemClick(item) } }>
                    <Image source={{ uri: item.faceUrl }} style={{ resizeMode: 'cover', flex:1 }}>
                        <Text style={styles.cardNum}>{tt}</Text>
                    </Image>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        backgroundColor: '#000000',
        opacity: 0.3,
        color: '#FFFFFF',
        height: 40,
        padding: 2,
        fontSize: 10,
    },
    cardNum: {
        fontSize: 12,
        padding: 2,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        color: '#FFFFFF',
        backgroundColor: '#000000',
        opacity: 0.5
    }
});

