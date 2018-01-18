const fs = require('fs');
const path = require('path');

/**
 * 检查文件类型
 * @param {string} fileType 文件类型
 * @param {string} type 允许的文件类型
 */
function fileTypeCheck(fileType, type) {
  return fileType.includes(type);
}

/**
 * 检查文件大小
 * @param {Integer} fileSize 文件大小
 * @param {Integer} size 允许的文件大小
 */
function fileSizeCheck(fileSize, size) {
  return fileSize < size * 1024 * 1024;
}

/**
 * 处理上传文件
 * @param {object} ctx
 * @param {string} params
 * @param {string} dir
 * @param {string} filename
 * @param {string=} type 文件类型
 * @param {Integer=} size 文件大小 单位mb
 */
async function saveFile(ctx, param, dir, filename, type = 'any', size = -1) {
  try {
    const file = ctx.request.body.files[param];
    if (type !== 'any') {
      const isOK = fileTypeCheck(file.type, type);
      if (!isOK) {
        return {
          isSuccess: false,
          data: `文件类型非${type}`,
        };
      }
    }
    if (size !== -1) {
      const isOK = fileSizeCheck(file.size, size);
      if (!isOK) {
        return {
          isSuccess: false,
          data: `文件不能超过${size}M`,
        };
      }
    }

    const ext = file.name.split('.')[1];
    const reader = fs.createReadStream(file.path);
    const fileDir = path.join(APP_PATH, dir);
    const stream = fs.createWriteStream(path.join(fileDir, `${filename}.${ext}`));
    reader.pipe(stream);
    console.log('uploading %s -> %s', file.name, stream.path);
    return {
      isSuccess: true,
      data: `${filename}.${ext}`,
    };
  } catch (err) {
    console.log(err);
    return {
      isSuccess: false,
      data: '上传失败',
    };
  }
}

module.exports = {
  saveFile,
};
