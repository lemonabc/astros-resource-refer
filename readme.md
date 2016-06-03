astros中间件

扩展JS及CSS中的资源引用。

## 配置
```
{
    name: 'astros-resource-refer',
    config: {
        jsImgRefer:'$res(.__path__.)',
        jsImgPath : './'
    }
}
```

`jsImRefer`表示JS引用资源的语法，默认值如示例。其中 `__path__`是固定格式，代表图片路径。如 `$.res(__path__)`或`%__path__%`。

JS中引用的图片，在HTML上展示时，如果使用相对路径，会造成404（图片在静态资源服务器上）。

因此，在开发过程中，中间件会自动加上静态资源服务器的域名补全图片的路径。 发布后，如果静态资源和Web服务同服务器，可通过`jsImaPath`参数设置引用图片的相对路径，如果静态资源是独立的服务器，则可通过它设置静态资源服务器域名。

## 引用本页面（模块或组件）的图片
该功能通过中间件 `astro-resource-refer` 实现

html结构、样式、JS中均有可能引用到图片。

在html结构中，可通过'$res'方法本页面（模块、组件）下的图片资源：

    <img src="$res(avatar.png)" >
    
>是的，它相对引用

**样式中：**

    background:url(avatar.png) no-repeat;
    
**js中：**

    var avatar = $res('avatar.png');
    

### 公共图片

除了页面（模块、组件）自有的图片，还有logo，icon等公共图片，这些都需要存放在 root/asset/img目录下，引用时，`在URL前面加上 ~/即可`。以HTML为例：

    <img src="$res(~/img/avatar.png)" >
    
样式和JS中同理。