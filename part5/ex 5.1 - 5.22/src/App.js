import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Blogform from "./components/Blogform"
import Togglable from "./components/Togglable"
const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(async () => {
        const blogs = await blogService.getAll()
        setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    }, [])
    useEffect(async () => {
        const loggedUserJSON = await window.localStorage.getItem("loggedBlogappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])
    const getAndSort = (async () => {
        const blogs = await blogService.getAll()
        setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    })
    const Notifcation = ({ message }) => {
        if (message === null){
            return null
        }
        return (
            <div>{message}</div>
        )
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                "loggedBlogappUser", JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
        } catch (exception) {
            setMessage("wrong username or password")
            setTimeout(() => setMessage(null), 5000)
        }
    }
    const handleLogout = async (event) => {
        event.preventDefault()
        setUser(null)
        window.localStorage.clear()
    }
    const handleCreate = async (blog) => {
        try {
            noteFormRef.current.toggleVisibility()
            await blogService.create(blog)
            getAndSort()
            setMessage(`a new blog ${blog.title} by ${blog.author} added`)
            setTimeout(() => setMessage(null), 5000)
        } catch (e) {
            console.log(e)
            console.log(blog)
            console.log(user.token)
        }


    }
    const noteFormRef = useRef()

    const handleUpdate = async (id, blog) => {
        try {
            await blogService.update(id, blog)
            getAndSort()
            setMessage(`Liked the blog ${blog.title}`)
            setTimeout(() => setMessage(null), 5000)
        } catch (e) {
            console.log(e)
            console.log(id)
        }
    }
    const handleDelete = async (id, blog) => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
        {await blogService.deleteBlog(id)
            getAndSort()
            setMessage(`Deleted the blog ${blog.title}`)
            setTimeout(() => setMessage(null), 5000)}
    }

    if (user === null) {
        return (
            <div>
                <Notifcation message ={message}/>
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
          username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            id ="username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
          password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            id="password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notifcation message ={message}/>
            <p>{user.name} logged in <button onClick ={handleLogout}>Log out</button></p>
            <h2>create new</h2>
            <Togglable buttonLabel = "create new note" ref={noteFormRef}>
                <Blogform handleCreate = {handleCreate}/>
            </Togglable>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} handleUpdate ={handleUpdate} userName ={user.name} handleDelete ={handleDelete}/>
            )}
        </div>
    )
}

export default App