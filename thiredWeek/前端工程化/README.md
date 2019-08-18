# 前端工程化
> 说起前端工程化之前我们回顾一下前端开发模式的历史，早期典型的开发方式就是(java bean+ servlet +jsp)的MVC模式。JSP充当view视图层。此时前端开发的工作日常就是切割图。因为JSP一般是有后台开发人员编写(JSP本身就是一个servlet。)，

> 之后Ajax的出现，让js可以异步请求后台服务，实现页面动态更新。让前端代码慢慢从后台工程中剥离了出来。

> 而随着nodeJs的出现，让前端工程化得以迅速发展。

## 前端工程化的目标

> 搭建一个前端开发的框架，完善整个开发工作流（从开发到构建）提高开发效率。通过一系列的规范，借助工具和框架解决解决前端开发以及前后端协作开发过程中的痛点问题。

## 从0构建一个前端react项目

> 接下来从0开始搭建一个前端项目，来迅速了解前端工程。

1. npm初始化项目
```
    // 创建文件夹 webddemo
    // cd webdemo 
    执行 npm init
```

2. 安装打包构建webpack
```
    npm install webpack -D
```
3. 新建webpack.config.js webpack配置文件，配置出入口
```
const path = require("path");
module.exports = {
    entry: './index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename: 'webpack.bundle.js'
    }
};
```
4. 安装webpack-dev-server,webpack-cli依赖
```
    npm install webpack-dev-server webpack-cli -D
```
5. 新增index.html文件，引入打包后的文件,启动本地dev服务

```
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <script src="./webpack.bundle.js"></script>
</body>
</html>

    // 执行npm run dev
```

6. 安装babel相关依赖支持es6,以及react.
> 相关依赖
```

    "@babel/core": "^7.5.5",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
```

> 配置loader
```
module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            }
        ]
    }
```

7. 添加css-loader、style-loader解析css文件

安装依赖
```
    npm install css-loader style-loader -D
```
配置loader
```
    {
                test: /\.css$/,
                use: [
                  { loader: 'style-loader' },
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true
                    }
                  }
                ]
    }
```

8. 添加plugin
```
    const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
    // webpack.config.js中添加pugins配置
    plugins: [

    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
```
9. 构建时候根据不同环境设置不同环境变量

1. 安装定义环境变量包 cross-env
```
    npm i -D cross-env
```

