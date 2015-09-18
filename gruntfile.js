'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  defaultAssets = require('./config/assets/default'),
  //testAssets = require('./config/assets/test'),
  fs = require('fs'),
  path = require('path');

  module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: [
                    defaultAssets.client.js, defaultAssets.client.lib.js
                ],
                dest: 'public/dist/application.js'
            }
        },
        uglify: {
            js: {
                files: {
                    'public/dist/application.min.js': ['public/dist/application.js']
                }
            }
        },
        watch: {
          files: [defaultAssets.client.css, defaultAssets.client.lib.css, defaultAssets.client.js, defaultAssets.client.lib.js],
          tasks: ['concat', 'cssmin', 'uglify']
        },
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat:js', 'uglify:js']);
};