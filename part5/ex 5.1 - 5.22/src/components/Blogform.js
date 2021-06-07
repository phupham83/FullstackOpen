import React, { useState } from "react"

const Blogform = ({ handleCreate }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const addBlog = (event) => {
        event.preventDefault()
        handleCreate({
            title: title,
            author: author,
            url: url,
        })
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    return(
        <form onSubmit = {addBlog}>
            <div>
          title<input
                    type ="text"
                    value = {title}
                    name = "Title"
                    id ="title"
                    onChange = {({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
          author<input
                    type ="text"
                    value = {author}
                    name = "Author"
                    id = "author"
                    onChange = {({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
          url<input
                    type ="text"
                    value = {url}
                    name = "Url"
                    id = "url"
                    onChange = {({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit" id="submitForm">create</button>
        </form>
    )
}

export default Blogform