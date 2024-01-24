// Определяем переменную "preprocessor"
let preprocessor = 'sass'; // Выбор препроцессора в проекте - sass или less

// Определяем константы Gulp:
const { src, dest, parallel, series, watch } = require('gulp');
// Подключаем Browsersync
const browserSync = require('browser-sync').create();
// Подключаем gulp-concat
const concat = require('gulp-concat');
// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;
// Подключаем модули gulp-sass и gulp-less
const sass = require('gulp-sass')(require('sass'));
const less = require('gulp-less');
// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');
// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');
// Подключаем compress-images для работы с изображениями
const imagecomp = require('compress-images');
// Подключаем модуль gulp-clean (вместо del)
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const include = require('gulp-include');

function pages() {
	return src('src/pages/*.html')
		.pipe(include({
			includePaths: 'src/components'
		}))
		.pipe(dest('src'))
		.pipe(browserSync.stream())
}

function styles() {
	return src('src/' + preprocessor + '/style.' + preprocessor + '') // Выбираем источник: "src/sass/style.sass" или "src/less/style.less"
	// return src('src/' + preprocessor + '/*.' + preprocessor + '') // Выбираем источник - все файлы *.sass или .less, лежащие: "src/sass/*.sass" или "src/less/*.less"
	// .pipe(eval(preprocessor)().on('error', eval(preprocessor).logError)) // Для вывода ошибок
	.pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(concat('app.min.css')) // Конкатенируем в файл app.min.css
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest('src/css/')) // Выгрузим результат в папку "src/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

async function images() {
	imagecomp(
		"src/images/src/**/*", // Берём все изображения из папки источника
		"src/images/dest/jpg/", // Выгружаем оптимизированные изображения в папку назначения
		{ compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { // Обновляем страницу по завершению
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

async function imagess() {
	return src(['src/images/src/**/*.*', '!src/images/src/**/*.svg'])
		.pipe(newer('src/images/dest'))
		.pipe(avif({ quality: 50 }))

		.pipe(src('src/images/src/**/*.*'))
		.pipe(newer('src/images/dest'))
		.pipe(webp())

		// .pipe(src('src/images/src/*.*'))
		// .pipe(newer('src/images/dest'))
		// .pipe(imagemin())

		.pipe(dest('src/images/dest'))
}

function cleanimg() {
	return src('src/images/dest/', {allowEmpty: true}).pipe(clean()) // Удаляем папку "src/images/dest/"
}

function scripts() {
	return src([ // Берем файлы из источников
		'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
		'src/js/app.js', // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
		])
	.pipe(concat('app.min.js')) // Конкатенируем в один файл
	.pipe(uglify()) // Сжимаем JavaScript
	.pipe(dest('src/js/')) // Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

// Определяем логику работы Browsersync
function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: 'src/' }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
}

function startwatch() {
	// Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
	watch(['src/**/*.js', '!src/**/*.min.js'], scripts);
    // Мониторим файлы препроцессора на изменения
	watch('src/**/' + preprocessor + '/**/*', styles);
    // Мониторим файлы HTML на изменения
	watch('src/**/*.html').on('change', browserSync.reload);
    // Мониторим папку-источник изображений и выполняем images(), если есть изменения
	watch('src/images/src/**/*', images);
	watch('src/images/src/**/*', imagess);
	watch(['src/components/*', 'src/pages/*'], pages);
}

function buildcopy() {
	return src([ // Выбираем нужные файлы
		'src/css/**/*.min.css',
		'src/css/**/fonts.css',
		'src/js/**/*.min.js',
		'src/images/dest/**/*',
		'src/fonts/**/*',
		'src/**/*.html',
		], { base: 'src' }) // Параметр "base" сохраняет структуру проекта при копировании
	.pipe(dest('dist')) // Выгружаем в папку с финальной сборкой
}

function cleandist() {
	return src('dist', {allowEmpty: true}).pipe(clean()) // Удаляем папку "dist/"
}

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;
// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;
// Экспортируем функцию styles() в таск styles
exports.styles = styles;
// Экспорт функции images() в таск images
exports.images = images;
// Экспорт функции imagess() в таск imagess
exports.imagess = imagess;
// Экспортируем функцию cleanimg() как таск cleanimg
exports.cleanimg = cleanimg;
// Экспортируем функцию pages() как таск pages
exports.pages = pages;
// Создаем новый таск "build", который последовательно выполняет нужные операции
exports.build = series(cleandist, styles, scripts, images, imagess, buildcopy, cleandist, styles, scripts, images, imagess, buildcopy);

 
// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(styles, scripts, browsersync, pages, startwatch);
