const readDirDeep = require('read-dir-deep').sync
const gzipSize = require('gzip-size').sync
const prettyBytes = require('pretty-bytes')
const {table} = require('table')
const fs = require('fs')

const files = readDirDeep('./lib', {
  patterns: [
    // '**/*.umd.js',
    '**/*.umd.min.js',
    // '**/*.css',
    '**/*.min.css',
  ],
}).map(file => `lib/${file}`)

const filesize = files.map(file => {
  const content = fs.readFileSync(file)
  const size = content.length
  const gzip = gzipSize(content)
  return {
    file,
    size,
    gzip,
  }
})

function showFileInfo(arr) {
  const columns = {
    1: {
      aliignment: 'right',
    },
    2: {
      aliignment: 'right',
    },
  }
  const tableData = arr.map(row => [
    row.file,
    prettyBytes(row.size),
    prettyBytes(row.gzip),
  ])
  const tableHeader = ['file', 'size', 'gzip']
  const output = table([tableHeader, ...tableData], {
    columns,
  })
  console.log(output)
}

showFileInfo(filesize)
