import React, { useState, useEffect } from 'react';
import { getAllReposByUsername, getUser } from './services/gitHub';
import './styles/button.css';
import './styles/form.css';

import Card from './components/Card/Card';

function App() {
  const reposPerPage = 15;
  const [repos, setRepos] = useState([]);
  const [repoCount, setRepoCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("nicolasara");
  const [inputUsername, setInputUsername] = useState("")

  useEffect(() => {
    async function getData() {
      console.log(username, reposPerPage, page);
      let response = await getAllReposByUsername(username, reposPerPage, page);
      let user = await getUser(username);
      setRepoCount(user.public_repos)
      setRepos(groupArray(response, 3));
      setLoading(false);
    }
    getData();
  }, [username, page]);

  const next = async () => {
    console.log(repoCount, page * reposPerPage)
    if (repoCount < page * reposPerPage) {
      return;
    }
    console.log(page);
    setPage(page + 1);
  }

  const back = async () => {
    console.log(repoCount, page * reposPerPage)
    if (page === 1) {
      return;
    }
    console.log(page);
    setPage(page - 1);
  }

  const groupArray = (arr, n) => {
    let results = [];
    let arrLen = arr.length;
    for (let i = 0; i < Math.ceil(arrLen / n); i++) {
      let group = [];
      for (let j = 0; j < n; j++) {
        if (arr.length !== 0) {
          group.push(arr.shift());
        }
      }
      results.push(group);
    }
    return results;
  }

  const handleSubmition = async (event) => {
    event.preventDefault();
    setUsername(inputUsername);
  }

  const handleChange = async (event) => {
    setInputUsername(event.target.value);
  }

  return (
    <div>
      { loading ? <h1>Loading..</h1> : (
        <div>
          <form onSubmit={handleSubmition}>
            <label>Github Username</label>
            <div className="input-container">
              <input name="username" value={inputUsername} onChange={handleChange} type="text"></input>
            </div>
          </form>
          {repos.map((repoGroup, i) => {
            return (
              <div key={i} className="cards">
                {repoGroup.map((repo, j) => {
                  return (
                    <Card key={i * repoGroup.length + j} repo={repo}></Card>
                  )
                })}
              </div>
            )
          })}
          <div className="buttons-container">
            <button onClick={back} className='button-flat'>back</button>
            <h2 id="page-counter">{page}</h2>
            <button onClick={next} className='button-flat'>next</button>
          </div>
        </div>
      )} 
    </div>
  );
}

export default App;
