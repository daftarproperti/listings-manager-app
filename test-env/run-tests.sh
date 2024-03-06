#!/bin/bash

yarn install
yarn lint || { echo "Lint failed"; exit 1; }
yarn build || { echo "Build failed"; exit 1; }
yarn test:run
