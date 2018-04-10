'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _adapter = require('./adapter');

var _adapter2 = _interopRequireDefault(_adapter);

var _utils = require('./../utils');

var _translations2 = require('./../translations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * angular-translate-extractor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://github.com/Boulangerie/angular-translate-extractor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015 "firehist" Benjamin Longearet, contributors
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var JsonAdapter = exports.JsonAdapter = function (_Adapter) {
  _inherits(JsonAdapter, _Adapter);

  function JsonAdapter(log, basePath) {
    var _this$params;

    _classCallCheck(this, JsonAdapter);

    var _this = _possibleConstructorReturn(this, (JsonAdapter.__proto__ || Object.getPrototypeOf(JsonAdapter)).call(this, log, basePath));

    _this.utils = new _utils.Utils({
      "basePath": basePath
    });

    _this.params = (_this$params = {
      lang: [],
      prefix: ''
    }, _defineProperty(_this$params, 'prefix', ''), _defineProperty(_this$params, 'suffix', '.json'), _defineProperty(_this$params, 'source', ''), _defineProperty(_this$params, 'defaultLang', '.'), _defineProperty(_this$params, 'stringifyOptions', null), _this$params);
    return _this;
  }

  _createClass(JsonAdapter, [{
    key: 'getDestFilename',
    value: function getDestFilename(language) {
      return _path2.default.resolve(this.basePath, _path2.default.join(this.params.dest, this.params.prefix + language + this.params.suffix));
    }
  }, {
    key: 'persist',
    value: function persist(translations) {
      var _this2 = this;

      // Build all output language files
      this.params.lang.forEach(function (language) {

        var destFilename = _this2.getDestFilename(language),
            filename = _this2.params.source,
            json = {};

        // Test source filename
        if (filename === '' || !_fs2.default.statSync(filename)) {
          filename = destFilename;
        }

        _this2.log.debug('Process ' + language + ' : ' + filename);

        var isDefaultLang = _this2.params.defaultLang === language;
        try {
          // Test if filename exists
          _fs2.default.statSync(filename);
          _this2.log.debug('File Exists. ' + destFilename);
          json = JSON.parse(_fs2.default.readFileSync(filename, { encoding: 'utf8' }));
        } catch (e) {
          _this2.log.debug('Create file: ' + destFilename + (isDefaultLang ? ' (' + language + ' is the default language)' : ''));
        }

        var _translations = translations.getMergedTranslations(_translations2.Translations.flatten(json), isDefaultLang);

        var stats = translations.getStats();
        var statEmptyType = translations.params.nullEmpty ? "null" : "empty";
        var statPercentage = Math.round(stats[statEmptyType] / stats["total"] * 100);
        statPercentage = isNaN(statPercentage) ? 100 : statPercentage;
        var statsString = "Statistics : " + statEmptyType + ": " + stats[statEmptyType] + " (" + statPercentage + "%)" + " / Updated: " + stats["updated"] + " / Deleted: " + stats["deleted"] + " / New: " + stats["new"];

        _this2.log.info(statsString);

        // Write JSON file for language
        _fs2.default.writeFileSync(_path2.default.resolve(_this2.basePath, destFilename), _this2.utils.customStringify(_translations, _this2.stringifyOptions) + '\n');
      });
    }
  }]);

  return JsonAdapter;
}(_adapter2.default);