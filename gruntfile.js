module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        less: {
            development: {
                files: {
                    "dev/styles/main.css": "src/styles/main.less"
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less' 
                }
            }
        },

        watch: {
            less: {
                files: 'src/styles/**/*.less',
                tasks: 'less:development'
            }
        },

        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './script/main.css'
                        }
                    ],
                    prefix: '@@'
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: 'src/index.html',
                        dest: 'dev/'
                    }
                ]
            },
            prod: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        }
                    ],
                    prefix: '@@'
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: 'prebuild/index.html',
                        dest: 'dist/'
                    }
                ]
            }
        },

        htmlmin: {                                     
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/script/main.min.js': 'src/script/main.js'
                }
            }
        }
    });

    // Carregar os plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean')      

    // Registrar tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build:dev', ['less:development', 'replace:dev', 'clean', 'uglify']); // Build para desenvolvimento
    grunt.registerTask('build:prod', ['less:production', 'htmlmin:dist', 'replace:prod', 'clean', 'uglify']); // Build para produção
};