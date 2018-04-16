const program = require('commander')
const json = require('./package.json')
const init = require('./lib/init')

program
  .version(json.version)
  .description('移动端rem项目脚手架')
  .option('-v', '版本号')

if (!process.argv.slice(2).length) {
  program.outputHelp()
} else if (process.argv.length === 3 && process.argv[2] === '-v') {
  console.info('version', json.version)
}

// 创建项目
program
  .command('init')
  .alias('c')
  .description('初始化项目')
  .option('-n, --name [name]', '项目英文名称')
  .option('-t, --type [type]', '项目类型：html(默认) ejs')
  .action(option => {
    init(option)
  })
  .on('--help', function() {
    console.info('  Examples:')
    console.info('')
    console.info('$ cre init --name [name]')
    console.info('$ cre c -n [name]')
  })

program.parse(process.argv)
