const { isMemberExpression, isIdentifier, isCallExpression } = require('@babel/types')

function isStyled(id) {
  const tags = ['styled', 'css', 'createGlobalStyle', 'keyframes'];
  return tags.indexOf(id.name) >= 0;
}

function isStyledMember(member) {
  if (isIdentifier(member.object)) {
    return isStyled(member.object);
  } else if (isMemberExpression(member.object)) {
    return isStyledMember(member.object);
  }
  return false;
}

function isStyledTagged(tagged) {
  const tag = tagged.tag;
  if (isIdentifier(tag)) {
    return isStyled(tag);
  } else if (isMemberExpression(tag)) {
    return isStyledMember(tag);
  } else if (isCallExpression(tag)) {
    return isStyledFunction(tag);
  }
  return false;
}

const babelPluginViewport  = (babel) => {
  const templateVisitor = {
    TemplateElement(path) {
      console.log('xxxxxxxxxxxxxxxxxxxx', path.node.value)
      const it = path.node;
      if (it.value && it.value.raw) {
        it.value.raw = replace(it.value.raw);
      }
      if (it.value && it.value.cooked) {
        it.value.cooked = replace(it.value.cooked);
      }
    },
    // StringLiteral(path) {
    //   path.node.value = replace(path.node.value);
    // },
  };
  const visitor = {
    Program(path, state) {
      path.traverse({
        TaggedTemplateExpression(path, state) {
          if (isStyledTagged(path.node)) {
            path.traverse(templateVisitor);
          }
        }
      })
    }
  };
  return {
    name: 'babel-plugin-viewport',
    visitor
  }
}

module.exports = babelPluginViewport;