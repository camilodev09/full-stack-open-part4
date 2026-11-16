
const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) =>{

    const  reducer  = (acc, el)=>{
        return acc + el.likes
    }

    return blogs.reduce(reducer,0)

}

const favoriteBlog = (blogs) => {
 
    if(blogs.length === 0) return null

     return blogs.reduce((current,prev) => {
       return current.likes >  prev.likes ? current : prev
    })
  
}

const mostBlogs = (blogs) => { 
  if (blogs.length === 0) return null

  const authorBlogs = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  const topAuthor = Object.keys(authorBlogs).reduce((a, b) =>
    authorBlogs[a] > authorBlogs[b] ? a : b
  )

  return {
    author: topAuthor,
    blogs: authorBlogs[topAuthor] 
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  // 1. Accumulation Phase: Add up the likes per author in the Hash Map
  const authorLikes = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  // 2. 
  const topAuthor = Object.keys(authorLikes).reduce((a, b) =>
    authorLikes[a] > authorLikes[b] ? a : b
  )

  // 3. 
  return {
    author: topAuthor,
    likes: authorLikes[topAuthor] 
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}