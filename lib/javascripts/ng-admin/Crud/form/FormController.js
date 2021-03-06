'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormController = function () {
    function FormController($scope, $state, $injector, $translate, previousState, WriteQueries, Configuration, progression, notification, view, dataStore) {
        _classCallCheck(this, FormController);

        this.$scope = $scope;
        this.$state = $state;
        this.$injector = $injector;
        this.$translate = $translate;
        this.previousState = previousState;
        this.WriteQueries = WriteQueries;
        this.dataStore = dataStore;
        this.progression = progression;
        this.notification = notification;
        this.title = view.title();
        this.description = view.description();
        this.actions = view.actions();
        this.fields = view.fields();
        this.config = Configuration();
        this.view = view;
        this.entity = this.view.getEntity();
        this.$scope.entry = dataStore.getFirstEntry(this.entity.uniqueId);
        this.$scope.view = view;
        this.$scope.entity = this.entity;

        // in case of entity identifier being modified
        this.originEntityId = this.$scope.entry.values[this.entity.identifier().name()];

        $scope.$on('$destroy', this.destroy.bind(this));
    }

    _createClass(FormController, [{
        key: 'validateEntry',
        value: function validateEntry() {
            var _this = this;

            if (!this.form.$valid) {
                this.$translate('INVALID_FORM').then(function (text) {
                    return _this.notification.log(text, { addnCls: 'humane-flatty-error' });
                });
                return false;
            }

            try {
                this.view.validate(this.$scope.entry);
            } catch (error) {
                this.notification.log(error, { addnCls: 'humane-flatty-error' });
                return false;
            }

            return true;
        }
    }, {
        key: 'submitCreation',
        value: function submitCreation($event) {
            var _this2 = this;

            $event.preventDefault();
            if (!this.validateEntry()) {
                return;
            }
            var entity = this.entity,
                view = this.view,
                $state = this.$state,
                progression = this.progression,
                notification = this.notification,
                $translate = this.$translate;

            var route = entity.showView().enabled ? 'show' : 'list';
            var restEntry = this.$scope.entry.transformToRest(view.fields());
            var entry = null;
            progression.start();
            this.WriteQueries.createOne(view, restEntry).then(function (rawEntry) {
                entry = view.mapEntry(rawEntry);
                return entry;
            }).then(function (entry) {
                return view.onSubmitSuccess() && _this2.$injector.invoke(view.onSubmitSuccess(), view, { $event: $event, entity: entity, entry: entry, route: route, controller: _this2, form: _this2.form, progression: progression, notification: notification });
            }).then(function (customHandlerReturnValue) {
                return customHandlerReturnValue === false ? new Promise(function (resolve) {
                    return resolve();
                }) : $state.go(_this2.$state.get(route), { entity: entity.name(), id: entry.identifierValue });
            }).then(function () {
                return progression.done();
            }).then(function () {
                return $translate('CREATION_SUCCESS');
            }).then(function (text) {
                return notification.log(text, { addnCls: 'humane-flatty-success' });
            }).catch(function (error) {
                var errorMessage = error.data.message || _this2.config.getErrorMessageFor(_this2.view, error) || 'ERROR_MESSAGE';
                var customHandlerReturnValue = view.onSubmitError() && _this2.$injector.invoke(view.onSubmitError(), view, { $event: $event, error: error, errorMessage: errorMessage, entity: entity, entry: entry, route: route, controller: _this2, form: _this2.form, progression: progression, notification: notification });
                if (customHandlerReturnValue === false) return;
                progression.done();
                $translate(errorMessage, {
                    status: error && error.status,
                    details: error && error.data && _typeof(error.data) === 'object' ? JSON.stringify(error.data) : {}
                }).catch(angular.identity) // See https://github.com/angular-translate/angular-translate/issues/1516
                .then(function (text) {
                    return notification.log(text, { addnCls: 'humane-flatty-error' });
                });
            });
        }
    }, {
        key: 'submitEdition',
        value: function submitEdition($event) {
            var _this3 = this;

            $event.preventDefault();
            if (!this.validateEntry()) {
                return;
            }
            var view = this.view,
                $state = this.$state,
                previousState = this.previousState,
                progression = this.progression,
                notification = this.notification,
                $translate = this.$translate;

            var restEntry = this.$scope.entry.transformToRest(view.fields());
            var entry = null;
            progression.start();
            this.WriteQueries.updateOne(view, restEntry, this.originEntityId).then(function (rawEntry) {
                entry = view.mapEntry(rawEntry);
                return entry;
            }).then(function (entry) {
                return view.onSubmitSuccess() && _this3.$injector.invoke(view.onSubmitSuccess(), view, { $event: $event, entity: _this3.entity, entry: entry, controller: _this3, form: _this3.form, progression: progression, notification: notification });
            }).then(function (customHandlerReturnValue) {
                if (customHandlerReturnValue === false) return;
                $state.go(previousState.name, previousState.params).then(function () {
                    return progression.done();
                }).then(function () {
                    return $translate('EDITION_SUCCESS');
                }).then(function (text) {
                    return notification.log(text, { addnCls: 'humane-flatty-success' });
                });
            }).catch(function (error) {
                var errorMessage = error.data.message || _this3.config.getErrorMessageFor(_this3.view, error) || 'ERROR_MESSAGE';
                var customHandlerReturnValue = view.onSubmitError() && _this3.$injector.invoke(view.onSubmitError(), view, { $event: $event, error: error, errorMessage: errorMessage, entity: _this3.entity, entry: entry, controller: _this3, form: _this3.form, progression: progression, notification: notification });
                if (customHandlerReturnValue === false) return;
                progression.done();
                $translate(errorMessage, {
                    status: error && error.status,
                    details: error && error.data && _typeof(error.data) === 'object' ? JSON.stringify(error.data) : {}
                }).catch(angular.identity) // See https://github.com/angular-translate/angular-translate/issues/1516
                .then(function (text) {
                    return notification.log(text, { addnCls: 'humane-flatty-error' });
                });
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.$scope = undefined;
            this.$state = undefined;
            this.$injector = undefined;
            this.$translate = undefined;
            this.previousState = undefined;
            this.WriteQueries = undefined;
            this.dataStore = undefined;
            this.view = undefined;
            this.entity = undefined;
        }
    }]);

    return FormController;
}();

exports.default = FormController;


FormController.$inject = ['$scope', '$state', '$injector', '$translate', 'previousState', 'WriteQueries', 'NgAdminConfiguration', 'progression', 'notification', 'view', 'dataStore'];
module.exports = exports['default'];
//# sourceMappingURL=FormController.js.map