module.exports = function(grunt) {

  // /require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    /* >> ------- Setup Diretories -------> */
    dir: {
      sources:'sources',
      compiled:'assets',
      imports:'imports',
      images: 'img',
      root: 'grunt-starter-sass'
    },
    /* << <-----  Setup Diretories ------- */


    /* >> ------- Dependencies -------> */
    autoprefixer: {
      options: {
         browsers: ['last 8 versions']
      },
      dist: { // Target
         files: {
           '<%= dir.compiled %>/css/main.css': '<%= dir.compiled %>/css/main.css'
         }
      },
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['<%= dir.sources %>/js/imports/*.js', '<%= dir.sources %>/js/main.js'],
        dest: '<%= dir.compiled %>/js/main.js',
      },
    },
    connect: {
      server: {
        options: {
            port:8000,
            hostname:'localhost',
            base:'<%= dir.root %>/',
            livereload:true
        },
      }
    },
    copy: {
      images: {
          expand: true,
          cwd: '<%= dir.sources %>/<%= dir.images %>/',
          src: '**',
          dest: '<%= dir.compiled %>/<%= dir.images %>/',
          //flatten: true,
          filter: 'isFile',
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '/',
          src: ['**/*.{jpg,gif}'],
          dest: '<%= dir.compiled %>/<%= dir.images %>'
        }]
      }
    },
    jshint: {
      files: ['<%= dir.sources %>/js/main.js'],
      options: {
         jquery: true,
         smarttabs: true,
         curly: true,
         eqeqeq: true,
         immed: true,
         latedef: true,
         newcap: true,
         noarg: true,
         sub: true,
         undef: true,
         boss: true,
         eqnull: true,
         browser: true
      },
      globals: {
         jQuery: true,
         console: true,
         undef: true,
         unused: false
      }
    },
    pngmin: {
      all: {
        options: {
          ext: '.png',
          force: true
        },
        files: [
          {
            expand: true,
            src: ['**/*.png'],
            cwd: '<%= dir.sources %>/<%= dir.images %>',
            dest: '<%= dir.compiled %>/<%= dir.images %>'
          }
        ]
      },
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= dir.compiled %>/css/main.css': '<%= dir.sources %>/css/scss/main.scss',
        }
      }
    },
    stylus: {
        compile: {
            options: {

            },
            files: {
              '<%= dir.compiled %>/css/main.css' : '<%= dir.sources %>/css/stylus/main.styl'
            }
        }
    },
    svgmin: {
       options: {
          plugins: [
            {
                removeViewBox: false
            }, {
                removeUselessStrokeAndFill: false
            }
          ]
       },
       dist: {
          files: [
             {
               expand: true,
               src: ['**/*.svg'],
               cwd: '<%= dir.sources %>/<%= dir.images %>',
               dest: '<%= dir.compiled %>/<%= dir.images %>'
             }
           ]
        }
     },


    /* >> -----  Watcher ------- > */
    watch: {
      options: {
        livereload: true,
      },

      concat: {
        files: ['<%= dir.sources %>/js/**/*.js'],
        tasks: ['concat']
      },
      data: {
          files: ['data/**/*.csv'],
          tasks: ['data'],
      },
      html: {
        files: ['index.html'],
      },
      images: {
         files: ['<%= dir.sources %>/<%= dir.images %>*.*'],
         tasks: ['newer:imagemin:dynamic', 'newer:pngmin:all', 'newer:svgmin','newer:copy:images'],
         options: {
             spawn: false
         }
      }/*,
      jshint: {
        files: ['<%= dir.sources %>/js/main.js'],
        tasks: ['jshint']
      }
      */
      ,
      sass: {
        options: {
         livereload: true,
        },
        files: ['<%= dir.sources %>/css/scss/**/*.scss'],
         tasks: ['sass', 'autoprefixer'],
      },
      stylus:{
        options: {
          livereload: true,
        },
          files: ['<%= dir.sources %>/css/stylus/**/*.styl'],
          tasks: ['stylus', 'autoprefixer'],
      },
    },
    /* << <-----  Watcher ------- */


  });

  /* >> -----  Load Tasks -------> */
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.loadNpmTasks('grunt-contrib-sass'); // SCSS     CSS/SCSS
  grunt.loadNpmTasks('grunt-contrib-stylus');      //  CSS/Stylus
  grunt.loadNpmTasks('grunt-autoprefixer'); // AUTOPREFIX

  grunt.loadNpmTasks('grunt-contrib-jshint');  // DBUG JS
  grunt.loadNpmTasks('grunt-contrib-concat');  // CONCAT

  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-pngmin');
  grunt.loadNpmTasks('grunt-svgmin');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');

  /* << <-----  Load Tasks ------- */


  /* >> -----  Run Tasks -------> */


  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('imgmin', ['imagemin', 'pngmin:all', 'svgmin']);


  /* << <-----  Load Tasks ------- */

};
