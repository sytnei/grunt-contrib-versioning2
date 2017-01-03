# grunt-contrib-versioning2

[Grunt][grunt] task to handle versioning of a project.

## Getting Started
_Requires grunt >=0.4.2. If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin by running the following command:

```bash
npm install grunt-contrib-versioning2 --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-contrib-versioning2');
```

## The "version" task

### Overview
In your project's Gruntfile, add a section named `versioning` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  versioning: {
        doc: 'index.html',
        files: {
        css: [],
        js: [],
        hastype : 'date'
     }
  }
})
```