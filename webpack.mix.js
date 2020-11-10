const path = require('path')
const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .postCss('resources/css/app.css', 'public/dist/css', [
        //
    ])
    .sass('resources/sass/adminlte.scss', 'public/dist/css')

mix
    .js('resources/js/adminlte.js', 'public/dist/js')
    .js('node_modules/popper.js/dist/popper.js', 'public/dist/js')


mix.sourceMaps(false)
if (mix.inProduction()) {
    mix.version()
}
mix.options({
    content: [
        "app/**/*.php",
        "resources/**/*.html",
        "resources/**/*.js",
        "resources/**/*.jsx",
        "resources/**/*.ts",
        "resources/**/*.tsx",
        "resources/**/*.php",
        "resources/**/*.vue",
        "resources/**/*.twig",
    ],
    defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
    whitelistPatterns: [/-active$/, /-enter$/, /-leave-to$/, /show$/],
});