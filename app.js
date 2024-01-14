const express = require('express');
const app = express ();
const {connectDB} = require('./database/database')
const Blog = require('./model/Blogmodel')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "http://localhost:5173"
}))

/*mongoose.connect("mongodb+srv://Pauline236:Paulwreck01@cluster0.tuhw3fg.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")
.then(()=>{
    console.log("Database connected successfully")
})*/    

connectDB() 

app.get('/', (req,res)=>{
    res.send("<h1>Home page</h1><br>Welcome to my homepage")
})
app.get('/blogs',async (req,res)=>{
    const blogs = await Blog.find()
    if(blogs.length==0){
        res.status(400).json({
            message : 'Empty blogs'
        })  
        }else{
    res.json({
        'status' : 200,
        blog : blogs
    })
    }})

app.get('/blogs/:id', async(req,res)=>{
   const id = req.params.id
   const blog = await Blog.find({_id : id})
   if(blog.length ==0){
    res.status(400).json({
        message : 'Could not find such blogs'
    })
   }else{
   // console.log(id)
   //console.log(req.params.id)
    res.status(200).json({
        message: 'done',
        data : blog
    })}
})
app.patch('/blogs/:id', async(req, res)=>{
    const id = req.params.id
    const title = req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description

    await Blog.findByIdAndUpdate(id,{
        title: title,
        subTitle: subTitle,
        description: description
    })
    res.status(200).json({
        message:'Blog updated successfully'
    })})

app.post('/createblog',async(req,res)=>{
   
   const title = req.body.title
   const subtitle = req.body.subTitle
   const description = req.body.description

   await Blog.create({
    title: title,
    subTitle: subtitle,
    description: description
    })
    res.json({
        "status" : 201,
        "message": "Blog created successfully"
    }) 
})

app.delete('/blogs/:id', async(req, res)=>{
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.status(200).json({
        message: "Blog deleted succesfully."
    })

})

app.listen(3000,()=>{
    console.log('Server is listening at port 3000')
})