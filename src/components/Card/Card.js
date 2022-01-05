import React from 'react'
import './style.css'

function Card({repo}) {
    return (
        <a href={repo.html_url} className="card">    
            <div className="card-hero">
                <img src={repo.image} width="288" />
            </div>
            <div className="card-header">
                <h3>{repo.name}</h3>
            </div>
            <div className="card-body">
                <p>{repo.description}</p>
            </div>
            <div className="card-footer">
                <div className="footer-item">
                    <img src={repo.owner.avatar_url} className="avatar" width="32" height="32" />
                </div>
                <div className="footer-item">
                    <strong>{repo.owner.login}</strong>
                </div>
            </div>
            <div className="card-footer-hidden">
                <div className="footer-item-hidden">
                    <img src={repo.owner.avatar_url} className="avatar" width="32" height="32" />
                </div>
            </div>
            {/* <a href={repo.homepage}></a> */}
        </a>
    )
}

export default Card;