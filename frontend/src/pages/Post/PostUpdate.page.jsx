import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Container, Input, Textarea, Button } from "@mantine/core";
import classes from './PostDetails.page.module.css';


function PostUpdatePage() {
    const post = useLoaderData();
    const navigate = useNavigate();

    // Local state for the edited post
    const [editedPost, setEditedPost] = useState({
        id:post.id,
        userId: post.userId,
        title: post.title,
        content: post.content,
        category:post.category,
        image:post.image
    });

    // Handler for form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPost({ ...editedPost, [name]: value });
    };

    // Handler for saving changes
    const saveChanges = async () => {
        console.log("edited post: ")
        console.log(editedPost)
        try {
            await axios.put(`${DOMAIN}/api/posts/${post.id}`, editedPost);
            // Redirect to the post details page after saving
            navigate(`/posts/${post.id}`);
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };

    // Handler for canceling the edit
    const cancelEdit = () => {
        navigate(`/posts/${post.id}`);
    };


    return (
        <>
            <Container pt="lg">

                <Input
                    value={editedPost.title}
                    name="title"
                    onChange={handleInputChange}
                    className={classes.input}
                    placeholder="Title"
                    mb="md"
                />

                <Input
                    value={editedPost.category}
                    name="category"
                    onChange={handleInputChange}
                    className={classes.input}
                    placeholder="Category"
                    mb="md"
                />

                <Textarea
                    value={editedPost.content}
                    name="content"
                    onChange={handleInputChange}
                    className={classes.textarea}
                    placeholder="Content"
                    mb="md"
                />

                <Input
                    value={editedPost.image}
                    name="image"
                    onChange={handleInputChange}
                    className={classes.input}
                    placeholder="Image"
                    mb="md"
                />

                <Button onClick={saveChanges} mr="sm">
                    Save Changes
                </Button>
                <Button onClick={cancelEdit} variant="outline">
                    Cancel
                </Button>

            </Container>
        </>
    );
}

export const postUpdateLoader = async ({ params }) => {
    const { id } = params;
    const postRes = await axios.get(`${DOMAIN}/api/posts/${id}`);
    return postRes.data;
};


export default PostUpdatePage;
