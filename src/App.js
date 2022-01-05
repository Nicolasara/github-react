import React, { useState, useEffect } from 'react';
import { getAllReposByUsername, getUser } from './services/gitHub';
import './styles/button.css';
import './styles/form.css';

import Card from './components/Card/Card';

function App() {
  const [repos, setRepos] = useState([]);
  const [repoCount, setRepoCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("rrousselGit");
  const reposPerPage = 18;

  useEffect(() => {
    async function getData() {
      let response = await getAllReposByUsername(username, reposPerPage, currentPage);
      let user = await getUser(username);
      setRepoCount(user.public_repos)
      setRepos(groupArray(response, 3));
      setLoading(false);
    }
    getData();
  }, []);

  const next = async () => {
    console.log(repoCount, currentPage * reposPerPage)
    if (repoCount < currentPage * reposPerPage) {
      return;
    }
    console.log(currentPage);
    setCurrentPage(currentPage + 1);
    setLoading(true);
    let response = await getAllReposByUsername(username, reposPerPage, currentPage + 1);
    setRepos(groupArray(response, 3));
    setLoading(false);
  }

  const back = async () => {
    console.log(repoCount, currentPage * reposPerPage)
    if (currentPage == 1) {
      return;
    }
    console.log(currentPage);
    setCurrentPage(currentPage - 1);
    setLoading(true);
    let response = await getAllReposByUsername(username, reposPerPage, currentPage - 1)
    setRepos(groupArray(response, 3));
    setLoading(false);
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
      console.log(group);
    }
    console.log(results)
    return results;
  }

  const handleSubmition = async (newUsername) => {
    console.log("hello", newUsername);
    setLoading(true);
    let response = await getAllReposByUsername(username, reposPerPage, currentPage)
    console.log(response);
    setRepos(groupArray(response, 3));
    setLoading(false);
  }

  return (
    <div>
      { loading ? <h1>Loading..</h1> : (
        <div>
          <form onSubmit={handleSubmition}>
            <label>Github Username</label>
            <div className="input-container">
              <input value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     type="text"></input>
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
            <button onClick={next} className='button-flat'>next</button>
          </div>
        </div>
      )} 
    </div>
  );
}

export default App;
