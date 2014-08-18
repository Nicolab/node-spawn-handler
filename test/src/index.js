/**
 * @name spawn-handler (test)
 * @description Unit tests of `spawn-handler`.
 * @author Nicolas Tallefourtane <dev@nicolab.net>
 * @link https://github.com/Nicolab/node-spawn-handler
 * @license MIT https://github.com/Nicolab/node-spawn-handler/blob/master/LICENSE
 */

'use strict';

var test         = require('unit.js');
var spawn        = require('../../src/index');


describe('spawn-handler', function() {

  it('spawn.run', function() {

    var ls;
    var called;

    test.object(ls = spawn.run('ls', [__dirname]));

    ls.stdout.on('data', function (data) {
      called = true;
    });

    test.wait(20, function() {
      test.bool(called).isTrue();
    });
  });

  it('spawn.handle', function(done) {

    var pwd;
    var stdoutChecked;
    var onCloseCalled;
    var nameChecked;
    var defaultNameChecked;

    var onCloseHandler = function(code) {

      test.number(code).isIdenticalTo(0);
      onCloseCalled = true;
    };

    var consoleLog = console.log;

    console.log = function(data) {

      // name provided
      if(data.match('{the name} exited with code 0')) {

        nameChecked = true;

      // default value when name is not provided
      }else if(data.match('child process exited with code 0')) {

        defaultNameChecked = true;
      }

      consoleLog.apply(null, arguments);
    };

    test
      .case('test command execution, `done` (provided), `name` not provided')
      .object(spawn.handle(pwd = spawn.run('pwd'), onCloseHandler))
        .isIdenticalTo(pwd)
        .then(function() {

          pwd.stdout.on('data', function (data) {

            if(data.toString().match('spawn-handler')) {
              stdoutChecked = true;
            }
          });
        })

      .case('test `done` (not provided) and `name` (provided)')
      .object(pwd = spawn.handle(spawn.run('pwd'), null, '{the name}'))

      .wait(20, function() {

        var check = function (value) {
          test.bool(value).isTrue();
        };

        check(stdoutChecked);
        check(onCloseCalled);
        check(nameChecked);
        check(defaultNameChecked);

        // restore
        console.log = consoleLog;

        done();
      })
    ;
  });
});