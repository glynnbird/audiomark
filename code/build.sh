#!/bin/bash
npx rollup --format=es --file=../functions/api/audioget.js -- audioget.js
npx rollup --format=es --file=../functions/api/audioput.js -- audioput.js
