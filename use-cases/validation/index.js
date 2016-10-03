import * as Exports from "../types";

import {setup} from "../../flow-runtime/validation";
const {validate} = setup(Exports);

console.log(validate("Diamond", Exports.SuitType));
console.log(validate("Administrator", Exports.AdministratorType));
console.log(validate({
  "users": [
    {
      "id": 1,
      "firstName": "Joe",
      "lastName": "String",
      "role": "Administrator",
      "activated": false,
      "profilePic": {
        "url": "String",
        "width": 1,
        "height": 1
      }
    }
  ]
}, Exports.PropsType));
