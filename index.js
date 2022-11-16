function loadScript(src, callback) {
	let script = document.createElement('script');
	script.src = src;
	script.onload = () => callback();
	document.head.append(script);
}

loadScript('./tmp.js', () => {
	printLog();
});