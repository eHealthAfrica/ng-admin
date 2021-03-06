'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = translate;
function translate($translateProvider) {
  $translateProvider.translations('en', {
    'BACK': 'Back',
    'DELETE': 'Delete',
    'CREATE': 'Create',
    'EDIT': 'Edit',
    'EXPORT': 'Export',
    'ADD_FILTER': 'Add filter',
    'SEE_RELATED': 'See all related {{ entityName }}',
    'LIST': 'List',
    'SHOW': 'Show',
    'SAVE': 'Save',
    'N_SELECTED': '{{ length }} Selected',
    'ARE_YOU_SURE': 'Are you sure?',
    'YES': 'Yes',
    'NO': 'No',
    'FILTER_VALUES': 'Filter values',
    'CLOSE': 'Close',
    'CLEAR': 'Clear',
    'CURRENT': 'Current',
    'REMOVE': 'Remove',
    'ADD_NEW': 'Add new {{ name }}',
    'BROWSE': 'Browse',
    'N_COMPLETE': '{{ progress }}% Complete',
    'CREATE_NEW': 'Create new',
    'SUBMIT': 'Submit',
    'SAVE_CHANGES': 'Save changes',
    'BATCH_DELETE_SUCCESS': 'Elements successfully deleted',
    'DELETE_SUCCESS': 'Element successfully deleted',
    'ERROR_MESSAGE': 'Oops, an error occurred (code: {{ status }})',
    'INVALID_FORM': 'Invalid form',
    'CREATION_SUCCESS': 'Element successfully created',
    'EDITION_SUCCESS': 'Changes successfully saved',
    'ACTIONS': 'Actions',
    'PAGINATION': '<strong>{{ begin }}</strong> - <strong>{{ end }}</strong> of <strong>{{ total }}</strong>',
    'NO_PAGINATION': 'No record found',
    'PREVIOUS': '« Prev',
    'NEXT': 'Next »',
    'DETAIL': 'Detail',
    'STATE_CHANGE_ERROR': 'State change error: {{ message }}',
    'NOT_FOUND': 'Not Found',
    'NOT_FOUND_DETAILS': 'The page you are looking for cannot be found. Take a break before trying again.'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy(null);
}

translate.$inject = ['$translateProvider'];
module.exports = exports['default'];
//# sourceMappingURL=translate.js.map