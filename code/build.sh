#!/bin/bash
#npx rollup -p @rollup/plugin-terser --format=es --file=../functions/api/add.js -- add.js
#npx rollup -p @rollup/plugin-terser --format=es --file=../functions/api/del.js -- del.js
npx rollup -p @rollup/plugin-terser --format=es --file=../functions/api/get.js -- get.js
#npx rollup -p @rollup/plugin-terser --format=es --file=../functions/api/list.js -- list.js
#npx rollup -p @rollup/plugin-terser --format=es --file=../functions/api/query.js -- query.js
#npx rollup -p @rollup/plugin-terser --format=es --file=../functions/api/toggle.js -- toggle.js
#npx rollup --format=es --file=dist/router.js -- router.js
