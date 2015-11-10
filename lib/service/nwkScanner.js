'use strict';

var Q = require('q'),
	_ = require('lodash'),
	ccBnp = require('ccbnp');

function NwkScanner () {
	if (_.isObject(NwkScanner.instance)) { return NwkScanner.instance; }
	NwkScanner.instance = this;

	var nwkInfo = {
		addr: 0,
		irk: 0,
		csrk: 0,
		linkParams: {
			connInterval: 0,
			connLatency: 0,
			connTimeout: 0
		}
	};

	this.adverDevs = [];
	this.addr = nwkInfo.addr;
}

NwkScanner.prototype.scan = function (callback) {
	var deferred = Q.defer(),
		devs;

	ccBnp.gap.deviceDiscReq(3, 1, 0).then(function (result) {
		devs = _.filter(_.last(result).GapDeviceDiscovery, function (val, key) {
			if (_.startsWith(key, 'dev')) { return val; }
		});
		deferred.resolve(devs);
	}).fail(function (err) {
		deferred.reject(err);
	}).done();

	return deferred.promise.nodeify(callback);
};

NwkScanner.prototype.setScanParam = function (callback) {

};

NwkScanner.prototype.getScanParam = function (callback) {

};

module.exports = NwkScanner;