package com.mmjpgreactnative.jsoup;

import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.mmjpgreactnative.jsoup.fetch.Fetch;
import com.mmjpgreactnative.jsoup.fetch.FetchImpl;
import com.mmjpgreactnative.jsoup.fetch.mmjpg.FetchForMmjpg;
import com.mmjpgreactnative.jsoup.fetch.model.Book;
import com.mmjpgreactnative.jsoup.fetch.model.Card;
import com.mmjpgreactnative.jsoup.fetch.model.PageInfo;

import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.facebook.react.common.ReactConstants.TAG;

/**
 * Created by bain.wang on 2017/3/14.
 */

public class JsoupModule extends ReactContextBaseJavaModule {
    public JsoupModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "JsoupModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
//        constants.put(DURATION_SHORT, Toast.LENGTH_SHORT);
//        constants.put(DURATION_LONG, Toast.LENGTH_LONG);

        constants.put("DOMAIN_MMJPG", Fetch.DOMAIN_MMJPG);
        constants.put("DOMAIN_MMJPG_LIST", Fetch.DOMAIN_MMJPG_LIST);


        return constants;
    }

    @ReactMethod
    public void testPrint(String name, ReadableMap info) {
        Log.i(TAG, name);
        Log.i(TAG, info.toString());
    }

    @ReactMethod
    public void getNativeClass(Callback callback) {
        callback.invoke("BGNativeExampleModule");
    }

    @ReactMethod
    public void testPromises(Boolean isResolve, Promise promise) {
        if (isResolve) {
            promise.resolve(isResolve.toString());
        } else {
            promise.reject(isResolve.toString());
        }
    }

    @ReactMethod
    public void getBookList(String domain, String list, Integer page, Promise promise) {
        Fetch fetch = new FetchImpl();

        try {
            PageInfo<Book> pageInfo = fetch.getBookList(domain, list, page);
            String ret = JSON.toJSONString(pageInfo);

            promise.resolve(ret);
        } catch (IOException e) {
            e.printStackTrace();
            Log.e(TAG, e.getMessage());
//            e.printStackTrace();
            promise.reject("99999", e.getMessage());
        }


    }


    @ReactMethod
    public void getCardList(String domain, String list, String originLinkUrl, Promise promise) {
        Fetch fetch = new FetchImpl();

        try {
            List<Card> bookList = fetch.getCardList(domain, list, originLinkUrl);
            String ret = JSON.toJSONString(bookList);

            promise.resolve(ret);
        } catch (IOException e) {
            e.printStackTrace();
            Log.e(TAG, e.getMessage());

//            e.printStackTrace();
            promise.reject("99999", e.getMessage());
        }


    }

}
