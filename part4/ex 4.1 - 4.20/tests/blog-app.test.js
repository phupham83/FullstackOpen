const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog")
const helper = require("../utils/test_helper")
const api = supertest(app)
const bcrypt = require('bcryptjs')

beforeEach(async () =>{
    await Blog.deleteMany({})
    
    const blogObjects = helper.blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})
test('correct amount of blogs returned', async () => {
  const response = await api.get("/api/blogs")
  expect(response.body).toHaveLength(helper.blogs.length)
})

test("id is the unique identifier of the blog posts", async () =>{
    const response = await helper.blogsInDb()
    expect(response.map(r => r.id)).toBeDefined()
})

test("blog post creation verification", async () =>{
    const newblog = {
        title: "test patterns",
        author: "test Chan",
        url: "https://testpatterns.com/",
        likes: 7,
    }

    await api.post("/api/blogs").send(newblog).expect(201).expect("Content-Type", /application\/json/)

    const response = await helper.blogsInDb()
    const titles = response.map( r => r.title)

    expect(response).toHaveLength(helper.blogs.length +1)
    expect(titles).toContain(
        "test patterns"
    )
})

test("likes default to 0", async () =>{
    const newblog = {
        title: "test patterns",
        author: "test Chan",
        url: "https://testpatterns.com/",
    }
    await api.post("/api/blogs").send(newblog).expect(201).expect("Content-Type", /application\/json/)
    const response = await helper.blogsInDb()
    expect(response[response.length -1].likes).toBe(0)
    expect(response).toHaveLength(helper.blogs.length +1)
})

test("appropriate response for missing title or url", async () =>{
    const newblog = {
        author: "test Chan",
        url: "https://testpatterns.com/",
        likes: 7
    }
    await api.post("/api/blogs").send(newblog).expect(400)
})

test("deletion verification", async () =>{
    await api.delete("/api/blogs/5a422a851b54a676234d17f7").expect(204)
    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.blogs.length - 1)
})

test("update verification", async () =>{
    const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 0,
    }
    const result = await api.put("/api/blogs/5a422a851b54a676234d17f7").send(newBlog).expect(200)
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'Mattti',
        name: 'Matti Luukkainen',
        password: 'sdasdasd',
      }
  
      const response = await api
        .post('/api/users')
        .send(newUser)
        console.log(response.error.text)
        
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  })

afterAll(() => {
  mongoose.connection.close()
})