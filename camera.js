const { exec } = require('mz/child_process');

// Take a picture in an async way and return it as a base64 encoded string
// Props: https://scottlinux.com/2012/09/01/encode-or-decode-base64-from-the-command-line/
module.exports = async ({ resolution = '640x480', rotate = 0 } = {}) => {
  const out = await exec(`fswebcam -r ${resolution} --rotate ${rotate} - | base64`, { maxBuffer: 1024 * 1024 });
  return out[0];
};
