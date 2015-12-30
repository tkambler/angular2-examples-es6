'use strict';

module.exports = (grunt) => {

    require('load-grunt-tasks')(grunt, {
        'pattern': [
            'grunt-*'
        ]
    });

    grunt.config.init({
        'browserify': {
            'options': {
                'exclude': [],
                'require': [],
                'paths': ['src'],
                'babelify': {
                    'enable': true,
                    'options': {
                        'presets': ['es2015']
                    }
                }
            },
            'build': {
                'options': {
                    'src': 'src/index.js',
                    'dest': 'dist/assessment.js'
                }
            }
        },
        'compass': {
            'all': {
                'options': {
                    'httpPath': '/',
                    'cssDir': 'dist',
                    'sassDir': 'scss',
                    'imagesDir': 'public/images',
                    'relativeAssets': true,
                    'outputStyle': 'compressed',
                    'importPath': [
                        'node_modules'
                    ]
                }
            }
        },
        'watch': {
            'css': {
                'files': ['scss/*'],
                'tasks': ['compass'],
                'options': {
                    'spawn': false,
                }
            },
            'scripts': {
                'files': ['src/**/*'],
                'tasks': ['browserify:build'],
                'options': {
                    'spawn': false
                }
            },
            'site': {
                'files': ['demo_src/**/*'],
                'tasks': ['site'],
                'options': {
                    'spawn': true
                }
            }
        },
        'eslint': {
            'options': {
                'configFile': 'eslint/conf.json',
                'rulePaths': ['eslint/rules'],
                'fix': true
            },
            'target': ['src/**/*.js']
        },
        'metal': {
            'options': {},
            'demo': {
                'options': {}
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.registerTask('build', ['site']);
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('site', ['metal:demo']);

};
