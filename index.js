let promise = new Promise(function(resolve, reject) {
	setTimeout(() => resolve("done"), 1000);
});

// let promise = new Promise(function(resolve, reject) {
// 	setTimeout(() => reject(new Error("Error result")), 1000);
// });

promise.then (result => alert(result))
.catch(error => alert(error))
.finally(/*Метсто для остановки лоадеров, закрытия сессий и др.*/);