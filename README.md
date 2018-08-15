# pwa-cache-static
ServiceWorkerを利用して、あらかじめ指定した静的ファイルをキャッシュさせ、  
リクエスト時に返却させるプログラム。

## 前提条件
- LocalhostまたはHTTPS経由での配信が必要となります。

## ディレクトリ構成
```
リポジトリTOP
│
├ index.html
├ offline.html .. リクエストされたファイルが存在しない場合の返却ファイル
├ src
│　├ css
│　├ images .. ホームスクリーンのアイコン画像
│　├ js
│　　├ app.js .. ServiceWorkerの登録処理を記述
│　　├ material.min.js.js .. ページデザイン用
├ manifest.json .. ウェブアプリ マニュフェスト
├ sw.js .. ファイルキャッシュやリクエスト時の返却ファイルを記述
```
## 動作概要
- index.htmlを表示したタイミングで、Service Workerの登録が行われます。
- 正常に登録ができればconsoleログに「Service worker registered」と表示されます。
- Service Workerのinstallイベント発火時に、静的ファイルをキャッシュします
- Service Workerのactivateイベント発火時に、旧バージョンのキャッシュファイルを削除します
- Service Workerのfetchイベント発火時に、キャッシュファイルを返却します
