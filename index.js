import serialize from "babel-literal-to-ast";

export default function ({types: t}) {
  function runtimeType(identifier, type) {
    const variable = t.variableDeclarator(
            t.identifier(`${identifier}Type`),
            serialize(type)
          );
   return t.variableDeclaration("const", [variable]);
  }

  function parse(typeDef) {
    delete typeDef["start"];
    delete typeDef["end"];
    delete typeDef["loc"];
    delete typeDef["extra"];

    if (typeDef["id"]) {
      typeDef["id"] = parse(typeDef["id"]);
    }
    if (typeDef["key"]) {
      typeDef["key"] = parse(typeDef["key"]);
    }
    if (typeDef["value"]) {
      typeDef["value"] = parse(typeDef["value"]);
    }

    if (typeDef["types"]) {
      typeDef["types"] = typeDef["types"].map(parse);
    }
    if (typeDef["properties"]) {
      typeDef["properties"] = typeDef["properties"].map(parse);
    }

    return typeDef;
  }

  return {
    visitor: {
      TypeAlias(path) {
        const identifier = path.node.id.name;
        const parsed = parse(path.node.right);
        const variable = runtimeType(identifier, parsed);

        path.replaceWith(
          t.exportNamedDeclaration(variable, [])
        );
      }
    }
  };
}
