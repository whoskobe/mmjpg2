package com.mmjpgreactnative.jsoup.fetch;

import com.mmjpgreactnative.jsoup.fetch.model.Book;
import com.mmjpgreactnative.jsoup.fetch.model.Card;
import com.mmjpgreactnative.jsoup.fetch.model.PageInfo;

import java.io.IOException;
import java.util.List;

/**
 * Created by bain.wang on 2017/3/14.
 */

public interface Fetch {

    PageInfo<Book> getBookList(String domain, String list, Integer page) throws IOException;

    List<Card> getCardList(String domain, String list, String originLinkUrl) throws IOException;

    String DOMAIN_MMJPG = "mmjpg";
    String DOMAIN_MMJPG_LIST = "list";

 

}
