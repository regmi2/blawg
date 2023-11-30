import express from 'express'
import {db, connectToDB} from './db.js '



const app = express()
app.use(express.json())

app.get('/api/articles/:name', async (req,res) => {
	const {name} = req.params

    //get 
	//article grab 
	const article = await db.collection('articles').findOne({name})

    //send article back to client
	//use res.json() instead of res.send() to properly send headers
	if(article){
	res.json(article)
    } else {
        res.sendStatus(404)
    }




})

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    

	//run updateOne() function to update vote count
    await db.collection('articles').updateOne({ name }, { $inc: { upvotes: 1 }})
        
    
    //find the article
    const article = await db.collection('articles').findOne({ name })
    

    if (article) {
        res.json(article)
    } else res.send('This article does not exist')
    
})


app.post('/api/articles/:name/comments', async (req, res) => {
    const {name} = req.params
    const { postedBy, text } = req.body


	//run updateOne() function to push comment to comment array
    await db.collection('articles').updateOne(
        { name },
        {$push: {comments: {postedBy,text}}}
    )

    const article = await db.collection('articles').findOne({ name })
    
   
    if (article) {
        res.json(article)
    } else { res.send('That article does not exist') }
    
})

connectToDB(() => {
    console.log("DB connection successful");
    app.listen(8000, () => {
            console.log('Server listening on port 8K')
    })
})