/*
 * Copyright 2016 IBM Corp.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var pkg = require('./../package.json'),
		loopback = require('loopback'),
		boot = require('loopback-boot'),
		colors = require('colors'),
		logger = require('winston');

console.log(require('bluemix-logo'));
logger.info('*** ' + pkg.name + ' ***');
logger.info('Version: ' + colors.green(pkg.version));
logger.info('Description: ' + pkg.description + '\n');

var port = (process.env.VCAP_APP_PORT || 3000),
		host = (process.env.VCAP_APP_HOST || 'localhost'),
		app = module.exports = loopback();

app.start = function () {
	return app.listen(function () {
		app.emit('started');

		var baseUrl = app.get('url').replace(/\/$/, '');
		console.log('Web server listening at: %s', baseUrl);
		var componentExplorer = app.get('loopback-component-explorer');
		if (componentExplorer) {
			console.log('Browse your REST API at %s%s', baseUrl, componentExplorer.mountPath);
		}
	});
};

// bootstrap the application, configure models, datasources and middleware
// sub-apps like REST API are mounted via boot scripts
boot(app, __dirname, function (err) {
	if (err) throw err;
	if (require.main === module)
		app.start();
});
