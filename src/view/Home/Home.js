import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import toast from "react-hot-toast";
import NewsCard from "./../../component/NewsCard/NewsCard.js";

const Home = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("entertainment");

  // toast.loading("News Loading......");

  const loadNews = async () => {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&category=${search}&apiKey=${process.env.REACT_APP_API_KEY}`
    );

    setNews(response.data.articles);
  };

  // toast.dismiss();
  // toast.success("News Loaded Succesfully.");

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    loadNews();
  }, [search]);

  return (
    <div>
      <div className="inputbox">
        <p>News App</p>

        <input
          type="text"
          placeholder="search...."
          value={search}
          className="input"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      {news.map((newNews, i) => {
        const { author, title, description, url, urlToImage, publishedAt } =
          newNews;

        return (
          <NewsCard
            key={i}
            author={author}
            title={title}
            description={description}
            url={url}
            urlToImage={urlToImage}
            publishedAt={publishedAt}
          />
        );
      })}
    </div>
  );
};

export default Home;
