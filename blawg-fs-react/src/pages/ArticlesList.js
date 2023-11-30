import React from 'react'
import articles from './article-content'
import ArticleListComp from '../components/ArticleListComp'


const ArticlesList = () => {
  return (
    <>
      <h1>Articles</h1>
      <ArticleListComp articles={articles} />
    </>
  )
}

export default ArticlesList