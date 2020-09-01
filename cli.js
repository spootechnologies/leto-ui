#!/usr/bin/env node

const express = require("express");
const app = express();
const program = require('commander');
const open = require('open');

const api = require('./api/api.js');

program.version('0.0.6');

program
    .command('generate leto')
    .alias('g')
    .option('--ui')
    .action(function(options){startGenerating(options);});

program.parse(process.argv)

function startGenerating(options){
    if(options.ui){
        api.startAPI();
    }
}

