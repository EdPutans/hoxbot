# Hoxbot 🤖

## Purpose

A discord bot meant for both the Hoxton staff and students to use!

## Features

- [x] automatically transforming questions in the support channel into threads
- [x] allowing people to mark a thread as resolved / unresolved, as long as the thread is a #Classroom or #Support thread
- [x] quickly posting a zoom link to a meeting
- [X] fast creation of a new event 
- [X] quick create stand up thread, which tracks which students replied in it. (A student is an account with Student permission).

## Installation and setup

The usual:

```js
npm install
```

Create a `.env` file and create the following environment variables:
```
BOT_TOKEN
CLIENT_ID
CLIENT_SECRET
SERVER_ID

ED_ZOOM
NICO_ZOOM
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
Note that `nodemon` which runs the server will restart everytime files change. 

Once done, push the changes and restart the container

## Deployment

The project is currently deployed on Heroku with Ed's account: https://hoxtabot.herokuapp.com/
To prevent the app from sleeping, it is being pinged every 12 minutes by https://cron-job.org/en/

Therefore:
### DO NOT REMOVE THE "USELESS" EXPRESS ROUTES
