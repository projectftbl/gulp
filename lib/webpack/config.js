var webpack = require('webpack-stream').webpack;

var development = 'development'
  , env = process.env.NODE_ENV || development;

module.exports = {
  entry: [ 'babel-polyfill', './lib/app.js' ]
, module: {
    loaders: [
      { 
        test: /\.(js|jsx)$/
      , exclude: /node_modules/
      , loader: 'babel'
      , query: {
          cacheDirectory: true
        , presets: [ 'react', 'es2015', 'stage-0' ]
        , plugins: [ 'transform-decorators-legacy' ]
        }
      }
    , { 
        test: /\.css$/
      , loader: 'css' 
      }
    , { 
        test: /\.json$/
      , loader: 'json' 
      }
    , { 
        test: /\.(png|jpg)$/
      , loader: 'url' 
      }
    , { 
        test: /\.md$/
      , loader: 'raw' 
      }
    ]
  , resolve: {
      extensions: [ '', '.js', '.json' ] 
    }
  }
, devtool: env === development ? '#eval-source-map' : null
, debug: env === development
, plugins: [ 
    new webpack.DefinePlugin({ __DEV__: env === development })
  , new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env) })
  , new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }})
  ]
};