module.exports = function (grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    compress: true, // true will minify
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "assets/css/style.css": [
                        'src/less/utils/**/*.less',
                        'src/less/style.less',
                    ],

                }
            }
        },
        concat: {
            js: {
                src: [
                    'src/js/app.js'
                ],
                /**
                 * Output file is a single file for frontEnd
                 */
                dest: 'assets/js/app.js',
            }
        },
        terser: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    'assets/js/app.min.js': 'assets/js/app.js',
                }
            }
        },
        /**
         * Generate rtlCSS automatically
         */
        rtlcss: {
            siteRTL: {
                // task options
                options: {
                    // rtlcss options
                    opts: {
                        clean: true
                    },
                    // rtlcss plugins
                    plugins: [],
                    // save unmodified files
                    saveUnmodified: true
                },
                expand: true,
                cwd: 'assets/css/',
                dest: 'assets/css/',
                src: ['**/*.css', '!**/*.rtl.css'],
                ext: '.rtl.css'
            },
        },
        watch: {
            styles: {
                files: ['src/less/*.less'], // which files to watch
                tasks: ['less', 'rtlcss'],
                options: {
                    nospawn: true,
                    livereload: true
                }
            },
            js: {
                files: ['src/js/*.js'], // which files to watch
                tasks: ['concat', 'terser'],
                options: {
                    spawn: false,
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'index.html',
                        'assets/css/*.css',
                        'assets/js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    // grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-rtlcss');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-terser');

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['less', 'rtlcss', 'concat', 'terser', 'browserSync', 'watch']);

    // if (process.env.NODE_ENV === 'build') {
    //     // grunt.registerTask('default', ['less', 'rtlcss', 'concat', 'terser', 'compress']);
    // } else {
    //     grunt.registerTask('default', ['less', 'rtlcss', 'concat', 'terser', 'watch']);
    // }
};
