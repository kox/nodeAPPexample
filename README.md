# nodeAPPexample

## Installation

Unpack the file and run these parameters:

`npm install
npm install mocha -g`

Install MongoDB: https://docs.mongodb.com/manual/installation/

## Setup

It's needed to insert the admin users. If you want to change the credentials,
you can do it manually in the file ./startup.js.

To run the script please follow these steps:

`mongod
npm run setup`

## Running

You can run the application in different modes.

- Basic
`npm start`

- Debug
`npm run debug`

- Watching for changes
`npm run watch`


## Testing

To run the tests, you will need mocha installed globably and use this script:
`npm run test`

### Thanks
