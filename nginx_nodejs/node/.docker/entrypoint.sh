#!/bin/bash

DIR="/home/node/app/node_modules"
if [ ! -d "$DIR" ]; then
    npm install
fi

node index.js