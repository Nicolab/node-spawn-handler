# spawn-handler

[![Actual version published on NPM](https://badge.fury.io/js/spawn-handler.png)](https://www.npmjs.org/package/spawn-handler)

Simple handler for ChildProcess.spawn of Node.js, it handles a [child process spawned](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options), then executes a callback when the process exits (optional).

_spawn-handler_ has no external dependencies.


## Quick start

### Install

```sh
npm install spawn-handler
```

### Usage

```js
var spawn = require('spawn-handler');
```

#### spawn.run(command, [args], [options])

Shortcut of `require('child_process').spawn(command, [args], [options])`.

Launches a new process (spawn) with the given `command`.

See the [Node.js doc (spawn)](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) for more details.

```js
spawn.run('any-command');
```


#### spawn.handle(child, [done], [name])

Spawn handler.

```js
var ls = spawn.handle(spawn.run('ls', ['./']), function(code) {
  console.log('Command exited with code ' + code);
}, 'List current directory');

ls.stdout.on('data', function(data) {
  console.log('files: ', data.toString());
});
```


## Testing

_spawn-handler_ [is tested](test/src/index.js) with [Unit.js](http://unitjs.com) and Mocha.
Unit.js is a powerful and intuitive unit testing framework for javascript.


## License

[MIT](https://github.com/Nicolab/node-spawn-handler/blob/master/LICENSE) (c) 2013, Nicolas Tallefourtane.


## Author

| [![Nicolas Tallefourtane - Nicolab.net](http://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](http://nicolab.net) |
|---|
| [Nicolas Talle](http://nicolab.net) |
| [![Make a donation via Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PGRH4ZXP36GUC) |
