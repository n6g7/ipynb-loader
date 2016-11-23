const cheerio = require('cheerio');
const childProcess = require('child_process');
const querystring = require('querystring');

const convertSync = (command) => childProcess.execSync(command);
const convertAsync = (command, cb) => childProcess.exec(
  command,
  { maxBuffer: 1024 * 1024 },
  cb
);

const getCellsOnly = (html) => cheerio.load(html)('#notebook-container').html();
const postProcess = (args, output) => args.cellsOnly ? getCellsOnly(output) : output;

module.exports = function(content) {
  const args = Object.assign(
    {
      cellsOnly: false,
      to: 'html'
    },
    querystring.parse(this.query.substring(1))
  );

  const command = `jupyter nbconvert --to ${args.to} ${this.resourcePath} --stdout`;
  const callback = this.async();

  if (!callback) return postProcess(args, convertSync(command));

  convertAsync(command, (err, stdout, stderr) => {
    if (err) return callback(err);
    callback(null, postProcess(args, stdout));
  });
};
