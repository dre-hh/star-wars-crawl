#!/usr/bin/env node

var electron = require('electron-prebuilt');

var proc = require('child_process');

var child = proc.spawn(electron, [__dirname + '/main.js'], {stdio: 'inherit'})
child.on('close', function (code) {
  process.exit(code);
});
