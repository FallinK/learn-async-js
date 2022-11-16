function loadScript (src) {
	return new Promise(function(resolve, reject) {
		let script = document.createElement('script');
		script.src = src;

		script.onload = (script) => resolve(script);
		script.onerror = (script) => {throw new Error(`Скрипт "${script.src}" не был загружен!`)};

		document.body.appendChild(script);
	});
}

loadScript('./one.js')
.then(script => loadScript('./two.js'))
.then(script => loadScript('./three.js'))
.then(script => {
	one();
	two();
	three();
})