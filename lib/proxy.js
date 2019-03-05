/**
 * Dash.js
 * @author Loreto Parisi (loretoparisi at gmail dot com)
 * @copyright Copyright (c) 2019 Loreto Parisi
*/
'use strict';
(function () {

    var express = require('express'),
        httpProxy = require('http-proxy'),
        proxy = httpProxy.createProxyServer({});

    var options = {
        port: 9000,
        proxy: {
            dash: {
                uri: 'http://localhost:9050'
            }
        }
    };
    const PORT = process.env.PORT || options.port;

    var app = express();
    app.use(express.static(__dirname + '/assets'));

    app.post('/dash/_dash-update-component', function (req, res) {
        var target_uri = options.proxy.dash.uri + req.url + '?'
        proxy.once('proxyReq', function (proxyReq, req, res, options) { //restream
            let bodyData;
            if (!req.body || !Object.keys(req.body).length) {
                return;
            }
            switch (proxyReq.getHeader('Content-Type')) {
                case "application/json":
                case "application/json; charset=UTF-8":
                    if (typeof req.body == "object") { // request body is a object
                        bodyData = JSON.stringify(req.body);
                        console.log("________________________JSON BODY\n", bodyData)
                    } else { // request body is a JSON string
                        bodyData = req.body;
                    }
                    break;
                case "application/x-www-form-urlencoded":
                    bodyData = JSON.stringify(req.body);
                    break;
                default:
            }
            if (bodyData) {
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
                proxyReq.end();
            }
        });
        proxy.web(req, res, {
            /*autoRewrite: true,
            xfwd: true,
            followRedirects: true,
            cookiePathRewrite: "*",
            cookieDomainRewrite: false,*/
            //true/false, passes the absolute URL as the path (useful for proxying to proxies)
            toProxy: false,
            //true/false, Default: true - specify whether you want to prepend the target's path to the proxy path
            prependPath: true,
            //  url string to be parsed with the url module
            target: target_uri,
            //  true/false, Default: false - changes the origin of the host header to the target URL
            changeOrigin: true,
            //  true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request 
            ignorePath: true
        });
    });//dash
    app.get('/dash/assets/:file', function (req, res) {
        var target_uri = options.proxy.dash.uri + req.url;
        proxy.web(req, res, {
            //true/false, passes the absolute URL as the path (useful for proxying to proxies)
            toProxy: false,
            //true/false, Default: true - specify whether you want to prepend the target's path to the proxy path
            prependPath: true,
            //  url string to be parsed with the url module
            target: target_uri,
            //  true/false, Default: false - changes the origin of the host header to the target URL
            changeOrigin: true,
            //  true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request 
            ignorePath: true
        });
    });//dash
    app.get('/_dash-component-suites/:component/:file', function (req, res) {
        var target_uri = options.proxy.dash.uri + req.url;
        proxy.web(req, res, {
            //true/false, passes the absolute URL as the path (useful for proxying to proxies)
            toProxy: false,
            //true/false, Default: true - specify whether you want to prepend the target's path to the proxy path
            prependPath: true,
            //  url string to be parsed with the url module
            target: target_uri,
            //  true/false, Default: false - changes the origin of the host header to the target URL
            changeOrigin: true,
            //  true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request 
            ignorePath: true
        });
    });//dash
    app.get('/dsh/_dash-layout', function (req, res) {
        var target_uri = options.proxy.dash.uri + req.url;
        proxy.web(req, res, {
            //true/false, passes the absolute URL as the path (useful for proxying to proxies)
            toProxy: false,
            //true/false, Default: true - specify whether you want to prepend the target's path to the proxy path
            prependPath: true,
            //  url string to be parsed with the url module
            target: target_uri,
            //  true/false, Default: false - changes the origin of the host header to the target URL
            changeOrigin: true,
            //  true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request 
            ignorePath: true
        });
    });//dash
    app.get('/dash/_dash-dependencies', function (req, res) {
        var target_uri = options.proxy.dash.uri + req.url;
        proxy.web(req, res, {
            //true/false, passes the absolute URL as the path (useful for proxying to proxies)
            toProxy: false,
            //true/false, Default: true - specify whether you want to prepend the target's path to the proxy path
            prependPath: true,
            //  url string to be parsed with the url module
            target: target_uri,
            //  true/false, Default: false - changes the origin of the host header to the target URL
            changeOrigin: true,
            //  true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request 
            ignorePath: true
        });
    });//dash
    app.get('/dash/_reload-hash', function (req, res) {
        var target_uri = options.proxy.dash.uri + req.url;
        proxy.web(req, res, {
            //true/false, passes the absolute URL as the path (useful for proxying to proxies)
            toProxy: false,
            //true/false, Default: true - specify whether you want to prepend the target's path to the proxy path
            prependPath: true,
            //  url string to be parsed with the url module
            target: target_uri,
            //  true/false, Default: false - changes the origin of the host header to the target URL
            changeOrigin: true,
            //  true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request 
            ignorePath: true
        });
    });//dash
    app.get('/dash', function (req, res) {
        var target_uri = options.proxy.dash.uri + '/dash?';
        proxy.web(req, res, {
            target: target_uri,
            //  true/false, Default: false - changes the origin of the host header to the target URL
            changeOrigin: false,
            //  true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request 
            ignorePath: false
        });
    });//dash
    app.get("/", (req, res, next) => {
        res.sendfile(__dirname + '/index.html');
    });
    app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

}).call(this);