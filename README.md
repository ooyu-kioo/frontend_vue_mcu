# frontend

## artist 情報のスクレイピングアプリ

- https://mcu.netlify.com/

### backend：Django Rest Framework

- 実行環境：[heroku](https://jp.heroku.com/)
- 1h 毎に任意の artist の公式サイトから、新規情報を取得、格納：[scraping_arsitsInfo.py](https://github.com/ooyu-kioo/backend_django_mcu/blob/master/scraping/management/commands/scraping_artistInfo.py)
- １日１回任意の artist の作品リリース一覧を取得、格納：[scraping_releaseInfo.py](https://github.com/ooyu-kioo/backend_django_mcu/blob/master/scraping/management/commands/scraping_releaseInfo.py)
- 情報を言語処理で４種にラベル分け(release, live, media, other)：
- 取得したデータを API レスポンス

### frontend：Vue.js

- 実行環境：[Netlify](https://www.netlify.com/)
- [Herokuが落ちないように定期的にurl叩く](https://uptimerobot.com/)
- API 取得・表示：[MainList.vue](https://github.com/ooyu-kioo/frontend_vue_mcu/blob/master/src/views/MainList.vue)
- レスポンシブ
- カードクリックで取得元の公式 HP へ遷移

***

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
