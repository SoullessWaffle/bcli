## BCLI
Blocklevel Command-line Interface


### Installation
Install the package globally

```bash
$ npm install -g bcli
```

### Usage
You only need to type and answer the questions

```bash
$ bcli
```

or check all available commands

```bash
$ bcli -h
```

### Commands
`bcli component` Creates a new Vue component

`bcli page` Creates a new Vue page

`bcli store` Creates a new Vuex store module

`bcli packages` Installs most used npm packages

`bcli share` Shares a demo with Ngrok

### Adding a new command
Add a choice inside the list of choices `/bin/cli-default`, `name` should be the the title that will shown by the initial prompt, `value` should correspond to the name of the command listed in the `/bin` folder.

Add a new module inside /bin prepended with `cli-`, the module should ask the user for input and execute the command when done.

Add a new module in `/src` which executes the desired process
