# 项目结构
```
 v react-antd-admin
   > public
   v src
    v components
     > Layout               // 布局组件
     > Loader               // 加载组件
       index.js             // 导出
    > locales               // 国际化
    > pages                 // 页面
    > routes                // 路由
    > service               // api服务，包括mock
       api.js
       mock.js
    > stores                // mobx
    > styles                // 全局样式(antd主题定制)
    v utils                 // 封装的工具
       config.js            // 全局配置
       loading.js           // 基于js方式调用的加载插件
       request.js           // 简单封装axios
       tools.js             // 常用函数工具
      App.js
      App.less
      App.test.js
      index.js
      serviceWorker.js
    .gitignore
    config-overrides.js     // 重写项目默认配置
    LICENSE
    package.json
    README.md
    yarn.lock

```



# react-antd-admin

A simple and complete front-end management solution based on Ant Design

## Usage

1. Clone project code.

```bash
git clone https://github.com/shx996/react-antd-admin.git
cd react-antd-admin
```

2. Installation dependence.

```bash
yarn install
```

Or

```bash
npm install
```

3. Start local server.

```bash
npm run start
```


[react-antd-admin使用说明](https://juejin.im/post/5c6136656fb9a049e30891ed)