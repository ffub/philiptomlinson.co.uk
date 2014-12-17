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

    concat: {
      css: {
        src: ['bower_components/normalize.css/normalize.css', 'build/assets/styles/app.css'],
        dest: 'build/assets/styles/app.css',
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
        livereload: true,
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
    
    /* Deployment */

    rsync: {
      options: {
        recursive: true,
        syncDest: true
      },
      live: {
        options: {
          src: "build/",
          dest: "/sites/philiptomlinson.co.uk",
          host: "stomlinson.org",
        }
      }
    },
    
  });
  
  /* Components */
  
  grunt.registerTask('css', [
    'sass',
    'newer:autoprefixer:all',
    'concat:css'
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