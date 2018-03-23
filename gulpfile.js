var concat = require('gulp-concat'),
    gulp = require('gulp');

gulp.task('css', function() {
    gulp.src([
            'node_modules/jsplumb/dist/css/jsplumbtoolkit-defaults.css',
            'css/**/*.css'
        ])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('web/dist/css'));
});

gulp.task('js', function() {
    gulp.src([
            'node_modules/jsplumb/dist/js/jsplumb.js',
            'js/**/*.js'
        ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('web/dist/js'));
});

gulp.task('default', function() {

        gulp.run('js', 'css');

})

gulp.task('watch', function() {
        gulp.run('default')

        gulp.watch('js/**/*.js', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('js');
        });

        gulp.watch('css/**/*.css', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('css');
        });

});
