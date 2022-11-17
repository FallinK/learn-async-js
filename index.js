window.addEventListener('unhandledrejection', event => {
	alert(event.promise);
	alert(event.reason);
});

//___________________Promise.all___________________________
//---------------------------------------------------------

// Promise.all([
// 	new Promise(resolve => setTimeout(() => resolve(1), 3000)),
// 	new Promise(resolve => setTimeout(() => resolve(2), 2000)),
// 	new Promise(resolve => setTimeout(() => resolve(3), 1000)),
// ]).then(alert);

//---------------------------------------------------------

// let urls = [
//   'https://api.github.com/users/FallinK',
//   'https://api.github.com/users/alevshinskii',
//   'https://api.github.com/users/1a23123123',
//   'https://api.github.com/users/sA1mon'
// ];

// let requests = urls.map(url => fetch(url));

// Promise.all(requests)
// .then(responses => responses.forEach(
// 	response => alert(`${response.url}: ${response.status}`)
// ))

//---------------------------------------------------------

// let names = ['FallinK', 'alevshinskii', 'sA1mon'];

// let newRequests = names.map(name => fetch(`https://api.github.com/users/${name}`));

// Promise.all(newRequests)
// .then(responses => {
// 	responses.forEach(
// 	response => alert(`${response.url}: ${response.status}`)
// 	);
// 	return responses;
// })
// .then(responses => Promise.all(responses.map(response => response.json())))
// .then(users => users.forEach(user => alert(user.name)))
// .catch(error => alert(`Ошбика: ${error.message}`));

//---------------------------------------------------------

// Promise.all([
// 	new Promise((resolve,reject) => setTimeout(() => resolve(1), 3000)),
// 	new Promise((resolve,reject) => setTimeout(() => reject(new Error('Error!')), 2000)),
// 	new Promise((resolve,reject) => setTimeout(() => resolve(3), 1000)),
// ]).catch(alert);

//___________________Promise.allSelected___________________
//---------------------------------------------------------

// let urls = [
//   'https://api.github.com/users/FallinK',
//   'https://api.github.com/users/alevshinskii',
//   'https://bla.bla.com/1a23123123',
//   'https://api.github.com/users/sA1mon'
// ];

// let requests = urls.map(url => fetch(url));

// Promise.allSettled(requests)
// .then(responses => responses.forEach( (response, id) => {
// 		if (response.status == "fulfilled") {
// 			alert(`${urls[id]}: ${response.value.status}`);
// 		}
// 		if (response.status == "rejected") {
// 			alert(`${urls[id]}: ${response.reason}`);
// 		}
// 		console.log()
// 	}
// ))

//---------------------------------------------------------

//*****Polifil*****//
// if(!Promise.allSettled) {
//   Promise.allSettled = function(promises) {
//     return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
//       status: 'fulfilled',
//       value: value
//     }), error => ({
//       status: 'rejected',
//       reason: error
//     }))));
//   };
// }

//___________________Promise.race__________________________
//---------------------------------------------------------

// Promise.race([
// 	new Promise((resolve,reject) => setTimeout(() => resolve(1), 3000)),
// 	new Promise((resolve,reject) => setTimeout(() => reject(new Error('Error!')), 2000)),
// 	new Promise((resolve,reject) => setTimeout(() => resolve(3), 1000)),
// ]).then(alert);

//___________________Promise.any___________________________
//---------------------------------------------------------

// Promise.any([
// 	new Promise((resolve,reject) => setTimeout(() => resolve(1), 2000)),
// 	new Promise((resolve,reject) => setTimeout(() => reject(new Error('Error!')), 1000)),
// 	new Promise((resolve,reject) => setTimeout(() => resolve(3), 3000)),
// ]).then(alert);

//---------------------------------------------------------

// Promise.any([
// 	new Promise((resolve, reject) => setTimeout(() => reject(new Error('Первая ошибка')), 2000)),
// 	new Promise((resolve, reject) => setTimeout(() => reject(new Error('Вторая ошибка')), 1000)),
// ]).catch(error => {
// 	console.log(error.constructor.name);
// 	console.log(error.errors[0]);
// 	console.log(error.errors[1]);
// })

//_______________Promise.resolve/reject____________________
//---------------------------------------------------------

//*******Promise.resolve*******//
let cache = new Map();

function loadCached(url) {
	if(cache.has(url)) {
		return Promise.resolve(cache.get(url));
	}

	return fetch(url)
	.then(response => response.text())
	.then(text => {
		cache.set(url, text);
		return text;
	})
}

loadCached('https://api.github.com/users/FallinK')
.then(text => JSON.parse(text))
.then(user => alert(user.name));

//Resolve.reject работает аналогично