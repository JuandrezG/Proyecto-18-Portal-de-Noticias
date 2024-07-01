import { useEffect } from "react";
import { useGetTrendingHomeQuery } from "../api/NewsApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

const CardHome = () => {
  const [index, setIndex] = useState(0);

  const [page, setPage] = useState(1);

  const nArticles = 9; // Numver of articles to show

  // Funcion para mostrar los tres resultados siguientes
  const nextPage = () => {
    if (index < 99 - nArticles) {
      setIndex(index + nArticles);
    } else {
      setIndex(0);
      setPage(page + 1);
    }
  };

  // Funcion para mostrar los tres resultados anteriores
  const previousPage = () => {
    if (index === 0 && page === 1) {
      return;
    } else if (index >= nArticles) {
      setIndex(index - nArticles);
    } else {
      setIndex(99);
      setPage(page - 1);
    }
  };

  const [articles, setArticles] = useState([]);
  const { data, error, isLoading } = useGetTrendingHomeQuery({ page });

  useEffect(() => {
    console.log(data);
    setArticles(
      data?.recentActivityArticles.activity.slice(index, index + nArticles)
    );
  }, [isLoading, data, index, page]);
  console.log(articles);
  return (
    <>
      {articles !== undefined
        ? articles.map((article) => (
            <div>
              <div>
                <Link to={`/about/${article.uri}`} key={article.uri}> 
                  <section key={article.uri} className="flex flex-1">
                    <article className="shadow-lg mx-auto relative max-w-sm group cursor-pointer">
                      <div className="overflow-hidden">
                        <LazyLoad offset={50}>
                          <img
                            className="w-full h-auto transform hover:scale-110 duration-200"
                            src={article.image}
                            alt=""
                          />
                        </LazyLoad>
                      </div>
                      <div className="p-4 my-auto pb-8 overflow-hidden">
                        <p className="text-2xl font-semibold mt-2">
                          {article.title}
                        </p>
                      </div>
                    </article>
                  </section>
                </Link>
              </div>
            </div>
          ))
        : null}
      <button className="previousPage" onClick={previousPage}>
        previous
      </button>
      <button className="nextPage" onClick={nextPage}>
        next
      </button>
    </>
  );
};

export default CardHome;
