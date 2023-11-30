import React, { useEffect, useState } from 'react'
import articles from './article-content'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound'
import axios from 'axios'
import CommentList from '../components/CommentListComp'
import AddCommentForm from '../components/AddCommentForm'


const Article = () => {

    const { articleId } = useParams();
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] })
    
    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`)
            const newArticleInfo = response.data
            setArticleInfo(newArticleInfo)
        }

        loadArticleInfo()

    }, [])
    
 
    const article = articles.find(article => article.name === articleId)

    if (!article) {
        return <NotFound />
    }

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`)
        const updatedArticle = response.data
        setArticleInfo(updatedArticle)
    }

  return (
      <>
          <h1>{article.title} </h1>
          <div className="upvotes-section">
                        <button onClick={addUpvote}>Upvote</button>
          <p>This article has {articleInfo.upvotes} upvote(s)</p>
          </div>

          {article.content.map((paragraph,i) => (
              <p key={i}>{paragraph}</p>
          ))}
          <AddCommentForm
              articleName={articleId}
              onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
          <CommentList comments={articleInfo.comments} />
      </>
  )
}

export default Article