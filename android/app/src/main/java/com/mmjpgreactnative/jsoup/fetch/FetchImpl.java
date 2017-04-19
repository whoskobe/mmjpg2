package com.mmjpgreactnative.jsoup.fetch;

import com.mmjpgreactnative.jsoup.fetch.mmjpg.FetchForMmjpg;
import com.mmjpgreactnative.jsoup.fetch.model.Book;
import com.mmjpgreactnative.jsoup.fetch.model.Card;
import com.mmjpgreactnative.jsoup.fetch.model.PageInfo;

import java.io.IOException;
import java.util.List;

/**
 * Created by bain.wang on 2017/3/14.
 */

public class FetchImpl implements Fetch {

    private Fetch fetchForMmjpg = new FetchForMmjpg();


    @Override
    public PageInfo<Book> getBookList(String domain, String list, Integer page) throws IOException {
        if (Fetch.DOMAIN_MMJPG.equals(domain)) {
            return fetchForMmjpg.getBookList(domain, list, page);
        }

     
        return null;
    }

    @Override
    public List<Card> getCardList(String domain, String list, String originLinkUrl) throws IOException {
        if (Fetch.DOMAIN_MMJPG.equals(domain)) {
            return fetchForMmjpg.getCardList(domain, list, originLinkUrl);
        }



        return null;
    }
}
