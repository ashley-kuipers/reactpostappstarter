import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
    findUserById,
    IDecodedUser,
    verifyUser,
    parseToken,
    addPost,
    posts,
    users,
    sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// when user has been validated, logging in
app.post("/api/user/login", (req, res) => {
    try {
        const { email, password } = req.body;
        const user = verifyUser(email, password);
        const token = jwt.sign({ id: user.id }, "djl934nl,mdops9a80934;lamsndfl'9p;asdkf", {
            expiresIn: "2 days",
        });
        res.json({ result: { user, token } });
    } catch (error) {
        res.status(401).json({ error });
    }
});

// validate user
app.post("/api/user/validation", (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = parseToken(authHeader, res);
        const decodedUser = jwt.verify(token, "secret");
        const user = findUserById((decodedUser as IDecodedUser).id);
        res.json({ result: { user, token } });
    } catch (error) {
        res.status(401).json({ error });
    }
});

// get all posts
app.get("/api/posts", async (req, res) => {
    setTimeout(() => {
        res.json(posts);
    }, 2000);
    // sleep(5000); couldnt get this function to work?
    
});

// get individual post
app.get("/api/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    const user = users.find((user) => user.id === post.userId);
    const enrichedPost = {
        ...post,
        userEmail: user?.email,

    };

    res.json(enrichedPost);
});

// edit individual post
app.get("/api/posts/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);

    res.json(post);
});

// add new post
app.put("/api/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, content, category, image } = req.body;

    // Find the post to update
    const post = posts.find((post) => post.id === id);
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    // Update the post's fields
    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;
    if (image) post.image = image;

    res.status(200).json({ success: true, updatedPost: post });
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {
    const incomingPost = req.body;

    // would create middleware to check the token is authentic/not expired

    // would create middleware to check that the post is as it should be

    addPost(incomingPost);
    res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running"));
