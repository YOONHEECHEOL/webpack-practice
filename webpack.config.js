// 구성옵션을 작성하는 곳(필수)
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js', // js파일을 진입점으로 사용해야됨

  // 결과물(번들)을 반환하는 설정
  output: {
    // path, filename 은 디폴트값이 있음, 없어도 동작함
    // path: path.resolve(__dirname, 'dist'), // nodeJS에서 필요로하는 절대경로를 넣어야됨
    // filename: 'main.js',
    clean: true // 기존에 build 된 파일을 삭제하고 새로 생성함
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    })
  ],

  module: {
    rules: [
      {
        test: /\.s?css$/, // 정규표현식, .css 로 끝나는 문자를 찾는 내용
        use: [
          'style-loader', // css-loader의 결과물을 index.html에 삽입하는 모듈
          'css-loader', // JS파일에서 css를 해석할 수 있게 로드하는 모듈
          'postcss-loader',
          'sass-loader'
          // 밑에 모듈부터 순서대로 작동함
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },

  devServer: {
    host: 'localhost'
  }
}