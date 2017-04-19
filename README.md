#mmjpg-react-native

项目目前只支持android版本，因为使用到jsoup抓取网站数据，而ios开发本人不会。
数据来源全部来自网站【http://www.mmjpg.com/】，通过开发android native模块的方式，使用jsoup抓取数据，提供给rn使用。

具体的代码可以查看【android/app/src/main/java/com/mmjpgreactnative/jsoup】包下面的逻辑。

计划支持其他的几个网站的数据抓取的，后续看情况吧。

截图见文件【Screnshots】



使用到的组件有:
```
"dependencies": {
  "@remobile/react-native-toast": "^1.0.6",
  "native-base": "^2.0.5",
  "react": "~15.4.0",
  "react-native": "0.41.2",
  "react-native-gallery": "^0.0.17",
  "react-native-vector-icons": "^4.0.0"
}
```
