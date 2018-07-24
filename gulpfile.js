var gulp = require('gulp'); //podpinamy gulpa
var browserSync = require('browser-sync'); //plugin do gulpa, aktualizuje widok w przegladarce
var sass = require('gulp-sass'); //preprocesor sassa
var sourcemaps = require('gulp-sourcemaps'); //pokazanie lini w scss w inspect, dodaje wpis do style.css
var autoprefixer = require('gulp-autoprefixer'); //automatyczne dodawanie prefixow w zaleznosci od zakresu przegladarek
var cleanCSS = require('gulp-clean-css'); //plugin minifikacji css
var uglify = require('gulp-uglify'); //plugin minifikacji js
var concat = require('gulp-concat'); //konkatenacja js i css
var imagemin = require('gulp-imagemin'); //optymalizacja obrazków
var changed = require('gulp-changed'); //optymalizacja obrazków, przetwarzanie tylko na zmienionych plikach
var htmlReplace = require('gulp-html-replace'); //optymalizacja html
var htmlMin = require('gulp-htmlmin'); //minifikacja html
var del = require('del'); //kasowanie folderu (dist)
var sequence = require('run-sequence'); //sekwencyjne uruchamianie tasków
var connectPHP = require('gulp-connect-php'); //serwer php do gulpa

var cfg = {
	dist		 : 'dist/',
	src			 : 'src/',
	cssin		 : 'src/css/**/*.css',
	jsin		 : 'src/js/**/*.js',
	imgin		 : 'src/img/**/*.{jpg,jpeg,png,gif,svg}',
	htmlin		 : 'src/*.html',
	scssin		 : 'src/scss/**/*.scss',
	cssout		 : 'dist/css/',
	jsout		 : 'dist/js/',
	imgout		 : 'dist/img/',
	htmlout		 : 'dist/',
	scssout		 : 'src/css/',
	cssoutname 	 : 'style.css',
	jsoutname 	 : 'scripts.js',
	cssreplaceout: 'css/style.css',
	jsreplaceout : 'js/scripts.js',
	phpin 		 : 'src/*.php',
	phpout 		 : 'dist/'
}



gulp.task('reload', function(){	//zadanie gulpa do przeladowania strony
	browserSync.reload();
});

gulp.task('sass', function(){
	return gulp.src(cfg.scssin)	//odczytanie plików scss z katalogu scss i nizej
		.pipe(sourcemaps.init()) //uruchomienie sourcemap
		.pipe(sass().on('error', sass.logError)) //uruchomienie preprocesora sassa na plikach z src/scss
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],	//kompatybilne przegladarki do projektu, http://browserl.ist/?q=last+3+versions
		}))
		.pipe(sourcemaps.write()) //zwrócenie aktualnej lini
		.pipe(gulp.dest(cfg.scssout)) //zapisanie wynikowego style.css do src/css/
		.pipe(browserSync.stream()); //strzyknięcie kodu css do przegladarki
});

gulp.task('serve', ['sass'], function() { //zadnie serve które też uruchamia zadanie sass
	/* browserSync({
		server: cfg.src // folder zaczytywany przez browserSync do localhost:3000
	}); */
	connectPHP.server({	base: cfg.src, port: 8010, keepalive: true },
		function(){	browserSync({ proxy: '127.0.0.1:8010' }) }
    );
	gulp.watch([cfg.htmlin, cfg.jsin, cfg.phpin], ['reload']); //sledzenie zmian w plikach html/js/php, jesli zmiana to przeladuje strone
	gulp.watch(cfg.scssin, ['sass']); //sledzenie zmian w plikach scss, jeśli zmiana to przekompiluje na css
});

gulp.task('default', ['serve']); //ustawienie zadania defaultowego na serve, uruchamiamy w terminaly wpisujac gulp




gulp.task('css', function(){	//zadanie gulpa do minifikacji css, uruchamiamy w terminalu: gulp css
	return gulp.src(cfg.cssin)	//pobranie plików css
		.pipe(concat(cfg.cssoutname)) //konkatenacja css
		.pipe(cleanCSS())	//minifikacja
		.pipe(gulp.dest(cfg.cssout)); //zapisujemy wynikowy css
});

gulp.task('js', function(){	//zadanie gulpa do minifikacji js, uruchamiamy w terminalu: gulp js
	return gulp.src(cfg.jsin)	//pobranie plików js
		.pipe(concat(cfg.jsoutname)) //konkatenacja js
		// .pipe(uglify({
		// 	mangle: {
	    //         except: ['$routeProvider','$window','$scope','$html','$location','$timeout','$sce','$interval'] //wykluczenia dla angulara
	    //     }
		// }))	//minifikacja
		.pipe(gulp.dest(cfg.jsout)); //zapisujemy wynikowy js
});

gulp.task('img', function(){	//zadanie gulpa do optymalizacji obrazków
	return gulp.src(cfg.imgin)	//rozszerzenia bez spacji
		.pipe(changed(cfg.imgout)) //folder dla obrazków
		.pipe(imagemin()) //optymalizacja
		.pipe(gulp.dest(cfg.imgout)); //zapisujemy obrazki
});

gulp.task('html', function(){	//optymalizacja html
	return gulp.src(cfg.htmlin)	//otwarcie plików html
		.pipe(htmlReplace({
			/* w wynikowym html zamieni linki do js/css między komentarzami na pliki podane jako ponizsza wartosc, (build:wlasciwoscObiektu)
			<!-- build:css -->	<!-- endbuild -->
			<!-- build:js -->	<!-- endbuild -->
			*/
			'css': cfg.cssreplaceout,	//scieżka z poziomu dist
			'js': cfg.jsreplaceout //scieżka z poziomu dist
		}))
		.pipe(htmlMin({
			sortAttributes: true, //sortowanie atrybutów znaczników
			sortClassName: true, //sortowanie klas w class=""
			collapseWhitespace: true, //kasowanie białych znaków
		}))
		.pipe(gulp.dest(cfg.dist));
});

gulp.task('php', function(){
	return gulp.src(cfg.phpin)
		.pipe(gulp.dest(cfg.phpout));
});

gulp.task('clean', function(){	//optymalizacja html
	return del([cfg.dist]); //tablica z folderami do usuniecia
});

gulp.task('build', function(){	//optymalizacja html
	sequence('clean', ['html','js','css','img','php','fonts']); //po zadaniu clean tablica z zadaniami
});

/*
gulp.task('others', function(){
	return gulp.src(cfg.src+'*.{md}')
		.pipe(gulp.dest(cfg.dist));
});
*/
gulp.task('fonts', function(){
	return gulp.src(cfg.src+'fonts/**/*')
		.pipe(gulp.dest(cfg.dist+'fonts/'));
});


/*mozliwe taski: 
=> gulp
gulp css
gulp js
gulp img
gulp html
gulp clean
=> gulp build
*/