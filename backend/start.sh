#!/bin/bash

echo "migrate start"
npm run migrate:dev
npm run migrate:seed
echo "migrate end"
npm run start
