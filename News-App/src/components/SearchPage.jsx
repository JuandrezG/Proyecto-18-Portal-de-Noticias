
import React, { useState, useEffect, useCallback } from "react";
import { useSearchArticleQuery } from "../api/NewsApi";
import { NEWS_CATEGORIES } from "../constants/categories";
import Card from "./Card";
import { Link } from 'react-router-dom';
import { useTheme } from "./ThemeContext.jsx";


function CategorySelection({ setCategory, categories }) {
  const { isDarkMode } = useTheme();
  return (
    <select
      className={`${
        isDarkMode
          ? "text-slate-200 bg-slate-800 transition duration-200"
          : "bg-white text-slate-850 transition duration-200"
      } m-3 h-10 rounded-xl w-30 p-2`}
      name="category"
      id="category"
      onChange={(e) => setCategory(e.target.value)}
    >
      {categories.map((category) => (
        <option
          className="w-[200px] rounded-md border border-input bg-background px-4 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          value={category.uri}
          key={category.uri}
        >
          {category.label.replace(/(dmoz\/)|(news\/)/, "")}
        </option>
      ))}
    </select>
  );
}

function SearchBar({ setSearchResults, searchTerm, setSearchTerm }) {
  const { isDarkMode } = useTheme();
  return (
    <>
      <input
        className={`bg-gray-200 shadow rounded w-96 pl-3 h-10 ${
          isDarkMode
            ? "text-slate-200 bg-slate-800 transition duration-200"
            : "bg-white text-slate-850 transition duration-200"
        }`}
        placeholder="Write something"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-gray-900 text-white m-3 p-2 flex justify-center items-center rounded                                  "
        onClick={setSearchResults}
      >
        Search
      </button>
    </>
  );
}

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const [index, setIndex] = useState(0);

  const [page, setPage] = useState(1);

  const nArticles = 9;

  const { isDarkMode } = useTheme();

  // Funcion para mostrar los tres resultados siguientes
  const nextPage = () => {
    if (index <= 99 - nArticles) {
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

  const { data, error, isLoading } = useSearchArticleQuery({
    searchTerm,
    category,
    page,
  });

  // const handleSetSearchResults = useCallback() => { // Linea cambiada para implementar paginado
  const handleSetSearchResults = useEffect(() => {
    if (!isLoading && data && data.articles.results) {
      setSearchResults(data.articles.results.slice(index, index + nArticles));
    } else {
      setSearchResults([]); // reset search results
    }
  }, [data, index, page]);

  return (
    <>
      <div
        className={`flex justify-center items-center ${
          isDarkMode
            ? "text-slate-200 bg-slate-800 transition duration-200"
            : "bg-white text-slate-850 transition duration-200"
        }`}
      >
        <h1 className="text-xl font-bold mb-4 mt-4 mr-2"> Filters</h1>
        <CategorySelection
          setCategory={setCategory}
          categories={NEWS_CATEGORIES}
        />
        <SearchBar
          className="flex"
          setSearchResults={handleSetSearchResults}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data?.articles?.results && (
        <SearchResults results={data.articles.results} />
      )}
    </>
  );
}

function SearchResults({ results }) {
  const [category, setCategory] = useState("");
  const { data, error, isLoading } = useSearchArticleQuery({ category });
  const { isDarkMode } = useTheme();

  // Funcion para mostrar los tres resultados anteriores
  const previousPage = () => {
    if (index === 0 && page === 1) {
      return;
    } else if (index > 2) {
      setIndex(index - 3);
    } else {
      setIndex(99);
      setPage(page - 1);
    }
  }
    return (
        <div className="grid grid-cols-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-10 max-w-screen-2xl m-auto col-span-3">
             {results && results.map((result) => (
               <div key = {result.uri} >
                <Link to={`/about/${result.uri}`} key={result.uri}>
                 <Card
                 title= {`${result.title}`}
                 imagePath= {`${result.image}`}
                 body={null} />
                </Link>
               </div>   
               ))}
           </div>
        </div>
    );

}


export default SearchPage;