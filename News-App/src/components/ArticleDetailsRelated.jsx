import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRelatedArticlesQuery } from "../api/NewsApi";
import Card from "./Card";

function ArticleDetailsRelated({ keyword }) {
  const [index, setIndex] = useState(0);
  const [instances, setInstances] = useState([]);
  const navigate = useNavigate();

  const nArticles = 4; // Número de artículos recomendados a mostrar
  const { data, error, isLoading } = useGetRelatedArticlesQuery(keyword);

  useEffect(() => {
    if (data && data.articles && data.articles.results) {
      const chunkSize = nArticles;
      const chunks = [];
      for (let i = 0; i < data.articles.results.length; i += chunkSize) {
        chunks.push(data.articles.results.slice(i, i + chunkSize));
      }
      setInstances(chunks);
    }
  }, [data]);

  const nextPage = () => {
    setIndex((prevIndex) => (prevIndex + nArticles) % data.articles.results.length);
  };

  const previousPage = () => {
    setIndex((prevIndex) => (prevIndex - nArticles + data.articles.results.length) % data.articles.results.length);
  };

  const handleCardClick = (articleUri) => {
    navigate(`/about/${articleUri}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading related articles</div>;
  }

  return (
    <div className="w-full flex flex-row justify-center gap-12 mb-4 mt-12">
      <div>
        <div className="w-full flex flex-row justify-center gap-12 mb-4 mt-12">
          <button className="p-3 px-8 bg-slate-300 rounded-lg" onClick={previousPage}>
            Prev
          </button>
          <button className="p-3 px-8 bg-blue-500 rounded-lg" onClick={nextPage}>
            Next
          </button>
        </div>
        {instances.length > 0 && (
          <div className="w-full flex flex-row justify-center">
            {instances[Math.floor(index / nArticles)].map((relatedArticle, idx) => (
              <div key={idx} onClick={() => handleCardClick(relatedArticle.uri)}>
                <Card
                  imagePath={relatedArticle.image || "https://via.placeholder.com/200"}
                  title={relatedArticle.title}
                  body={relatedArticle.body}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleDetailsRelated;