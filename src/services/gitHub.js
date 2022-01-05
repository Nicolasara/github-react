export async function getAllReposByUsername(username, pp, page) {
    let url = `https://api.github.com/users/${username}/repos?per_page=${pp}&page=${page}`;
    return getPromise(url);
}

export async function getUser(username) {
    let url = `https://api.github.com/users/${username}`
    return getPromise(url);
}

const getPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            resolve(data);
        });
    });
}