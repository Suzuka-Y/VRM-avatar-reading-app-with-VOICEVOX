##前提環境
npm、yarn、VOICEVOXを使います。インストールしておいてください。
[npmインストール参考](https://qiita.com/gahoh/items/8444da99a1f93b6493b4)
上のリンクに従ってください。Node.jsをインストールすればnpmもインストールされます。
[yarn公式サイト](https://classic.yarnpkg.com/en/)
1. 上のリンクに飛び、"GET STARTED"ボタンをクリックする。
2. "Installation"ボタンをクリックする。
3. Install via npmに従う。
[VOICEVOX公式サイト](https://voicevox.hiroshiba.jp/how_to_use/)
1. 上のリンクに飛び、"ダウンロード"ボタンをクリックする。
2. VOICEVOXに従う。

##使い方
適当な場所にリポジトリをクローンする。
コマンドプロンプト(ターミナル)を開き、クローンしたフォルダにcdで移動する。
次のコマンドを実行する。
1. `yarn create vite vrm_librarian --template react-ts`
2. `cd ./vrm_librarian`
3. `yarn install`
4. `yarn add -D three react-three-fiber @pixiv/three-vrm @types/three`
フォルダ内のpublicフォルダの中に入り、VRMフォルダを新規作成する。
VRMフォルダ内にvrmファイルを入れる。
次のコマンドを実行すれば、アプリが動きます。
`npm run dev`

##参考
[参考資料](https://techracho.bpsinc.jp/ecn/2023_12_03/136723)
[vrmファイルはvroidで作成できます](https://vroid.com/)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
