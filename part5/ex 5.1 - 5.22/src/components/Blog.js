import React, { useState } from "react"

const Blog = ({ blog, handleUpdate, handleDelete, userName }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }
    const removeVisible = blog.user ?
        { display: blog.user.name === userName ? "" : "none" } :
        { display: "none" }
    const toggleVisibility = () => {
        setVisible(!visible)
    }
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    const increaseLike = (event) => {
        event.preventDefault()
        handleUpdate(blog._id, {
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes +1
        })
    }

    const removeBlog = (event) => {
        event.preventDefault()
        handleDelete(blog._id, {
            title: blog.title,
            author: blog.author
        })
    }
    return(
        <div style={blogStyle} className ="blog">
            <div style = {hideWhenVisible}>
                {blog.title} by {blog.author}<button onClick ={toggleVisibility}>view</button>
            </div>
            <div style ={showWhenVisible} className ="detailView">
                {blog.title} <button onClick ={toggleVisibility}>hide</button><br/>
                {blog.url}<br/>
                {blog.author}<br/>
      Likes {blog.likes} <button onClick ={increaseLike}>like</button><br/>
                <button onClick={removeBlog} style ={removeVisible}>remove</button>
            </div>
        </div>
    )}

export default Blog