# Sass: Syntactically Awesome Style Sheets &nbsp;&nbsp;[![Gem Version](https://badge.fury.io/rb/sass.png)](http://badge.fury.io/rb/sass)

[<img src="https://rawgit.com/sass/node-sass/master/media/logo.svg" width="250" height="220" align="right">](https://github.com/sass/node-sass)

Sass makes CSS fun again. Sass is an extension of CSS, adding nested rules, variables, mixins, selector inheritance, and more. It's translated to well-formatted, standard CSS using the command line tool or a web-framework plugin.

---------------------------------------

Sass has two syntax's. The new main syntax (as of Sass 3) is known as "SCSS" (for "Sassy CSS"), and is a superset of CSS's syntax. This means that every valid CSS stylesheet is valid SCSS as well. SCSS files use the extension `.scss`.

---------------------------------------

The second, older syntax is known as the indented syntax (or just "Sass"). Inspired by Haml's terseness, it's intended for people who prefer conciseness over similarity to CSS. Instead of brackets and semicolons, it uses the indentation of lines to specify blocks. Although no longer the primary syntax, the indented syntax will continue to be supported. Files in the indented syntax use the extension `.sass`.




# What is gulp?  [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![OpenCollective Backers][backer-badge]][backer-url] [![OpenCollective Sponsors][sponsor-badge]][sponsor-url] [![Gitter chat][gitter-image]][gitter-url]
[<img src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png" height="257" width="114" align="right">](http://gulpjs.com/)


- **Automation** - gulp is a toolkit that helps you automate painful or time-consuming tasks in your development workflow.
- **Platform-agnostic** - Integrations are built into all major IDEs and people are using gulp with PHP, .NET, Node.js, Java, and other platforms.
- **Strong Ecosystem** - Use npm modules to do anything you want + over 2000 curated plugins for streaming file transformations
- **Simple** - By providing only a minimal API surface, gulp is easy to learn and simple to use

## Documentation

For a Getting started guide, API docs, recipes, making a plugin, etc. check out our docs!

- Need something reliable? Check out the [documentation for the current release](/docs/README.md)!
- Want to help us test the latest and greatest? Check out the [documentation for the next release](https://github.com/gulpjs/gulp/tree/4.0)!

## Sample `gulpfile.js`

This file will give you a taste of what gulp does.

```js
var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
  scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
  images: 'client/img/**/*'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(coffee())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images']);
```


# Structure Files

```
  ├ css
  │ ├ fonts                    - fonts imported this project
  │ │
  │ ├ style.css(*)             — collected from the sass - css file of the this project file
  │ └ style.min.css(**)        — min style.css
  │ └ style.css.map(**)        — source map sass files
  │
  ├ dev
  │ ├ sass                     — sass - source style project
  │ │
  │ └ js
  │   ├ lib                    — library's/plugins
  │   │
  │   ├ jquery-1.11.1.min.js   — jquery
  │   └ production.js(**)      — collected in single file ['dev/js/jquery-1.11.3.min.js', 'dev/js/lib/*.js', 'js/common.js']
  │
  ├ images                     — images project
  │
  ├ js
  │ ├ common.js                — main js - file project
  │ ├ modernizr.js             — It’s a collection of tests – or “detects” as we like to call them – which run as your web page loads.
  │ ├ ie-detector.js           — IE detector js
  │ ├ libs.js(*)               — collected in single file ['dev/js/jquery-1.11.3.min.js', 'dev/js/lib/*.js']
  │ └ production.min.js(**)    — uglied 'dev/js/production.js'
  │
  ├ Gruntfile.js               - This file is used to configure or define tasks and load Grunt plugins.
  ├ package.json               - This file is used by npm to store metadata for projects published as npm modules.
  └ *.html(*)                  - generated html files this project
```

  > (&#8727;)&nbsp;&nbsp;&nbsp;&nbsp;- after Grunt compiled development task
  >
  > (&#8727;&#8727;)&nbsp;&nbsp;- after Grunt compiled production task

# Node and Grunt installation

---

Grunt is a command-line tool for managing task automation. There are already countless blog posts and tutorials explaining what it does and how to install it, so we’ll just briefly cover the installation process and then dive in to actually using it.

## Install NodeJS

First of all, you’ll need [NodeJS](https://nodejs.org/en/) which is a one-click install via the link.


	Install grunt-cli


Once you have Node installed, you’ll need to run the following command to install the grunt-cli globally. This gives you the command-line interface for grunt (that’s the cli part) and allows you to use the tool anywhere on your computer.

	npm install -g grunt-cli

If you’re on a mac/linux and that command fails, you may need to run it with `sudo`

	sudo npm install -g grunt-cli

# Sass installation

---

## On Windows
1. Install [Ruby](https://www.ruby-lang.org/en/installation/) 1.9.3 or 2.x.
This is a straight forward install and should pose no problems.
2. Restart computer.
3. Confirm that Ruby installed correctly. Open the Command Prompt window and type

```
ruby -v
```

at the command prompt. You should see the version number of your Ruby installation.
4. To install Sass on `Windows` open the Command Prompt and type:

```
gem install sass
```

You should see the following after Sass is successfully installed.

```
Fetching: sass-3.2.7.gem (100%)
Successfully installed sass-3.2.7
Parsing documentation for sass-3.2.7
Installing ri documentation for sass-3.2.7
Done installing documentation for sass (18 sec).
1 gem installed
```

---

## On Linux
1. Install [Ruby](https://www.ruby-lang.org/en/installation/) 1.9.3 or 2.x.
2. Confirm that Ruby installed correctly. Open the terminal and type

```
ruby -v
```

at the command prompt. You should see the version number of your Ruby installation.
3. To install Sass on `Linux` open the Terminal and type:

```
sudo gem install sass
```

---

## On OSX
1. [Ruby](https://www.ruby-lang.org/en/installation/) comes bundled in `OSX`

```
ruby -v
```

Your output should be similar to

```
ruby 2.0.0p645 (2015-04-13 revision 50299) [universal.x86_64-darwin15]
```

2. To install Sass on `OSX` open the Terminal and type:

```
sudo gem install sass
```
# gulp
