/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var assert = require('chai').assert,
    superagent = require('superagent'),
    app = require('../../server/server');

var expected = require('../../data/cloudant/products.json');
describe('cloudant', function()  {
	var server;
	beforeEach(function(done) {
		server = app.listen(done);
	});

	afterEach(function(done) {
		server.close(done);
	});

	it('should return a list of products', function(done) {
		var url = 'http://localhost:3000/api/Products',
			headers;
		superagent
			.get(url)
			.end(function (err, res){
				if(err){
					console.log(err.status);
					done(err);
				} else {
						headers = res.headers;

						assert.equal(res.statusCode, 200);
						assert.equal(JSON.stringify(res.body.length), JSON.stringify(expected.docs.length));
						done();
					}
			});
    });
});

describe('object-storage', function()  {
	var server;
  this.timeout(5000);
	beforeEach(function(done) {
		server = app.listen(done);
	});

	afterEach(function(done) {
		server.close(done);
	});

	it('should get a jpg from object storage', function(done) {
		var url = 'http://localhost:3000/api/Products/image/clothes/neck-tie.jpg',
			headers;
		superagent
			.get(url)
			.end(function (err, res){
				if(err){
					console.log(err.status);
					done(err);
				} else {
						headers = res.headers;

						assert.equal(res.statusCode, 200);
						assert.ok(headers['content-type']);
						assert.equal(headers['content-type'], 'image/jpeg');
						done();
					}
			});
    });
});

describe('mobile-client-access', function()  {
	var server;
	beforeEach(function(done) {
		server = app.listen(done);
	});

	afterEach(function(done) {
		server.close(done);
	});

	it('should return unauthorized', function(done) {
		var url = 'http://localhost:3000/api/Products/protected',
			headers;
		superagent
			.get(url)
			.end(function (err, res) {
				assert.equal(res.statusCode, 401);
				done();
			});
	});
});
