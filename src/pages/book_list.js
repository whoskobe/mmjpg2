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
    TouchableWithoutFeedback
} from "react-native";
import {Container, Header, Body, Title, Subtitle, StyleProvider} from "native-base";
import {fetchBookList} from "../utils/fetch";
import BookDetail from "./book_detail_gallery";
import BookRowItemGrid from "../compontents/book_row_item_grid";
import ListFooter from "../compontents/list_footer";
import Toast from "@remobile/react-native-toast";

// ========================================================

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const LIST_BOTTOM_PADDING = Platform.OS === 'ios' ? 5 : 15;

// ========================================================

export default class ListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            pageNum: 1,
            isFetching: false,
            hasError: false,
            hasNext: true,
        };


        this.handerPressRowItemClick = this.handerPressRowItemClick.bind(this);
    }

    componentDidMount() {


        InteractionManager.runAfterInteractions(() => {
            this.fetchData(this.state.pageNum);
        });

    }

    handerPressRowItemClick(item) {
        console.log('handerPressRowItemClick', item);

        this.props.navigator.push({
            component: BookDetail,
            passProps: {title: item.name, id: item.id, originLinkUrl: item.originLinkUrl}
        });
    }


    fetchData(pageNum) {


        if (this.state.hasError) {
            return;
        }

        if (this.state.isFetching) {
            return;
        }


        this.setState({isFetching: true});


        let domain = 'mmjpg';
        let list = 'list';

        fetchBookList(domain, list, pageNum).then(
            (respData) => {
                let bookList = respData.list;
                let hasNext = respData.hasNext;


                let list = this.state.dataList.concat(bookList);


                this.setState({
                    dataList: list,
                    pageNum: pageNum,
                    isFetching: false,
                    hasError: false,
                    hasNext: hasNext
                });
            },
            (respStatus) => {
                this.setState({dataList: [], isFetching: false, hasError: true});
                Toast.showShortCenter('发生错误，请重试！');
            }
        );
    }

    _onEndReached() {
        if (!this.state.hasNext) {
            Toast.showShortCenter('没有更多数据了~');
            return;
        }

        this.fetchData(this.state.pageNum + 1);
    }

    _renderFooter() {
        return <ListFooter hasNext={this.state.hasNext} dataList={this.state.dataList}
                           isFetching={this.state.isFetching}/>
    }

    _renderRow(item) {
        let key = 'item_id_' + item.id;
        return (<BookRowItemGrid key={key} item={item} handerPressRowItemClick={this.handerPressRowItemClick}/>);
    }

    render() {

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dataSource = ds.cloneWithRows(this.state.dataList);

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>鸣谢【www.mmjpg.com】</Title>
                    </Body>
                </Header>

                <ListView
                    contentContainerStyle={{ margin: 4, flexDirection: 'row',  flexWrap: 'wrap' }}
                    onEndReachedThreshold={150}
                    onEndReached={this._onEndReached.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}
                    enableEmptySections={true}
                    dataSource={dataSource}
                    renderRow={this._renderRow.bind(this)}/>
            </Container>
        );
    }

}
