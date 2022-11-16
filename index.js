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


//response to the server
function loadJson(url) {
	return fetch(url)
	.then(response => response.json());
}

function loadUserGithub(name) {
	return fetch(`https://api.github.com/users/${name}`)
	.then(response => response.json());
}

function showAvatar(githubUser) {
	return new Promise(function(resolve, reject) {
		let img = document.createElement('img');
		img.src = githubUser.avatar_url;
		img.className = "user-icon";
		document.body.appendChild(img);
	
		setTimeout(() => {
			img.remove();
			resolve(githubUser);
		}, 3000);
	});
}

loadJson('./user.json')
.then(user => loadUserGithub(user.name))
.then(githubUser => showAvatar(githubUser))
.then(githubUser => {
	alert(`Закончили показ ${githubUser.name}`);
})