function loadScript(src, callback) {
	let script = document.createElement('script');
	script.src = src;

	script.onload = () => callback(null, script);
	script.onerror = () => callback (new Error(`Ошибка загрузки скрипта ${src}`));

	document.head.append(script);
}

loadScript('./tmp.js', () => {
	printLog();
});