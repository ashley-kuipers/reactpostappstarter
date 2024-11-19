import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container, SimpleGrid } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { Image, Text } from '@mantine/core';
import classes from './PostDetails.page.module.css';
import useBoundStore from "../../store/Store";

function PostDetailsPage() {
    const post = useLoaderData();
    const { user } = useBoundStore((state) => state);
    const isAuthor = user?.email === post.userEmail;

    return (
        <>
            <Container pt="lg">
                <Button styles={{root: {backgroundColor:'#FAFAFA', paddingLeft:'0px'}}}>
                    <Link to="/posts"> &larr; Back to Posts</Link>
                </Button>
                <br />
                <br />

                <SimpleGrid cols={2} spacing="md">
                    <div>
                        <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                            {post.category}
                        </Text>
                        <Text className={classes.title} mt="xs" mb="md">
                            {post.title}
                        </Text>

                        <Text className={classes.content} mt="xs" mb="md">
                            {post.content}
                        </Text>

                        <Text c="dimmed" size="xs">
                            {getUserName(post.userEmail)}
                        </Text>
                        <br />

                        {/* Show the Edit Button only if the logged-in user is the author */}
                        {isAuthor && (
                            <Button>
                                <Link to={`/posts/edit/${post.id}`}>Edit Post</Link>
                            </Button>
                        )}
                    </div>
                    <div>
                        <Image
                            src={post.image}
                        />
                    </div>

                </SimpleGrid>

            </Container>
        </>
    );
}

export const postDetailsLoader = async ({ params }) => {
    const { id } = params;
    // Fetch post data
    const postRes = await axios.get(`${DOMAIN}/api/posts/${id}`);
    const post = postRes.data;
    console.log(post)
    return post;
};

function getUserName(email) {
    if (typeof email !== 'string' || !email.includes('@')) {
        throw new Error('Invalid email address');
    }
    return email.split('@')[0];
}

export default PostDetailsPage;
