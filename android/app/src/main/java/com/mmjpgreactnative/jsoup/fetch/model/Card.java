package com.mmjpgreactnative.jsoup.fetch.model;

/**
 * Created by bain.wang on 2017/3/14.
 */

public class Card {
    private String faceUrl;
    private String originLinkUrl;


    public void setOriginLinkUrl(String originLinkUrl) {
        this.originLinkUrl = originLinkUrl;
    }

    public String getOriginLinkUrl() {
        return originLinkUrl;
    }


    public void setFaceUrl(String faceUrl) {
        this.faceUrl = faceUrl;
    }

    public String getFaceUrl() {
        return faceUrl;
    }

}
