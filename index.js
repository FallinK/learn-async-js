// let promise = new Promise(function(resolve, reject) {
// 	setTimeout(() => resolve("done"), 1000);
// });

// // let promise = new Promise(function(resolve, reject) {
// // 	setTimeout(() => reject(new Error("Error result")), 1000);
// // });

// promise.then (result => alert(result))
// .catch(error => alert(error))
// .finally(/*Метсто для остановки лоадеров, закрытия сессий и др.*/);

function loadScript(src) {
	return new Promise (function (resolve, reject) {
		let script = document.createElement('script');
		script.src = src;

		script.onload = () => resolve(script);
		script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

		document.head.appendChild(script);
	});
}
let newPromise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

newPromise.then(
	script => alert(`${script.src} загружен!`),
	error => alert(`Ошибка: ${error.message}`)
);

newPromise.then(
	script => alert('Дополнительный обработчик')
);