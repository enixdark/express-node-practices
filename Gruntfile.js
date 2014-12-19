/**
 * Created by enixdark on 12/19/14.
 */

module.exports = function(grunt){
    //load plugins install from npm  for grunt
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec'
    ].forEach(function(task){
          grunt.loadNpmTasks(task);
        });

    grunt.initConfig({
        cafemocha: {
            all: {src: 'qa/tests-*.js', options: {ui: 'tdd'}}
        },
        jshint:{
            app:['app.js','static/js/*.js'],
            qa: ['Gruntfile.js', 'static/qa/*.js']
        },
        exec: {
            linkchecker:{ cmd: 'linkchecker http://localhost:8000' }
        }
    });
    // register tasks
    grunt.registerTask('default', ['cafemocha','jshint','exec']);

};