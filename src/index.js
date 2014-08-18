/**
 * @name spawn-handler (main)
 * @description Handle easily a child process spawned.
 * @author Nicolas Tallefourtane <dev@nicolab.net>
 * @link https://github.com/Nicolab/node-spawn-handler
 * @license MIT https://github.com/Nicolab/node-spawn-handler/blob/master/LICENSE
 */

'use strict';

var spawn = require('child_process').spawn;

/**
 * Shortcut of `require('child_process').spawn(command, [args], [options])`.
 *
 * @link http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
 * @param string command
 * @param array  args
 * @param object options
 * @return {ChildProcess} ChildProcess object
 */
function run(command, args, options) {
  return spawn.apply(null, arguments);
}

/**
 * Spawn handler
 *
 * @param {ChildProcess}  child   Child process instance.
 *
 * @param {function}      [done]  Callback executed at the end,
 *                                receives `exit code`.
 *
 * @param {string}        [name]  Child process name
 *                                (by default `child process`).

 * @return {ChildProcess} ChildProcess object.
 */
function handle(child, done, name) {

  name = name || 'child process';

  child.stdout.on('data', function (data) {
    process.stdin.write(data);
  });

  child.stderr.on('data', function (data) {
    process.stderr.write(data);
  });

  child.on('close', function (code) {

    console.log(name + ' exited with code ' + code);

    if(typeof done === 'function') {
      done(code);
     }
  });

  return child;
}


/*----------------------------------------------------------------------------*\
  Expose
\*----------------------------------------------------------------------------*/

module.exports = {
  run    : run,
  handle : handle,
  spawn  : spawn
};