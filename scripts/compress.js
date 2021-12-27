// const imagemin = require('imagemin')
const shell = require('shelljs');
const fs = require('fs');

const compress = (path) => {
  const files = await imagemin([path], {
    destination: 'build/images',
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  }).catch(err => {
    console.warn('[imagemin error]: ', err);
  })
  return files;
}

const run = (pathList) => {
  pathList.forEach(path => {
    const files = compress(path);
    fs.writeFileSync(path, files[0].data);
  })
}

//diff-filter: A - add, C - copy, R - rename, M - modify
const FILE_PATH = '.';
const GIT_DIFF_SHELL = `git diff --staged --diff-filter=A --name-only -z ${FILE_PATH}`;
const lines = shell.exec(GIT_DIFF_SHELL, { silent: true });

const reg = new RegExp('png|jpg|jpeg');
const imgPathList = lines ? lines.split('\x00').filter(item => {
  return reg.test(item);
}) : [];

run(imgPathList);
