'use strict';

var util = require('util');
require('astros');

/**
 * 读取文件时，替换JS和CSS中的图片引用
 */

module.exports = new astro.Middleware({
    fileType: ['js', 'css']
}, function(asset, next) {
    let data = asset.data
    if(!data){
        next(asset);
        return;
    }
    let prjCfg = asset.prjCfg;
    let self = asset;
    let imgPrefix = prjCfg.imgPath || prjCfg.cdnPrefix || '';
    // 替换CSS中的图片路径
    if (asset.fileType == 'css') {
        data = data.replace(/(url|\.img)\([\'\"]?(?!http)(?!\~)([^\'\"\)]*?)[\'\"]?\s*?(\)|\,)/g,
            function(str, urlstr, imgpath, c) {
                if (asset.modNameMin[self.modType]) {
                    return util.format('%s("%s/img/%s/%s/%s"%s', urlstr, 
                        imgPrefix, asset.modNameMin[self.modType], self.name, imgpath, c);
                } else {
                    return str;
                }
            });
        data = data.replace(/(url|\.img)\(([\'\"]?)(?!http)~(.*?)\)/g,
            function(str, urlstr, qm, imgpath) {
                return util.format('%s(%s%s%s)', urlstr, qm, imgPrefix, imgpath);
            });
        //@fontPath:"~/img/font"
        data = data.replace(/[\'\"](?!http)~([^~]*?)[\'\"]/g,
            function(str, imgpath) {
                return util.format('"%s%s"', imgPrefix, imgpath);
            });
    }
    if (asset.fileType == 'js') {
        let regexp, adorn;
        if(!prjCfg._JIRExp){
            let rule = prjCfg.jsImgRefer || {};
                rule = rule.rule;
            if(!rule){
                rule = '$res(.__path__.)';
                // console.warn('astro-resource-refer:','项目未配置 jsImgRefer.rule 字段');
                // next(asset);
                // return;
            }
            prjCfg._JIRAdorn = rule.split('__path__');
            rule = rule.
                replace(/([$^()/?])/ig, function(a, b){
                    return '\\'+b;
                });
            prjCfg._JIRExp = new RegExp(rule.replace('__path__','(.*?)'), 'ig');
        }
        regexp  = prjCfg._JIRExp;
        adorn   = prjCfg._JIRAdorn;
        data    = data.replace(regexp,function(str, imgpath) {
            if(imgpath.charAt(0) == '~'){
                return util.format('%s%s', imgPrefix, imgpath.substr(1))
            }
            if (asset.modNameMin[self.modType]) {
                return util.format('"%s/img/%s/%s/%s"',
                    imgPrefix, asset.modNameMin[self.modType], self.name, imgpath);
            } else {
                return str;
            }                
            return ;
        });
    }
    asset.data = data;
    next(asset);
});