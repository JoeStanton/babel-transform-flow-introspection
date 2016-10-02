import range from "lodash.range";
import * as Exports from "../types";

const assertType = (type, input) => {
  const {valid, errors} = validateType(type, input);
  if (!valid) {
    throw new Error(`Type validation: ${errors}`);
  }
  return true;
}

const validate = (f, val, name) => {
  if (!f(val)) {
    return {
      valid: false,
      errors: `${JSON.stringify(val)} is not a ${name}`
    }
  }

  return {
    valid: true
  }
}
const validateString = (_, val) => validate(v => (typeof v === "string"), val, "string");
const validateNum = (_, val) => validate(v => (typeof v === "number"), val, "number");
const validateBool = (_, val) => validate(v => (v === true || v === false), val, "bool");

const validateArrayOf = (def, arr) => {
  const typeParam = def.typeParameters && def.typeParameters.params && def.typeParameters.params[0];

  if (!Array.isArray(arr)) {
    return {
      valid: false,
      errors: `${JSON.stringify(arr)} is not an array`
    };
  }

  if (typeParam && arr.map(x => validateType(typeParam, x).valid).indexOf(false) !== -1) {
    return {
      valid: false,
      errors: `One or more items in ${JSON.stringify(arr)} is an incorrect type`
    }
  }

  return {
    valid: true
  }
};
const validateVoid = (_, v) => v === void 8;
const validateLiteral = (def, val) => {
  if (val === def.value) {
    return { valid: true }
  }

  return {
    valid: false,
    errors: `${JSON.stringify(val)} is not equal to ${JSON.stringify(def.value)}`
  }
}

const validateUnion = (def, val) => {
  const values = def.types.map(x => x.value);

  if (values.indexOf(val) !== -1) {
    return { valid: true }
  }

  return {
    valid: false,
    errors: `${JSON.stringify(val)} is not one of: ${values.map(JSON.stringify).join(",")}`
  }
};

const validateObject = (def, obj) => {
  if (typeof obj !== "object") {
    return {
      valid: false,
      errors: `${JSON.stringify(obj)} is not an object`
    }
  }

  const props = def.properties.reduce((acc, prop) => {
    acc[prop.key.name] = validateType(prop.value, obj[prop.key.name]);
    return acc;
  }, {});

  const errors = Object.keys(props).filter(k => !props[k].valid)
                                   .reduce((acc, k) => acc.concat([`${k} : ${props[k].errors}`]), []);

  if (errors.length > 0) {
    return {
      valid: false,
      errors
    }
  }

  return {
    valid: true
  }
}

const validateGeneric = (def, object) => {
  const exportedName = def.id.name + "Type";

  if (Exports[exportedName]) {
    return validateType(Exports[exportedName], object);
  }

  if (validators[def.id.name]) {
    return validators[def.id.name](def, object);
  }

  throw new Error("No type declaration found for " + def.id.name);
};

const validators = {
  "ObjectTypeAnnotation": validateObject,
  "GenericTypeAnnotation": validateGeneric,
  "AnyTypeAnnotation": validateString,
  "MixedTypeAnnotation": validateString,
  "StringTypeAnnotation": validateString,
  "StringLiteralTypeAnnotation": validateLiteral,
  "NumericLiteralTypeAnnotation": validateLiteral,
  "NullLiteralTypeAnnotation": validateLiteral,
  "NumberTypeAnnotation": validateNum,
  "BooleanTypeAnnotation": validateBool,
  "UnionTypeAnnotation": validateUnion,
  "VoidTypeAnnotation": validateVoid,
  "Array": validateArrayOf,
}

const validateType = (type, input) => {
  return validators[type.type](type, input);
}

console.log(JSON.stringify(validateType(Exports.SuitType, "Diamond"), null, 2));
console.log(JSON.stringify(validateType(Exports.AdministratorType, "Administrator"), null, 2));
console.log(JSON.stringify(validateType(Exports.PropsType, {
  "users": [
    {
      "id": 1,
      "firstName": "Joe",
      "lastName": "String",
      "role": "Administrator",
      "activated": true,
      "profilePic": {
        "url": "String",
        "width": 1,
        "height": 1
      }
    }
  ]
}), null, 2));
