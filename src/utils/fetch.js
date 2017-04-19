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
    Text, NativeModules
} from "react-native";


export function fetchBookList(domain, list, page) {

    return new Promise(function (resolve, reject) {


        NativeModules.JsoupModule.getBookList(domain, list, page).then(result => {
            console.log('resolve', result);

            let json = JSON.parse(result);
            console.log('json====>', json);


            resolve(json);


        }).catch(result => {
            console.log('reject', result);

            let json2 = {
                code: 99999,
                message: '发生未知错误，请重试！'
            };

            reject(json2);
        });


    });


}


export function fetchCardList(domain, list, linkUrl) {

    return new Promise(function (resolve, reject) {


        NativeModules.JsoupModule.getCardList(domain, list, linkUrl).then(result => {
            console.log('resolve', result);

            let json = JSON.parse(result);
            console.log('json====>', json);


            resolve(json);


        }).catch(result => {
            console.log('reject', result);

            let json2 = {
                code: 99999,
                message: '发生未知错误，请重试！'
            };

            reject(json2);

        });


    });


}