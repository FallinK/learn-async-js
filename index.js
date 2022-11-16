window.addEventListener('unhandledrejection', function(event) {
	alert(event.promise);
	alert(event.reason);
});

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
.catch(error => {
	if (error instanceof URIError) {
		alert(`URIError: ${error.message}`)
	}
	else {
		throw error;
	}
})
.then(githubUser => showAvatar(githubUser))
.then(githubUser => {
	alert(`Закончили показ ${githubUser.name}`);
})
.catch(error => alert(`Неизвестная ошибка: ${error}`));