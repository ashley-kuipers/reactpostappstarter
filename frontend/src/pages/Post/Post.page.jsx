import React from "react";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, Loader } from "@mantine/core";
import { Await, useLoaderData, defer } from "react-router-dom";

export const PostPage = () => {
    const data = useLoaderData();

    return (
        <Container pt="lg">

            {/* Loader animation for while posts are being fetched */}
            <React.Suspense
                fallback={
                    <div style={{ textAlign: "center", width: "100%" }}>
                        <Loader color="blue" />
                    </div>
                }
            >
                {/* Posts Container */}
                <SimpleGrid cols={3}>
                    <Await
                        resolve={data.posts}
                        errorElement={<p>Error loading posts!</p>}
                    >

                        {(posts) =>
                            posts?.map((post) => (
                                <ArticleCardImage key={post.title} {...post} />
                            ))
                        }

                    </Await>
                </SimpleGrid>
            </React.Suspense>

        </Container>
    );
};

export const postsLoader = async () => {
    // Fetch data and delay with defer to allow Suspense to display loading
    const postsPromise = axios
        .get(`${DOMAIN}/api/posts`)
        .then((res) => res.data);

    return defer({
        posts: postsPromise, // Deferred loading of posts
    });
};
