import * as path from 'path';
import * as fs from 'fs-extra';
import requireFromString = require('require-from-string');
import * as typescript from 'typescript';
import WebpackDevServer = require('webpack-dev-server');
import webpack = require('webpack');

const createLogger = require('logging');

export const webpackConfig: string = path.join(process.cwd(), 'webpack.config.ts');
export const webpackTSConfig: string = path.join(process.cwd(), 'webpack', 'tsconfig.json');
export const transpiledWebpackConfig = requireFromString(typescript.transpileModule(fs.readFileSync(webpackConfig, { encoding: 'utf-8' }), {
    compilerOptions: require(webpackTSConfig)
}).outputText)['default'];

export const startWebpackDevServer = (listening: () => void) => {
    const log = createLogger.default('Webpack Dev Server');

    new WebpackDevServer(webpack({
        ...transpiledWebpackConfig,
        devServer: {
            host: 'localhost',
            port: 19132,
            https: true,
            socket: 'socket',
            public: 'localhost:19132',
            publicPath: path.join(process.cwd(), 'dist'),
            stats: {
                chunks: false
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        },
        mode: 'development',
    })).listen(19132, 'localhost', err => {
        if (err) log.error(err);
    }).once('listening', listening);
}

export const buildWithWebpack = (mode: 'development' | 'production', finishedBuilding: () => void) => {
    const log = createLogger.default('Webpack');
    log.info("Building JS bundles with Webpack");

    webpack({
        ...transpiledWebpackConfig,
        mode: mode
    }, (err, stats) => {
        if (err || stats.hasErrors()) {
            log.error(err)
        }

        log.info("Finished building JS bundles with Webpack");
        finishedBuilding();
    })
}