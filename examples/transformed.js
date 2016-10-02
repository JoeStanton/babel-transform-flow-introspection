"use strict";

exports.__esModule = true;
var PropTypes = exports.PropTypes = {
  "type": "ObjectTypeAnnotation",
  "callProperties": [],
  "properties": [{
    "type": "ObjectTypeProperty",
    "key": {
      "type": "Identifier",
      "name": "label"
    },
    "value": {
      "type": "StringTypeAnnotation"
    },
    "optional": false
  }, {
    "type": "ObjectTypeProperty",
    "key": {
      "type": "Identifier",
      "name": "link"
    },
    "value": {
      "type": "GenericTypeAnnotation",
      "typeParameters": null,
      "id": {
        "type": "Identifier",
        "name": "Url"
      }
    },
    "optional": false
  }],
  "indexers": [],
  "exact": false
};
var UrlType = exports.UrlType = {
  "type": "UnionTypeAnnotation",
  "types": [{
    "type": "StringTypeAnnotation"
  }, {
    "type": "NullLiteralTypeAnnotation",
    "value": true
  }]
};

exports.default = function MenuItem(_ref) {
  var label = _ref.label;
  var link = _ref.link;
  return "<li href=\"" + link + "\">" + label + "</li>";
};

exports.default.__args = [PropTypes];
