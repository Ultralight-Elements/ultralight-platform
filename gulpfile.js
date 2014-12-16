var gulp = require('gulp')
var browserSync = require('browser-sync')
var redirect = require('connect-redirection')

gulp.task('default', function() {
  browserSync({
    server: {
      baseDir: './',
      middleware: [
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
