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

module.exports = function(Product) {
	Product.remoteMethod (
		'image',
		{
			description : 'Returns the image stored in Object Storage.',
			http: {path: '/image/:container/:file', verb: 'get'},
			accepts: [{arg: 'container', type: 'string'}, {arg: 'file', type: 'string'}],
			returns: [{arg: 'image', type: 'string'}],
		}
	);
	Product.remoteMethod (
		'protected',
		{
			description : 'Protected endpoint. Only accessible after authentication with MCA Service.',
			http: {path: '/protected', verb: 'get'},
			returns: [{arg: 'message', type: 'string'}],
		}
	);
};
