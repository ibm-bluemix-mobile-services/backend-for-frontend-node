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

var passport = require('passport'),
		MCAResourceStrategy = require('bms-mca-token-validation-strategy').MCAResourceStrategy;

module.exports = function(app, creds) {
	var options = {
		appId: creds.clientId,
		serverUrl: creds.serverUrl
	}
	
	passport.use(new MCAResourceStrategy(options));
	app.use(passport.initialize());

	return passport.authenticate('mca-resource-strategy', {session: false});
};
