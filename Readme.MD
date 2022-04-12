# Hoxbot 🤖

## Purpose

A discord bot meant for the Hoxton staff to use.

## Features

- [x] automatically transforming questions in the support channel into threads
- [x] allowing people to mark the thread as resolved / unresolved
- [x] quickly posting a zoom link to the meeting]
- [X] fast creation of a new event 
- [X] quick create stand up thread, which tracks which "Student" permission members replied in it.

## Installation and setup

The usual:
s
```js
npm install
```

## Adding / modifying commands

To add a new command:
1. Register the slash command by adding a new `SlashCommandBuilder` in `registerCommands.ts`, then running
```bash
npm run setup
```
2. Create a handler function following the docs or existing commands
3. Add that handler to `index.ts` file under the appropriate section 
4. Test your changes by disabling the bot running in the host container and 
running
 ```
 npm run dev
 ```
Note that `nodemon` which runs the server will restart everytime files change. That includes the `/standup` command, which updates the local `activeStandupThreads.json` file

Once done, push the changes and restart the container

## Deployment

The project is currently deployed on Heroku with Ed's account: https://hoxtabot.herokuapp.com/
To prevent the app from sleeping, it is being pinged every 12 minutes by https://cron-job.org/en/

Therefore:
### DO NOT REMOVE THE "USELESS" EXPRESS ROUTES
