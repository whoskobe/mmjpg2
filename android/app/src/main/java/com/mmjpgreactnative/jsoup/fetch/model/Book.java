package com.mmjpgreactnative.jsoup.fetch.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by bain.wang on 2017/3/14.
 */

public class Book {
    private String name;
    private String faceUrl;
    private String originLinkUrl;

    private List<Card> cardList = new ArrayList();


    public void setOriginLinkUrl(String originLinkUrl) {
        this.originLinkUrl = originLinkUrl;
    }

    public String getOriginLinkUrl() {
        return originLinkUrl;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFaceUrl() {
        return faceUrl;
    }

    public void setFaceUrl(String faceUrl) {
        this.faceUrl = faceUrl;
    }

    public List<Card> getCardList() {
        return cardList;
    }

    public void setCardList(List<Card> cardList) {
        this.cardList = cardList;
    }
}
