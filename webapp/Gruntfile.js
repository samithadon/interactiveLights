module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            jssounds: {
                expand: true,
                cwd: 'client/sounds/',
                src: '**',
                dest: 'public/javascripts/sounds/'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'client/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    console: true,
                    document: true
                }
            }
        },
        browserify: {
          'public/javascripts/index.js': ['client/index.js'],
          'public/javascripts/server.js': ['client/server.js']
        },
        watch: {
            watchify: {
                files: ['client/**/*.js', '!client/sounds/**/*'],
                tasks: ['browserify']
            },
            jssounds: {
                files: ['client/sounds/**/*'],
                tasks: ['copy:jssounds']
            }
        },
        concurrent: {
            dev: ['watch', 'shell:runserver', 'shell:rundb'],
            options: {
                logConcurrentOutput: true
            }
        },
        shell: {
            runserver:{
                command: 'nodemon bin/www'
            },
            rundb:{
                command: 'mongod --dbpath ../data'
            }
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-node-webkit-builder');
    // grunt.loadNpmTasks('grunt-contrib-stylus');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['copy', 'browserify', 'concurrent']);
    // grunt.registerTask('prod', ['copy', 'stylus', 'cssmin', 'jade', 'jshint', 'concat', 'uglify', 'browserify', 'shell']);
    // grunt.registerTask('build', ['copy', 'stylus', 'cssmin', 'jade', 'concat', 'uglify', 'browserify', 'nodewebkit']);

};
