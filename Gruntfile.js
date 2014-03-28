module.exports = function(grunt) {

	// load tasks
	require('load-grunt-tasks')(grunt);

	// configure tasks
	grunt.initConfig({
		packageInfo: grunt.file.readJSON('package.json'),
		zipup: {
			main: {
				appName: '<%= packageInfo.name %>',
				version: '<%= packageInfo.version %>',
				outDir: 'build',
				files: [
					{ cwd: 'src/', src: '**', expand: true, dest: 'app' },
					{ cwd: 'tools/nw/', src: '**', expand: true, dest: 'nw' },
					{ src: 'tools/start.bat', dest: '/start.bat' }
				],
				template: '{{appName}}-{{version}}.zip'
			}
		}
	});

	// register tasks
	grunt.registerTask('build', ['zipup:main']);

}