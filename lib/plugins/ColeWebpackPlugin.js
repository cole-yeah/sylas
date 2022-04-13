class ColeWebpackPlugin {
  constructor(opts) {
    this.opts = opts;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'ColeWebpackPlugin',
      (compilation, callback) => {
        console.log('compilation: ', compilation);
        callback();
      },
    );
  }
}

module.exports = ColeWebpackPlugin;
