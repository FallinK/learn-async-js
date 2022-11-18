// async function showAvatar() {
// 	let response = await fetch('./user.json');
// 	let user = await response.json();

// 	let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
// 	let githubUser = await githubResponse.json();

// 	let img = document.createElement('img');
// 	img.src = githubUser.avatar_url;
// 	img.className = "user-icon";
// 	document.body.appendChild(img);
	
// 	await new Promise ((resolve, reject) => setTimeout(resolve, 3000));
// 	img.remove();

// 	return githubUser;
// }

// showAvatar();

//__________________________________________________________________________

// function loadJson(url) {
//   return fetch(url)
//     .then(response => {
//       if (response.status == 200) {
//         return response.json();
//       } else {
//         throw new Error(response.status);
//       }
//     })
// }

async function loadJson(url) {
	let response = await fetch(url);
	if (response.status == 200) {
		return await response.json();
	}
	throw new Error (response.status);
}

loadJson('user.json')
.catch(alert);

//__________________________________________________________________________

class HttpError extends Error {
	constructor(response) {
		super(`${response.status} for ${response.url}`);
		this.name = 'HttpError';
		this.response = response;
	}
}

async function newLoadJson(url) {
	let response = await fetch(url);
	if (response.status == 200) {
		return await response.json();
	}
	throw new HttpError(response);
}

async function demoGithubUser() {
	let name = prompt('Введите логин', 'FallinK');
	
	try {
		let user = await newLoadJson(`https://api.github.com/users/${name}`);
		alert(`Полное имя: ${user.name}`);
		return user;
	}
	catch (err) {
		if (err instanceof HttpError && err.response.status == 404) {
			alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
			return demoGithubUser();
		}
		throw err;
	}
}

demoGithubUser();