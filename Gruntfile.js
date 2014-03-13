module.exports = function(grunt) {
  
  // Load the grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('assemble');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    /* CSS */
    
    sass: {
      all: {
        options: {
          compass: true,
          require: 'sass-globbing',
          loadPath: [ 'bower_components/' ],
        },
        files: {
          'build/assets/styles/app.css': 'src/styles/app.scss'
        },
      },
    },
    
    autoprefixer: {
      all: {
        src: 'build/assets/styles/app.css'
      },  
    },
    
    /* Images */
    
    copy: {
      assets: {
        expand: true,
        cwd: "src/assets/",
        src: '**',
        dest: 'build/assets/',
        filter: 'isFile',
      }
    },
    
    /* Build the site */
    
    assemble: {
      options: {
        flatten: true,
        assets: 'build/assets',
        partials: ['src/templates/includes/*.hbs'],
        //helpers: ['templates/helpers/helper-*.js'],
        layouts: 'src/templates/layouts/',
        data: ['src/data/*.{json,yml}'],
      },
      all: {
        options: {
          layout: 'default.hbs'
        },
        src: 'src/*.hbs',
        dest: 'build/'
      },
    },
    
    /* Watch */
    
    watch: {
      options: {
        livereload: false,
        interrupt: true
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['css']
      },
      sass: {
        files: ['src/**/*.scss'],
        tasks: ['css']
      },
      assemble: {
        files: ['**/*.hbs'],
        tasks: ['assemble']
      },
    },
    
  });
  
  /* Components */
  
  grunt.registerTask('css', [
    'sass',
    'newer:autoprefixer:all'
  ]);
  
  grunt.registerTask('assets', [
    'copy'
  ]);
  
  /* Bring it together */
  
  grunt.registerTask('build', [
    'css',
    'assets',
    'assemble'
  ]);
  
  /* Default -- working state */
  
  grunt.registerTask('default', [
    'watch'
  ]);

};