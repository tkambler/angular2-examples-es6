'use strict';

module.exports = (grunt) => {

    var fs = require('fs');
    var path = require('path');
    var Handlebars = require('handlebars');

    fs.readdirSync('demo_src/partials').forEach((file) => {
        var contents = fs.readFileSync('demo_src/partials/' + file, 'utf-8');
        Handlebars.registerPartial(path.basename(file, path.extname(file)), contents);
    });

// http://bdadam.com/blog/comparison-helper-for-handlebars.html
(function() {
    function checkCondition(v1, operator, v2) {
        switch(operator) {
            case '==':
                return (v1 == v2);
            case '===':
                return (v1 === v2);
            case '!==':
                return (v1 !== v2);
            case '<':
                return (v1 < v2);
            case '<=':
                return (v1 <= v2);
            case '>':
                return (v1 > v2);
            case '>=':
                return (v1 >= v2);
            case '&&':
                return (v1 && v2);
            case '||':
                return (v1 || v2);
            default:
                return false;
        }
    }

    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        return checkCondition(v1, operator, v2)
                    ? options.fn(this)
                    : options.inverse(this);
    });
}());

    Handlebars.registerHelper('debug', function() {
        console.log(arguments);
    });

    grunt.registerMultiTask('metal', function() {

        var done = this.async();
        var Metalsmith = require('metalsmith');
        var paths = require('metalsmith-paths');
        var collections = require('metalsmith-collections');
        var markdown = require('metalsmith-markdown');
        var templates = require('metalsmith-templates');
        var _ = require('lodash');
        var contentDir = path.resolve(__dirname, '..', 'demo');

        Metalsmith('.')
            .source('demo_src/content')
            .destination('demo')
            .metadata({
                'project_title': 'Angular 2.0 Examples'
            })
            .use(paths())
            .use(collections({
                'examples': {
                    'sortBy': 'position'
                }
            }))
            .use(function(files, metalsmith, done) {

                _.each(files, (file) => {
                    file.path.full = file.path.dir + path.sep + file.path.base;
                    file.path.absolute = path.join(contentDir, file.path.full);
                    var subFolders = _.compact(file.path.dir.split(path.sep)).length;
                    var projectPrefix = '../';
                    var contentPrefix = './';
                    for ( var i = 0; i < subFolders; i++ ) {
                        projectPrefix += '../';
                        contentPrefix += '../';
                    }
                    // contentPrefix = contentPrefix || '.';
                    file.project_prefix = projectPrefix;
                    file.content_prefix = contentPrefix;
                });

                done();

            })
            .use(markdown())
            .use(templates({
                'engine': 'handlebars',
                'directory': 'demo_src/templates'
            }))
            .build((err, files) => {
                if ( err ) {
                    grunt.fail.fatal(err.stack);
                }
                // console.log(files);
                var filenames = Object.keys(files);
                grunt.verbose.writeln('Wrote files: ', filenames);
                done();
            });

    });

};
