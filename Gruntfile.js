'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var config = {
        app: 'app',
        dist: 'dist',
        tmp: '.tmp/concat/js',
        bower: 'bower_components'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,
        clean: {
            dist: ['<%= config.dist %>/**'],
            tmp: ['.tmp/**']
        },
        copy: {
            html: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>',
                        src: '*.html',
                        dest: '<%= config.dist %>'
                    }
                ]
            },
            pub: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>',
                        src: '*.pub',
                        dest: '<%= config.dist %>'
                    }
                ]
            },
            pdf: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>',
                        src: '*.pdf',
                        dest: '<%= config.dist %>'
                    }
                ]
            },
            polices: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.bower %>/materialize/dist',
                        src: 'font/**',
                        dest: '<%= config.dist %>'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>',
                        src: 'images/**',
                        dest: '<%= config.dist %>'
                    }
                ]
            }
        },

        useminPrepare: {
            html: '<%= config.app %>/index.html',
            options: {
                dest: '<%= config.dist %>',
                root: '<%= config.app %>'
            }
        },
        usemin: {
            html: ['<%= config.dist %>/index.html'],
            options: {
                assetsDirs: ['<%= config.dist %>']
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/css',
                    src: ['print.css', 'large.css'],
                    dest: '<%= config.dist %>/css',
                    ext: '.css'
                }]
            }
        },
        concat:{

        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: ['<%= config.tmp %>/compile.js']
                    }
                ]
            }
        }
    })
    ;


// init application for development
    grunt.registerTask('default', ['build']);

//build for production
    grunt.registerTask('build', [
        'clean',
        'copy',
        'useminPrepare',
        'concat',
        'ngAnnotate',
        'cssmin',
        'usemin',
        'uglify'
    ]);


}
;