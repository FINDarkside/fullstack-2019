const dummy = (blogs) => {
    return 1;
}

function totalLikes(blogs) {
    return blogs.reduce((prev, curr) => prev + curr.likes, 0);
}

function favoriteBlog(blogs) {
    if (blogs.length === 0)
        return null;
    return blogs.reduce((prev, curr) => curr.likes > prev.likes ? curr : prev);
}

function mostBlogs(blogs) {
    if (blogs.length === 0)
        return null;
    const authorBlogs = {};
    for (const blog of blogs) {
        if (!authorBlogs[blog.author])
            authorBlogs[blog.author] = { author: blog.author, blogs: 0 };
        authorBlogs[blog.author].blogs++;
    }
    return Object.values(authorBlogs).reduce((prev, curr) => curr.blogs > prev.blogs ? curr : prev);
}

function mostLikes(blogs) {
    if (blogs.length === 0)
        return null;
    const authorLikes = {};
    for (const blog of blogs) {
        if (!authorLikes[blog.author])
            authorLikes[blog.author] = { author: blog.author, likes: 0 };
        authorLikes[blog.author].likes += blog.likes;
    }
    return Object.values(authorLikes).reduce((prev, curr) => curr.likes > prev.likes ? curr : prev);
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
