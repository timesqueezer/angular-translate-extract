'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Adapter = function () {
  function Adapter(log, basePath) {
    _classCallCheck(this, Adapter);

    this.log = log;
    this.basePath = basePath;
  }

  _createClass(Adapter, [{
    key: 'init',
    value: function init(params) {
      this.params = _lodash2.default.defaults(params, this.params);

      try {
        this.log.debug('Init PodAdapter', this.params.dest, this.params.prefix, this.params.suffix);
      } catch (e) {}
    }
  }, {
    key: 'persist',
    value: function persist() {
      throw new Error('Must be implemented');
    }
  }]);

  return Adapter;
}();

exports.default = Adapter;