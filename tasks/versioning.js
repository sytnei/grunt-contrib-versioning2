'use strict';
var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {

    var embeddedFiles = {};

    grunt.registerMultiTask('versioning', 'Assets versioning', function() {
        var filenames = getNames(this.data.files);
        var doc = this.data.doc;
        var hastype = (this.data.hastype) ? this.data.hastype : 'date';
        var hashvalue = (this.data.hashvalue) ? this.data.hashvalue : Math.floor(Math.random() * 99999999);
        var text = fs.readFileSync(doc, {
            encoding: 'utf-8'
        });


        if (hastype == 'date'){
            var cd = new Date();
            var codeVersion = cd.getFullYear() +''+ cd.getMonth() +''+ cd.getDay()+''+ cd.getHours() +''+ cd.getMinutes() +''+ cd.getSeconds();
        }
        else if (hastype = 'custom'){
            var codeVersion = hashvalue;
        }

        filenames.forEach(function (fileName) {
            if (embeddedFiles[fileName]) {
                text = injectFile(text, fileName);
            } else {
                text = getUpdatedText(text, fileName, codeVersion);
            }
        });
        fs.writeFileSync(doc, text);
        
        for (var item in this.data.files) {
            var name = this.data.files[item];
            for (var i = 0, len = name.length; i < len; ++i) {
                var fileName = name[i].src;
                renameFile(fileName, codeVersion);
            }
        };
    });
    
    function getUpdatedText(text, fileName, codeVersion) {
        var parts = text.split(fileName);
        var newtext = parts[0] + codeVersion + '.' + fileName + parts[1];
        return newtext;
    }

    function injectFile (text, fileName) {
        
    }

    function renameFile (name, codeVersion) {
        var m = name.split('/');
        var lastPart = m[m.length - 1];
        var prefix = m.slice(0, m.length - 1).join('/');
        var newName = prefix + '/' + codeVersion + '.' + lastPart;
        fs.link(name, newName, function(err) {});
    }

    function getNames (files) {
        var r = [];

        for (var i = 0, len = files.css.length; i < len; ++i) {
            var file = files.css[i];
            var m = file.src.split('/');
            r.push(m[m.length - 1]);
            if (file.embedded) {
                embeddedFiles[file.src] = file.src;
            }
        }

        for (var i = 0, len = files.js.length; i < len; ++i) {
            var file = files.js[i];
            var m = file.src.split('/');
            r.push(m[m.length - 1]);
        }
        return r;
    }

};
