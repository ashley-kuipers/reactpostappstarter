"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.parseToken = exports.findUserById = exports.verifyUser = exports.addPost = exports.posts = exports.users = void 0;
exports.users = [
    { id: 1, email: "john123@gmail.com", password: "123" },
    { id: 2, email: "sandra123@gmail.com", password: "123" },
];
exports.posts = [
    {
        id: 1,
        title: "Bird",
        category: "nature",
        content: "Belted Kingfishers are large-headed birds with a shaggy crest on the back of the head.",
        image: "https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_640.jpg",
        userId: 1,
    },
    {
        id: 2,
        title: "Beautiful BC",
        category: "nature",
        content: "BC is a province full of beauty at every corner.",
        image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        userId: 2,
    },
];
const addPost = (post) => {
    post.id = 3;
    post.userId = 2;
    exports.posts.push(post);
};
exports.addPost = addPost;
const verifyUser = (email, password) => {
    const user = exports.users.find((user) => {
        return user.email === email && user.password === password;
    });
    if (!user)
        throw new Error("User not found");
    return user;
};
exports.verifyUser = verifyUser;
const findUserById = (id) => {
    const user = exports.users.find((user) => user.id === id);
    if (!user)
        throw new Error("User not found");
    return user;
};
exports.findUserById = findUserById;
const parseToken = (authHeader, res) => {
    if (!authHeader) {
        res.status(403).send("Header does not exist");
        return "";
    }
    return authHeader.split(" ")[1];
};
exports.parseToken = parseToken;
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
exports.sleep = sleep;
