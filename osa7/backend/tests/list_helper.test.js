const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../src//utils/list_helper');
const blogList = require('./util/blogList');

test('dummy returns one', () => {
    const blogs = [];

    const result = dummy(blogs);
    expect(result).toBe(1);
});

describe('total_likes', () => {
    it('returns 0 for empty list', () => {
        const res = totalLikes([]);
        expect(res).toBe(0);
    });

    it('returns likes of the only blog in array', () => {
        const res = totalLikes([blogList[0]]);
        expect(res).toBe(blogList[0].likes);
    });

    it('returns likes of large array correctly', () => {
        const res = totalLikes(blogList);
        expect(res).toBe(36);
    });
});

describe('favoriteBlog', () => {
    it('returns null for empty list', () => {
        const res = favoriteBlog([]);
        expect(res).toBe(null);
    });

    it('returns likes of the only blog in array', () => {
        const res = favoriteBlog([blogList[0]]);
        expect(res).toEqual(blogList[0]);
    });

    it('returns the blog with largest like count correctly', () => {
        const res = favoriteBlog(blogList);
        expect(res).toEqual(blogList[2]);
    });
});

describe('mostBlogs', () => {
    it('returns null for empty list', () => {
        const res = mostBlogs([]);
        expect(res).toBe(null);
    });

    it('returns blog count correctly when list has only one blog', () => {
        const res = mostBlogs([blogList[0]]);
        expect(res).toEqual({ author: 'Michael Chan', blogs: 1 });
    });

    it('returns the blogger with most blogs on larger list', () => {
        const res = mostBlogs(blogList);
        expect(res).toEqual({ author: 'Robert C. Martin', blogs: 3 });
    });
});

describe('mostLikes', () => {
    it('returns null for empty list', () => {
        const res = mostLikes([]);
        expect(res).toBe(null);
    });

    it('returns the only author and like count on the list', () => {
        const res = mostLikes([blogList[0]]);
        expect(res).toEqual({ author: 'Michael Chan', likes: 7 });
    });

    it('returns the blogger with most likes on larger list', () => {
        const res = mostLikes(blogList);
        expect(res).toEqual({author: 'Edsger W. Dijkstra', likes: 17});
    });
});