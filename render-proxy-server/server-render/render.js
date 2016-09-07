/**
 * Created by jiege on 16/9/7.
 */
"use strict";
var ejs = require('ejs')
var io = require('socket.io-client')
var cheerio = require('cheerio')

module.exports=function(content, callback){
    var $ = cheerio.load(content);
    var nodes=$("[serverside='enable']");
    var codes=[];
    for(var i=0;i<nodes.length;i++){
        var code = $(nodes[i]).html();

        console.log(code);

        codes.push(code);
    }
    function server_env(){
        try{

            var htmlStr = $.html();
            console.log(htmlStr);

            callback(null, htmlStr);

        }catch(err){
            console.log(err);
        }
    }

    var func = new Function("$", "io", "ejs", "server_env", codes.join(";"));
    try{
        func($, io, ejs, server_env);
    }catch(err){
        callback(err,"");
    }


}