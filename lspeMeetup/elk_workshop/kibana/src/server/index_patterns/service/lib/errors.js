'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEsIndexNotFoundError = isEsIndexNotFoundError;
exports.createNoMatchingIndicesError = createNoMatchingIndicesError;
exports.isNoMatchingIndicesError = isNoMatchingIndicesError;
exports.convertEsError = convertEsError;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ERR_ES_INDEX_NOT_FOUND = 'index_not_found_exception';
const ERR_NO_MATCHING_INDICES = 'no_matching_indices';

/**
 *  Determines if an error is an elasticsearch error that's
 *  describing a failure caused by missing index/indices
 *  @param  {Any}  err
 *  @return {Boolean}
 */
function isEsIndexNotFoundError(err) {
  return (0, _lodash.get)(err, ['body', 'error', 'type']) === ERR_ES_INDEX_NOT_FOUND;
}

/**
 *  Creates an error that informs that no indices match the given pattern.
 *
 *  @param  {String} pattern the pattern which indexes were supposed to match
 *  @return {Boom}
 */
function createNoMatchingIndicesError(pattern) {
  const err = _boom2.default.notFound(`No indices match pattern "${pattern}"`);
  err.output.payload.code = ERR_NO_MATCHING_INDICES;
  return err;
}

/**
 *  Determins if an error is produced by `createNoMatchingIndicesError()`
 *
 *  @param  {Any} err
 *  @return {Boolean}
 */
function isNoMatchingIndicesError(err) {
  return (0, _lodash.get)(err, ['output', 'payload', 'code']) === ERR_NO_MATCHING_INDICES;
}

/**
 *  Wrap "index_not_found_exception" errors in custom Boom errors
 *  automatically
 *  @param  {[type]} indices [description]
 *  @return {[type]}         [description]
 */
function convertEsError(indices, error) {
  if (isEsIndexNotFoundError(error)) {
    return createNoMatchingIndicesError(indices);
  }

  if (error.isBoom) {
    return error;
  }

  const statusCode = error.statusCode;
  const message = error.body ? error.body.error : undefined;
  return _boom2.default.wrap(error, statusCode, message);
}
