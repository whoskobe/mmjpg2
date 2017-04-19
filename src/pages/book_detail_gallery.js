import React, {Component} from "react";
import {
    Linking,
    Modal,
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
    Alert,
    ToastAndroid, StatusBar,
    BackAndroid
} from "react-native";
import {Subtitle, Content, Spinner, Button, Icon, Text, StyleProvider} from "native-base";
import Gallery from "react-native-gallery";
import {fetchCardList} from "../utils/fetch";
import Toast from "@remobile/react-native-toast";

// ========================================================

var navigator2 = null;


export default class GalleryPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showCommentBox: true,
            page: 0,
            dataList: [],
            isFetching: true,

        }

    }


    _renderLoading() {
        return (
            <Content>
                <View style={ { margin:50, flex: 1, justifyContent: 'center', alignItems: 'center', } }>
                    <Spinner />
                    <Text>正在拼命加载数据......</Text>
                </View>
            </Content>
        );
    }


    componentWillUnmount() {


    }


    componentDidMount() {


        InteractionManager.runAfterInteractions(() => {
            this.fetchData();
        });


    }

    fetchData() {


        let linkUrl = this.props.passProps.originLinkUrl;
        let domain = 'mmjpg';
        let list = 'list';

        let tt = (new Date()).getTime();
        linkUrl = linkUrl + "?time=" + tt;

        fetchCardList(domain, list, linkUrl).then((dataList) => {


            this.setState({
                dataList: dataList,
                isFetching: false
            });


        }, (respStatus) => {
            this.setState({isFetching: false});


            Toast.showShortCenter('发生错误，请重试！');
        });

    }

    toggleCommentBox() {
        if (!this.state.showCommentBox) {
            this.setState({
                showCommentBox: true
            });
        } else {
            this.setState({
                showCommentBox: false
            });
        }
    }

    hideCommentBox() {
        if (this.state.showCommentBox) {
            this.setState({
                showCommentBox: false
            });
        }
    }

    handlePressGoBack() {
        this.props.navigator.pop();
    }

    handlePressShare() {
        Toast.showShortCenter('handlePressShare');

    }

    handlePressMyBook(type) {
        this.sendMyBookUpdate(type);
    }

    handlePressComment() {
        Toast.showShortCenter('handlePressComment');

    }

    handlePressDownload() {
        Toast.showShortCenter('handlePressDownload');

    }

    render() {
        let header = null;
        let footer = null;


        if (this.state.isFetching) {
            return this._renderLoading();
        }


        if (this.state.showCommentBox) {


            let title = '';
            if (!this.state.isFetching) {
                title = (this.state.page + 1) + '/' + this.state.dataList.length;
            }


            header = (
                <View
                    style={{position: 'absolute',flexDirection:'row', left: 0, right: 0, top: 0, height: 50, backgroundColor: '#00000066',  alignItems: 'center', justifyContent: 'flex-start'}}>
                    <View style={{width:150,marginTop:5}}>
                        <Button transparent onPress={() => { this.handlePressGoBack() }}>
                            <Icon name='arrow-back' ios="ios-arrow-back" android="md-arrow-back"/>
                            <Text style={{ marginLeft: 10 }}>{title}</Text>
                        </Button>
                    </View>

                </View>


            );

            let likedStyle = {};
            if (this.state.liked) {
                likedStyle = {color: 'red'};
            }
            let favoritedStyle = {};
            if (this.state.favorited) {
                favoritedStyle = {color: 'red'};
            }

            footer = (
                <View
                    style={{position: 'absolute',flexDirection:'row', left: 0, right: 0, bottom: 0, height: 50, backgroundColor: '#00000066',  alignItems: 'center', justifyContent: 'center'}}>

                    <View style={{flex:1,flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end' }}>

                        <Button transparent onPress={() => { this.handlePressMyBook('like') }}>
                            <Icon style={likedStyle} active={this.state.liked} name="thumbs-up"/>
                        </Button>
                        <Button transparent onPress={() => { this.handlePressMyBook('favorite') }}>
                            <Icon style={favoritedStyle} active={this.state.favorited} name="bookmark"/>
                        </Button>
                        <Button transparent onPress={() => { this.handlePressComment() }}>
                            <Icon name="chatbubbles"/>
                        </Button>
                        <Button transparent onPress={() => { this.handlePressDownload() }}>
                            <Icon name='download'/>
                        </Button>
                        <Button transparent onPress={() => { this.handlePressShare() }}>
                            <Icon name='share'/>
                        </Button>

                    </View>
                </View>


            );
        }


        let images = [];
        for (let j = 0; j < this.state.dataList.length; j++) {
            images.push(this.state.dataList[j].faceUrl);
        }

        return (
            <View style={{flex:1}}>
                <StatusBar
                    backgroundColor="#000000"
                    barStyle="light-content"
                />
                <Modal transparent={true} visible={true} onRequestClose={() => {this.props.navigator.pop()}}>
                    <View style={{flex: 1,backgroundColor:'#000000'}}>
                        <Gallery style={{flex: 1, backgroundColor: 'transparent'}} initialPage={0} pageMargin={10}
                                 images={images}
                                 onSingleTapConfirmed={() => { this.toggleCommentBox(); }}
                                 onGalleryStateChanged={(idle) => { if(!idle) { } }}
                                 onPageSelected={(page) => { this.setState({page}); }}
                        />
                        {header}

                    </View>
                </Modal>
            </View>
        );
    }
}
