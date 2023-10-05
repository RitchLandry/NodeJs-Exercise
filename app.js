const express = require("express")
const mongoose = require("mongoose")
const Book = require("./models/book_list")
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))

// routes to access the api


// route to fetch books data
app.get("/books",async(req,res)=>{
    try {
        const books = await Book.find({})
        res.status(200).json(books)
        res.status(200).send("OK")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// route to fetch book data by id
app.get("/books/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// route to create book
app.post("/books",async(req,res)=>{
    try {
        const book = await Book.create(req.body)
        res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

// route to update book
app.put("/books/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const book = await Book.findByIdAndUpdate(id,req.body)
        if (!book) {
            return res.status(404).json({message:`no book found with the id ${id}`})
        }
        const updatedBook = await Book.findById(id)
        res.status(200).json(updatedBook)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

// route to delete a book
app.delete("/books/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const book = await Book.findByIdAndDelete(id)
        if (!book) {
            return res.status(404).json({message:`no book found to delete with id ${id}`})
        }
        res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})


mongoose.connect("mongodb+srv://landryritch:123456Admin@adminapi.0g4kyet.mongodb.net/").then(()=>{
    app.listen(3000,()=>{
        console.log("Server running");
    })
    
    console.log("connected")
}).catch((error)=>{
    console.log(error)
})
