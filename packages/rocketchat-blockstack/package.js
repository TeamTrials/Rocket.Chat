Package.describe({
	name: 'rocketchat:blockstack',
	version: '0.0.0',
	summary: 'Auth handler and utilities for Blockstack',
	git: '',
});

Package.onUse((api) => {

	api.use([
		'modules',
		'ecmascript',
		'localstorage',
		'session',
		'url',
		'http',
		'accounts-base',
		'service-configuration',
	]);

	api.use([
		'rocketchat:lib',
		'rocketchat:logger',
		'routepolicy',
		'webapp',
	], 'server');

	api.use([
		'kadira:flow-router',
		'mystor:device-detection',
		'templating',
		'less',
		'reload',
	], 'client');

	api.addFiles([
		'server/main.js',
		'server/routes.js',
		'server/settings.js',
		'server/tokenHandler.js',
		'server/userHandler.js',
		'server/loginHandler.js',
		'server/logoutHandler.js',
	], 'server');

	api.addFiles([
		'client/main.js',
		'client/routes.js',
	], 'client');

});