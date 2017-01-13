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

var pkgcloud = require('pkgcloud');

module.exports = function(creds) {
	var config = {
		provider: 'openstack',
		useServiceCatalog: true,
		useInternal: false,
		keystoneAuthVersion: 'v3',
		authUrl: creds.auth_url,
		tenantId: creds.projectId,
		domainId: creds.domainId,
		username: creds.username,
		password: creds.password,
		region: creds.region
	};

	return {
		download: function(container, file, cbk) {
			var client = pkgcloud.storage.createClient(config);
			client.auth(function (error) {
				if(error) {
					console.error("Authorization error for storage client (pkgcloud): ", error);
				}
				else {
					var request = client.download({
						container: container,
						remote: file
					});
					
					cbk(request);
				}
			});
		}
	};
};
