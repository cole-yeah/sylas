const postcss = require('postcss');


const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

const WIDTH_UNIT = 'pw';
const HEIGHT_UNIT = 'ph';
const WIDTH_VIEWPORT = 'vw';
const HEIGHT_VIEWPORT = 'vh';

const VERTICAL = ['top', 'bottom', 'height', 'line-height'] // 垂直方向
const HORIZONTAL = ['left', 'right', 'width'] // 水平方向

const DEFAULT_OPTIONS = {
  width: BASE_WIDTH,
  height: BASE_HEIGHT, 
  vertical: VERTICAL,
  horizontal: HORIZONTAL,
}
const getRatio = (targetValue, originValue) => {
  return Number(((100 / originValue) * targetValue).toFixed(2));
}

const px2vw = (val, opts) => {
  return getRatio(val, opts.width)
}
const px2vh = (val, opts) => {
  return getRatio(val, opts.height)
}

const postcssViewportPlugin = postcss.plugin('viewport', function(options) {
  options = {
    ...DEFAULT_OPTIONS,
    ...(options || {})
  };
  return (css) => {
    css.walkRules((rule) => {
      rule.walkDecls((decl) => {
        if(decl.value.includes(HEIGHT_UNIT)) {
          const [val, unit] = decl.value.split(HEIGHT_UNIT);
          const cur = px2vh(val, options);
          decl.value = `${cur}${HEIGHT_VIEWPORT}` 
        }else if(decl.value.includes(WIDTH_UNIT)) {
          const [val, unit] = decl.value.split(WIDTH_UNIT);
          const cur = px2vw(val, options);
          decl.value = `${cur}${WIDTH_VIEWPORT}`
        }
      })
    })
  }
})

// const cssStyle = `
//   .test {
//     width: 100pw;
//     height: 200ph;
//     left: 10pw;
//   }
//   .player {
//     right: 10ph;
//     top: 80px;
//     color: red;
//   }
// `;

// postcss([postcssViewportPlugin()]).process(cssStyle).then((res) => {
//   console.log('xxxxx', res);
// })

module.exports = postcssViewportPlugin;