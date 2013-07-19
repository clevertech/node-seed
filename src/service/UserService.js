var BaseClass = require(__dirname + '/Base')
  , Q = require('q')
  , UserService = null;

module.exports = function(db, models) {
	if (UserService === null) {
		UserService = BaseClass.extend({
			findById: function(id) {
				var deferred = Q.defer();
				models.User.find(id).success(deferred.resolve).error(deferred.reject)
				return deferred.promise
			},

			findAll: function(options) {
				options || {}
				var deferred = Q.defer();
				models.User.findAll().success(deferred.resolve).error(deferred.reject)
				return deferred.promise
			},

			find: function(options) {
				options || {}
				var deferred = Q.defer();
				models.User.findAll(options).success(deferred.resolve).error(deferred.reject)
				return deferred.promise
			},

			authenticate: function(credentials) {
				var deferred = Q.defer();
				
				/*
				var sql = "select * from \"Users\" where email = '" + credentials.username + "' \
							and password = contrib.crypt(id || '" + credentials.password + "', password);";
				this.query(sql).success(function(models) {
					models.length ? deferred.resolve(models[0]) : deferred.reject('Incorrect username/password');
				}).error(deferred.reject);
				*/
				
				// For now so the stub app works
				models.User.find({ where: credentials }).success(deferred.resolve).error(deferred.reject);

				return deferred.promise;
			}
		});

		UserService.instance = new UserService(db);
	}

	return UserService.instance;
}
