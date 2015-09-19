'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  defaultAssets = require('./config/assets/default'),
  //testAssets = require('./config/assets/test'),
  fs = require('fs'),
  path = require('path');

// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    //Copy Tasks ==============================================================
    copy: {
      files: {
        cwd: 'modules/core/client/fonts',  // set working folder / root to copy
        src: '**/*',           // copy all files and subfolders
        dest: 'public/dist/fonts',    // destination folder
        expand: true           // required when using cwd
      }
    },
    // JS TASKS ================================================================

    uglify: {
      build: {
        options: {
          mangle: false
        },
        files: {
          'public/dist/js/app.min.js': [defaultAssets.client.js, defaultAssets.client.lib.js]
        }
      }
    },

    // CSS TASKS ===============================================================
    // process the less file to style.css
    less: {
      build: {
        files: {
          'public/dist/css/style.css': [defaultAssets.client.css]
        }
      }
    },

    // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'public/dist/css/style.min.css': 'public/dist/css/style.css'
        }
      }
    },

    // COOL TASKS ==============================================================
    // watch css and js files and process the above tasks
    watch: {
      css: {
        files: [defaultAssets.client.css, defaultAssets.client.lib.css],
        tasks: ['less', 'cssmin']
      },
      js: {
        files: [defaultAssets.client.js, defaultAssets.client.lib.js],
        tasks: ['uglify']
      }
    },

    // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }   

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['copy', 'less', 'cssmin', 'uglify', 'concurrent']);

};