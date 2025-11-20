# 🐶 Frenchie Tasks

フレンチ・ブルドッグをモチーフにしたかわいいTODOアプリ

![Frenchie Tasks](https://github.com/user-attachments/assets/0a5fa2ff-6db3-4e75-82d2-0665177dc1d5)

## 特徴 (Features)

- 🐕 かわいいフレンチブルドッグのマスコット
- 🦴 タスクの追加・完了・削除
- 📊 タスクの統計表示
- 🔍 フィルター機能（全て・未完了・完了済み）
- 💾 ブラウザのローカルストレージに自動保存
- 📱 レスポンシブデザイン
- 🎨 温かみのあるカラーパレット
- ✨ スムーズなアニメーション

## 使い方 (How to Use)

### 起動方法

1. このリポジトリをクローンまたはダウンロード
2. `index.html` をブラウザで開く

または、簡易HTTPサーバーを使用：

```bash
# Python 3がインストールされている場合
python3 -m http.server 8000

# ブラウザで http://localhost:8000 を開く
```

### 基本操作

1. **タスクの追加**: 上部の入力欄にタスクを入力して「追加」ボタンをクリック、またはEnterキーを押す
2. **タスクの完了**: チェックボックスをクリックしてタスクを完了/未完了に切り替える
3. **タスクの削除**: 各タスクの「削除」ボタンをクリック
4. **フィルター**: 「全て」「未完了」「完了済み」ボタンでタスクを絞り込み

## 技術スタック (Tech Stack)

- HTML5
- CSS3（アニメーション、グラデーション、フレックスボックス）
- Vanilla JavaScript（ES6+）
- localStorage API

## ファイル構成 (File Structure)

```
frenchie-tasks/
├── index.html    # メインHTMLファイル
├── style.css     # スタイルシート
├── script.js     # JavaScript機能
└── README.md     # このファイル
```

## ブラウザ対応 (Browser Support)

- Chrome/Edge (最新版)
- Firefox (最新版)
- Safari (最新版)

## ライセンス (License)

MIT License

---

🦴 Made with love by Frenchie 🦴
