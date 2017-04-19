package com.mmjpgreactnative.jsoup.fetch.model;

import java.util.List;

/**
 * Created by bain.wang on 2017/3/14.
 */

public class PageInfo<T> {
    private List<T> list;
    private boolean hasNext;

    public void setHasNext(boolean hasNext) {
        this.hasNext = hasNext;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public boolean getHasNext() {
        return hasNext;
    }

}
