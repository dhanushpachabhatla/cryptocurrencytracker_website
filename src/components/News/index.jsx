import React from 'react';
import "./styles.css";
import Button from '../Common/Button';
const NewsComponent = ({ newsdata }) => {
    return (
        <div className="newz">
            {newsdata.map((news, index) => (
                <div className="news-grid" key={index}>
                    <h3>{news.title}</h3>
                    <img src={news.logo} alt={`${news.name} logo`} className="news-image" />
                    <p>{news.description}</p>
                    <a href={news.url} target="_blank" rel="noopener noreferrer">
                        <Button text={"Read more"} ></Button>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default NewsComponent;
