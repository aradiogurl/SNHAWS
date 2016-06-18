const gulp = require('gulp');
const shell = require('gulp-shell');
const	eslint = require('gulp-eslint');
const	nodemon = require('gulp-nodemon');
const paths = {
  serverSrc: ['**/*.js', '!node_modules/**/*', '!snhaws-tech-docs/**/*'],
};
// jsdoc tasks that we have later defined and want run with each code change
const jsDocRun = ['jsdoc', 'jsdoc2md-server', 'jsdoc2md-api'];

gulp.task('firstRun', shell.task(['sh firstrun.sh']));

gulp.task('jsdoc', shell.task(['./node_modules/.bin/jsdoc -c jsdoc.conf -t ' +
  './node_modules/ink-docstrap/template -d snhaws-tech-docs -R ' +
  'README.md -r *.js'])
);

gulp.task('jsdoc2md-server', shell.task(
  ['./node_modules/.bin/jsdoc2md "*.js" > snhaws-tech-docs/snhawsServerTechDoc.md'])
);

gulp.task('jsdoc2md-api', shell.task(
  ['./node_modules/.bin/jsdoc2md "api/**/*.js" > snhaws-tech-docs/snhawsApiTechDoc.md'])
);
gulp.task('jsdoc2md-api-modules', shell.task(
  ['./node_modules/.bin/jsdoc2md "api-modules/**/*.js" > snhaws-tech-docs/snhawsApiTechDoc.md'])
);

gulp.task('watch', () => {
  gulp.watch(paths.serverSrc, ['lint', jsDocRun]);
});

gulp.task('restart-snhaws', () => {
  nodemon({
    script: 'snhaws.js',
    ext: 'js',
    ignore: ['node_modules/', 'snhaws-tech-docs/'],
  })
  .on('restart', () => {
    console.log('snhaws restarted!'); // eslint-disable-line no-console
  });
});

gulp.task('lint', () => gulp.src(paths.serverSrc).
  pipe(eslint()).
  pipe(eslint.format()).
  pipe(eslint.failAfterError())
);

// default task
gulp.task(
  'default',
  ['firstRun'].concat(
    jsDocRun.concat([
      'lint',
      'watch',
      'restart-snhaws',
    ])
  )
);
