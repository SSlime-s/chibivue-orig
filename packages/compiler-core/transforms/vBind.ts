import { NodeTypes, createObjectProperty } from "../ast";
import { DirectiveTransform } from "../transform";

export const transformBind: DirectiveTransform = (dir, _node, _context) => {
  const { exp } = dir;
  const arg = dir.arg!;

  if (arg.type !== NodeTypes.SIMPLE_EXPRESSION) {
    arg.children.unshift(`(`);
    arg.children.push(`) || ""`);
  } else if (!arg.isStatic) {
    arg.content = `${arg.content} || ""`;
  }

  return {
    // TODO: error handling when exp is undefined
    props: [createObjectProperty(arg, exp!)],
  };
};
