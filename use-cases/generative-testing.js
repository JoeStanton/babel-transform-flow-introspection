import * as Exports from "./types";
import {setup} from "../flow-runtime/gen";

const {gen, genN} = setup(Exports) // The generator must be able to recursively generate types;

console.log(JSON.stringify(gen(Exports.LambdaContextType), null, 2));
console.log(JSON.stringify(gen(Exports.PropsType), null, 2));
console.log(JSON.stringify(gen(Exports.CardType), null, 2));
