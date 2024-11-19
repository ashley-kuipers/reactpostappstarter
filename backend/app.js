"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fakedb_1 = require("./fakedb");
const port = 8085;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/user/login", (req, res) => {
    try {
        const { email, password } = req.body;
        const user = (0, fakedb_1.verifyUser)(email, password);
        const token = jsonwebtoken_1.default.sign({ id: user.id }, "djl934nl,mdops9a80934;lamsndfl'9p;asdkf", {
            expiresIn: "2 days",
        });
        res.json({ result: { user, token } });
    }
    catch (error) {
        res.status(401).json({ error });
    }
});
app.post("/api/user/validation", (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = (0, fakedb_1.parseToken)(authHeader, res);
        const decodedUser = jsonwebtoken_1.default.verify(token, "secret");
        const user = (0, fakedb_1.findUserById)(decodedUser.id);
        res.json({ result: { user, token } });
    }
    catch (error) {
        res.status(401).json({ error });
    }
});
app.get("/api/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    setTimeout(() => {
        res.json(fakedb_1.posts);
    }, 5000);
    // sleep(5000); couldnt get this function to work?
}));
app.get("/api/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = fakedb_1.posts.find((post) => post.id === id);
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    const user = fakedb_1.users.find((user) => user.id === post.userId);
    const enrichedPost = Object.assign(Object.assign({}, post), { userEmail: user === null || user === void 0 ? void 0 : user.email });
    res.json(enrichedPost);
});
app.get("/api/posts/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = fakedb_1.posts.find((post) => post.id === id);
    res.json(post);
});
app.put("/api/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, content, category, image } = req.body;
    // Find the post to update
    const post = fakedb_1.posts.find((post) => post.id === id);
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    // Update the post's fields
    if (title)
        post.title = title;
    if (content)
        post.content = content;
    if (category)
        post.category = category;
    if (image)
        post.image = image;
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
    (0, fakedb_1.addPost)(incomingPost);
    res.status(200).json({ success: true });
});
app.listen(port, () => console.log("Server is running"));
