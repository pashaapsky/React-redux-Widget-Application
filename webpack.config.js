const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    //папка main файла .js
    entry: './src/index.js',

    //папка куда собираем и название файла
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'build'),
    },


    //правила для модулей
    module: {
        rules: [
            //создание новой html страницы
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {minimize: true},
                    }
                ]
            },

            //транспиляция babel + файл .babelrc
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },

            //загрузка img
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        }
                    }
                ]
            },

            //экспорт файлов .css привязанных к index.js через import или link
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,  //создает общий файл стилей css
                    'css-loader'
                ],
            },
        ]
    },
    plugins: [
        //плагин для создания новой html страницы
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),

        //плагин для создания нового общего css файла из всех
        new MiniCssExtractPlugin(),
    ]
    //стартовая папка webpack-dev-server
    // devServer: {
    //     contentBase: 'src/',
    // },
};