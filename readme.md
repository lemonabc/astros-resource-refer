## 说明

扩展JS及CSS中的资源引用。

资源引用分为绝对路径和相对路径。


### 绝对路径

解析时，就把图片路径中的“~”换成图片目录。开发环境默认图片目录是 `assets`

#### CSS：

    background:url(~/img/logo.png);
    /*
        output: 
        background:url(/assets/img/logo.png)
    */

#### JS:
    
    var logoSrc = $res("~/img/logo.png");
    /*
        output:
        var logoSrc = "/assets/img/logi.png"
    */  
    
##### JS 中的样式引用语法可自定义

参见 site.js中jsImgRefer字段，如：

```
    jsImgRefer : {
        rule : '\"#path__\"'
    }
```

JS中你可写成

```
    var logoSrc = "#~/img/logo.png";
    // 解析后
    var logoSrc = "/img/logo.png";
    // 相对路径
    var logoSrc = "#logo.png";
    // 解析后
    var logoSrc = "/img/p/home/logo.png";    
```


### 相对路径

Astro把资源划分为3类，分别是页面（page）、网页组件（webCom）、JS组件（jsCom）。

他们的文件结构都是一样的，一home页面为例：

* home
    * home.html
    * home.less
    * home.js
    * [dir]img
        * banner.jpg

页面自身的图片均存放在img目录中。在LESS和JS中，需要引用图片时，直接写图片名称即可。
#### CSS

    background:url(banner.jpg);
    /*
        output: 
        background:url(/assets/img/p/home/logo.png)
    */
JS中同理。

页面、网页组件、JS组件最终图片引用路径如下：

| 资源所属模块    | 模块名称  |   图片名称       | 发布后路径 |
|:----------|:---------|:-----------:| ---------:|
| 网页        |  home    | logo.png       |  /assets/img/p/home/logo.png |
| 网页组件     |  header  | logo.png        |  /assets/img/wc/header/logo.png |
| JS组件      |  dialog  | logo.png       |  /assets/img/jc/dialog/logo.png |




<br/><br/><br/><br/><br/>