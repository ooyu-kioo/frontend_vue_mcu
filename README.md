# frontend

## artist 情報のスクレイピングアプリ

- https://mcu.netlify.com/

### backend：Django Rest Framework

- 実行環境：[heroku](https://jp.heroku.com/)
- 1h 毎に任意の artist の公式サイトから、新規情報を取得、格納
- １日１回任意の artist の作品リリース一覧を取得、格納
- 情報を言語処理で４種にラベル分け(release, live, media, other)
- 取得したデータを API レスポンス

### frontend：Vue.js

- 実行環境：[Netlify](https://www.netlify.com/)
- API 取得・表示
- レスポンシブ
- カードクリックで取得元の公式 HP へ遷移

---

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
