package com.mmjpgreactnative.jsoup.fetch.mmjpg;

import android.util.Log;

import com.mmjpgreactnative.jsoup.fetch.Fetch;
import com.mmjpgreactnative.jsoup.fetch.model.Book;
import com.mmjpgreactnative.jsoup.fetch.model.Card;
import com.mmjpgreactnative.jsoup.fetch.model.PageInfo;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by bain.wang on 2017/3/14.
 */

public class FetchForMmjpg implements Fetch {
    public static final String TAG = "FetchForMmjpg";


    @Override
    public PageInfo<Book> getBookList(String domain, String list, Integer page) throws IOException {
        String url = getUrl(domain, list, page);

        Log.i(TAG, "开始抓取URL=====》" + url);

        return getBookList(url, page);

    }

    @Override
    public List<Card> getCardList(String domain, String list, String originLinkUrl) throws IOException {
        return getCardList(originLinkUrl);
    }


    public static final String url = "http://www.mmjpg.com/";

    private String getUrl(String domain, String list, int page) {
        if (page == 1 || page == 0) {
            return url;
        }


        String prefix = "http://www.mmjpg.com/home/";
        return prefix + page;
    }


    private Document loadDocument(String url) throws IOException {

        Log.i(TAG, "开始Jsoup.get()地址###########");

        Document document = Jsoup.connect(url)
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
                .header("Accept-Encoding", "gzip, deflate, sdch")
                .header("Accept-Language", "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4")
                .header("Cache-Control", "no-cache")
                .header("Cookie", "zzaqkey0=2555418847; zzaqtoken=1489478712; bdshare_firstime=1489478706650; CNZZDATA3180008=cnzz_eid%3D658933151-1483756938-%26ntime%3D1483756938; Hm_lvt_9a737a8572f89206db6e9c301695b55a=1489478707; Hm_lpvt_9a737a8572f89206db6e9c301695b55a=1489478713")
                .header("Host", "www.mmjpg.com")
                .header("Pragma", "no-cache")
                .header("Referer", "http://www.mmjpg.com/")
                .header("Upgrade-Insecure-Requests", "1")
                .userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36")
                .timeout(10000).get();

//        String html = document.html();

        return document;
    }

    private int getPageNum(Document document) {
        String x = document.select(".page .info").first().text();
        String numStr = x.replace("共", "");
        String numStr2 = numStr.replace("页", "");
        try {
            return Integer.parseInt(numStr2);
        } catch (Exception ex) {
            Log.e(TAG, ex.getMessage());
        }
        return 1;
    }


    private PageInfo<Book> getBookList(String listUrl, Integer page) throws IOException {
        List<Book> bookList = new ArrayList<>();

        Document document = loadDocument(listUrl);

        Element elementUl = document.select("div.pic ul").first();

        Elements elementsLi = elementUl.select("li");


        for (Element elementLi : elementsLi) {
            Log.i(TAG, elementLi.html());

            Element elementLink = elementLi.select("a").first();
            Element elementImg = elementLi.select("img").first();


//            System.out.println(elementLink.attr("href"));
//            System.out.println(elementImg.attr("src"));
//            System.out.println(elementImg.attr("alt"));

            String name = elementImg.attr("alt");
            String linkUrl = elementLink.attr("href");
            String faceUrl = elementImg.attr("src");


            Book book = new Book();
            book.setName(name);
            book.setOriginLinkUrl(linkUrl);
            book.setFaceUrl(faceUrl);

            bookList.add(book);

        }

        PageInfo<Book> pageInfo = new PageInfo<>();
        pageInfo.setList(bookList);

        int pageNum = getPageNum(document);

        if (page < pageNum) {
            pageInfo.setHasNext(true);
        } else {
            pageInfo.setHasNext(false);
        }


        return pageInfo;
    }

    private List<Card> getCardList(String linkUrl) throws IOException {
        Document document = loadDocument(linkUrl);


        Element elementInfo = document.select(".article .info").first();
        Element elementDate = elementInfo.select("i").first();

        //发表于: 2017年02月01日
        String dateStr1 = elementDate.text();
        String dateStr2 = dateStr1.replace("发表于: ", "");

        String dateStr3 = dateStr2.trim();

//        long upFlag = 0L;
//        Date date = new Date(System.currentTimeMillis());
//        try {
//            date = org.apache.commons.lang3.time.DateUtils.parseDate(dateStr3, "yyyy年MM月dd日");
//            upFlag = date.getTime();
//        } catch (ParseException e) {
//            logger.error("解析时间失败, time===》" + dateStr3, e);
//        }
//
//        System.out.println("更新时间===》" + DateFormatUtils.format(date, "yyyy-MM-dd HH:mm:ss"));


        Element elementTags = document.select(".tags").first();
        Elements elements = elementTags.select("a");
        String tags = "";
        for (Element element : elements) {
            tags = tags + "," + element.text();
        }

        System.out.println("标签===》" + tags);


        Element elementPage = document.select("div.page").first();
        Elements elementsA = elementPage.select("a");

        int x = elementsA.size();
        Element elementLast = elementsA.get(x - 2);
        System.out.println("总页数===》" + elementLast.text());


        Element elementY = document.select(".clearfloat").first();
        String yyyStr = elementY.select("script").first().html();
        String yyyStr2 = yyyStr.substring(yyyStr.indexOf("[") + 1, yyyStr.indexOf("]"));

        System.out.println(yyyStr2);

        String[] yyyStr3 = yyyStr2.split(",");

        //http://img.mmjpg.com/
        String year = yyyStr3[0];
        String num = yyyStr3[1];

        int cardNum = Integer.parseInt(elementLast.text());

        String firstFaceUrl = "http://img.mmjpg.com/" + year + "/" + num + "/1.jpg";

//        Book book = saveBook(name, linkUrl, firstFaceUrl, cardNum, upFlag, tags);

        List<Card> cardList = new ArrayList<>();


        for (int i = 1; i <= cardNum; i++) {
            String faceUrl2 = "http://img.mmjpg.com/" + year + "/" + num + "/" + i + ".jpg";
            String linkUrl2 = "http://www.mmjpg.com/mm/" + num + "/" + i;


            System.out.println(faceUrl2);

//            saveCard(book, linkUrl2, faceUrl2, i);
            Card card = new Card();
            card.setFaceUrl(faceUrl2);
            card.setOriginLinkUrl(linkUrl2);

            cardList.add(card);
        }

        return cardList;

    }


}
