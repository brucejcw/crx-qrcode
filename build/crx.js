var path = require('path')
var shelljs = require('shelljs')
var zipFolder = require('zip-folder');
var cwd = process.cwd()

shelljs.cp('-R', path.resolve(cwd, 'static/chrome/*'), path.resolve(cwd, 'dist'))

zipFolder(path.resolve(cwd, 'dist'), path.resolve(cwd, 'crx.zip'), function(err) {
    if(err) {
        console.log('oh no!', err);
    } else {
        console.log('EXCELLENT');
    }
});