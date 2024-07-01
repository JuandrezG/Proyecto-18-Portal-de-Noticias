import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const API_KEY = 'a5135f92-05f6-415a-ab3b-cbe237d78031'

export const NewsApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://eventregistry.org/api/v1/'
    }),

    endpoints: (builder) => ({
        getTrendingHome: builder.query({
            query: ({page}) => 
                `minuteStreamArticles?apiKey=${API_KEY}&page=${page}`
        }),

        searchArticle: builder.query({
            query: ({keyword, category, page}) => 
                `article/getArticles?keyword=${keyword}&apiKey=${API_KEY}&categoryUri=${category}&page=${page}`
        }),

        getRelatedArticles: builder.query({

            query: ({ keyword }) => `article/getArticles?keyword=${keyword}&apiKey=${API_KEY}`

        }),

        getArticle: builder.query({
            query: ({uri}) => 
                `article/getArticle?apiKey=${API_KEY}&articleUri=${uri}`
        })
    })
})


export const { useGetTrendingHomeQuery, useSearchArticleQuery, useGetRelatedArticlesQuery, useGetArticleQuery } = NewsApi;
