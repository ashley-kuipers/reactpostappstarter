import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findUserById, IDecodedUser } from "./fakedb";

const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, "djl934nl,mdops9a80934;lamsndfl'9p;asdkf") as IDecodedUser;

        // Check if user exists
        const user = findUserById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Attach user to request for downstream middleware or routes
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};


const postValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        return res.status(400).json({ error: "Missing required fields: title, content, category" });
    }

    // Optionally validate additional fields if needed
    if (req.body.image && typeof req.body.image !== "string") {
        return res.status(400).json({ error: "Image must be a string" });
    }

    next();
};

