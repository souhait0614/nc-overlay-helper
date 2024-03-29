# <sub><img src="assets/icon.png" width="30px" height="30px" alt="NCOverlayHelper Logo"></sub> NCOverlayHelper

[![GitHub Release](https://img.shields.io/github/v/release/souhait0614/nc-overlay-helper?label=Releases)](https://github.com/souhait0614/nc-overlay-helper/releases)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/lkhmoihbofhalomfbejikpapobebjjcj?label=Chrome%20Web%20Store)](https://chromewebstore.google.com/detail/lkhmoihbofhalomfbejikpapobebjjcj)
[![Firefox Add-ons](https://img.shields.io/amo/v/ncoverlayhelper?label=Firefox%20Add-ons)](https://addons.mozilla.org/ja/firefox/addon/ncoverlayhelper/)

[<img src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/iNEddTyWiMfLSwFD6qGq.png" height="60px" alt="Available in the Chrome Web Store">](https://chromewebstore.google.com/detail/lkhmoihbofhalomfbejikpapobebjjcj)
[<img src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg" height="60px" alt="Get the add-on">](https://addons.mozilla.org/ja/firefox/addon/ncoverlayhelper/)

## 概要

[NCOverlay](https://github.com/Midra429/NCOverlay)本体に追加するまでもないけど個人的にほしい機能を足す拡張機能です。

NCOverlayHelper単体でも使用できると思いますが、[NCOverlay](https://github.com/Midra429/NCOverlay)との併用をオススメします。

## 対応している動画配信サービス

- [dアニメストア](https://animestore.docomo.ne.jp/animestore/)

※ 増減する可能性あり<br>
※ dアニメストア以外に対応する可能性は薄いです

## 機能・使い方

### 一覧画面でのコメント数表示

<img src="https://github.com/souhait0614/nc-overlay-helper/assets/62732828/d169db9d-a06c-46cd-a600-20fa0a4b8cb5" height="150px" alt="コメント数表示例">

動画情報にコメント数を表示します。<br>
[NCOverlay](https://github.com/Midra429/NCOverlay)のコメント取得処理を使用しているため、コメント専用動画のカウントやニコニコのNG設定の使用もできます。(設定の詳細は[ポップアップ](#ポップアップ)へ)

コメント数は自動で取得・表示されるので何もしなくてOK。<br>
dアニメストア ニコニコ支店のコメントを取得・表示するには、同じブラウザでニコニコにログインしてください。<br>

### ポップアップ

NCOverlayHelperの各機能の設定を行えます。<br>
一部設定は[NCOverlay](https://github.com/Midra429/NCOverlay)の設定と同名または同等の機能("ニコニコのNG設定を使用"など)ですが、**NCOverlayの設定とは別で設定**する必要があります。

- コメントカウンター
  - 機能の有効化/無効化
  - かわいいカウントを表示
  - タイトルの一致判定を厳密にする
  - コメント専用動画のコメント数を含める
  - ニコニコのNG設定を使用 (要ログイン)

## インストール

### Chrome Web Store

<https://chromewebstore.google.com/detail/lkhmoihbofhalomfbejikpapobebjjcj>

### Firefox Add-ons

<https://addons.mozilla.org/ja/firefox/addon/ncoverlayhelper/>

## 不具合報告・機能提案など

- GitHubの[Issues](https://github.com/souhait0614/nc-overlay-helper/issues)
- SNSアカウント宛にメッセージやメンション
  - Misskey: [@souhait@submarin.online](https://submarin.online/@souhait)
  - X (Twitter): [@ElectronicsBot](https://x.com/ElectronicsBot)

## 開発

### パッケージのインストール

```sh
pnpm i
```

### 開発サーバー起動

```sh
pnpm dev
```

[Plasmoのドキュメント](https://docs.plasmo.com/framework/workflows/dev#loading-the-extension)に従ってブラウザに拡張機能を導入してください。

### ビルド

```sh
pnpm build
```

以下のように出力されます。

```plaintext
build
├── NCOverlayHelper_v{version}-chrome.zip
└── NCOverlayHelper_v{version}-firefox.zip
```

## ライセンス

当ライセンスは[MIT](LICENSE)ライセンスの規約に基づいて付与されています。
