# create-osdoc-app

快速新建业务模块脚手架

## 使用

全局安装 `create-osdoc-app`

```bash
$ npm install create-osdoc-app -g
```

安装后执行如下命令

```bash
$ yarn create-osdoc-app [appName]
```

## 模板

目前支持模板有

- [`fast_h5_umi`](https://github.com/ahwgs/fast_h5_umi) - 基于 umi3.x+typescript+antd-mobile 构建 h5 模板

- [`fast_h5_vue`](https://github.com/ahwgs/fast_h5_vue) - vue +vuex-cli3+vuex+vue-router+vant 快速开发 h5 模板

## 使用示例

```bash
$ create-osdoc-app

? 🍖 请输入应用名称 (new-app)?
new-app-demo

? 🌮 请选择应用模板 (Use arrow keys)
> fast_h5_umi    - 基于umi3.x+typescript+antd-mobile 构建h5模板
  fast_h5_vue    - vue +vue-cli3+vuex+vue-router+vant 快速开发 h5模板

Cloning into 'new-app'...
remote: Enumerating objects: 123, done.
remote: Counting objects: 100% (123/123), done.
remote: Compressing objects: 100% (111/111), done.
Receiving objects:  22% (28/123),
Receiving objects: 100% (123/123), 99.90 KiB | 7.00 KiB/s, done.
Resolving deltas: 100% (4/4), done.
> 🚚 clone success
📋 Copied to clipboard, just use Ctrl+V
✨ File Generate Done
```

## LICENSE

MIT
