var gulp = require('gulp')
var connect = require('gulp-connect')
var redirect = require('connect-redirection')

gulp.task('connect', function() {
  connect.server({
    root: __dirname,
    livereload: true,
    port: 3000,
    middleware: function(connect, opt){
      return [
        redirect(),
        function(req, res, next) {
          if (req.url === '/') {
            return res.redirect('http://localhost:3000/node_modules/intern/client.html?config=tests/intern')
          }
          next()
        }
      ]
    }
  })
})

gulp.task('test', function() {
  gulp.src('./node_modules/intern/client.html')
    .pipe(connect.reload())
})

gulp.task('watch', function() {
  gulp.watch(['./tests/unit/*.js'], ['test'])
})

gulp.task('default', ['connect', 'watch'])
