const lodash = require("lodash")


const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes
    )
    const total = likes.reduce((sum, item)=>{
        return sum + item
    },0)
    return total
}
const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes
    )
    const maxIndex = likes.indexOf(Math.max(...likes))
    return blogs[maxIndex]
}

const mostBlog = (blogs) => {
    const authorBlogCount = lodash.countBy(blogs, "author" )
    const maxCount = (result, num, key) => {
        result.push({"author": key, "blogs": num}) 
    }
    
    return lodash.maxBy(lodash.transform(authorBlogCount, maxCount,[]), "blogs")
}

const mostLikes = (blogs) => {
    const likesGroup = lodash.groupBy(blogs, "author")
    const reduceArray = (objectArray) => {
        const totalLikesA = lodash.reduce(objectArray, (sum, n) =>{
            return sum + n.likes
        },0)
        return totalLikesA
    } 
    const maxCount = (result, num, key) => {
        result.push({"author": key, "likes": reduceArray(num)})
    }
    const likesCounted = lodash.transform(likesGroup, maxCount, [])
    return lodash.maxBy(likesCounted, "likes")
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLikes
}