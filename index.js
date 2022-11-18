function promisify(f, manyArgs = false) {
	return function(...args) {
		return new Promise((resolve, reject) => {
			function callback(err, ...results) {
				if(err) reject(err)
				else resolve(manyArgs ? results : results[0]);

			}
			args.push(callback);

			f.call(this, ...args);
		})
	}
}


function loadScript(src, callback) {
	let script = document.createElement('script');
	script.src = src;
	
	script.onload = () => callback(null, script);
	script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`), script);

	document.head.append(script);
}

let newLoadScriptPromise = promisify(loadScript);
newLoadScriptPromise('./tmp.js').then(
	script => printLog(script),
	err => alert(err.message)
);


// let loadScriptPromise = function(src) {
// 	return new Promise((resolve, reject) => {
// 		loadScript(src, (err, script) => {
// 			if(err) reject(err)
// 			else resolve(script);
// 		})
// 	})
// }
// loadScriptPromise('./tmp1.js').then(
// 	script => printLog(script),
// 	err => alert(err.message)
// );
