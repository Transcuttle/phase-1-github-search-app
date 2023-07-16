function handleForm(){
    document.querySelector('#github-form').addEventListener('submit', e => {
        e.preventDefault();
        loadUsers(e.target[0].value);
    })
}

function loadUsers(name){
    document.querySelector('#user-list').innerHTML = '';
    fetch(`https://api.github.com/search/users?q=${name}`)
    .then(res => res.json())
    .then(users => users.items.forEach(user => renderUser(user)))
}

function renderUser(user){
    const div = document.createElement('div');
    const h4 = document.createElement('h4');
    const button = document.createElement('button')
    const img = document.createElement('img');
    const a = document.createElement('a');

    div.setAttribute('id', `a${user.id}`);
    h4.textContent = user.login;
    button.textContent = 'See Repositories';
    button.addEventListener('click', e => showRepositories(e.target.previousSibling.textContent));
    img.setAttribute('src', user.avatar_url);
    img.setAttribute('alt', `${user.login}'s Avatar`);
    a.setAttribute('href', user.html_url);
    a.textContent = `${user.login}'s profile`;

    div.appendChild(h4);
    div.appendChild(button);
    div.appendChild(img);
    div.appendChild(a);


    document.querySelector('#user-list').appendChild(div);
}

function showRepositories(user){
    document.querySelector('#repos-list').innerHTML = '';
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(res => res.json())
    .then(repos => repos.forEach(repo => {
        const a = document.createElement('a');

        a.setAttribute('href', repo.html_url);
        a.textContent = repo.name;

        document.querySelector('#repos-list').appendChild(a);
    }))
}



document.addEventListener('DOMContentLoaded', handleForm);