const path = require('path')
const rootPath = path.resolve(process.cwd())
const buildPath = path.join(rootPath, 'build')
const publicBuildPath = path.join(buildPath, 'public')

module.exports = {
  rootPath,
  buildPath,
  publicBuildPath,
  publicSrcPath: path.join(rootPath, 'public'),
  serverSrcPath: path.join(rootPath, 'src'),
  serverBuildPath: buildPath,
  userNodeModulesPath: path.join(rootPath, 'node_modules'),
  publicPath: '/',
  serverUrl: 'http://localhost:3000'
}
