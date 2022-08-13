import React from "react";
import { Post } from "../../types/Post";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Layout } from "../../components/Layout";

type Props = {
    post: Post
}

const Post = ({ post }: Props) => {
    return (
        <Layout>
            <div>
                <h1>Post {post.id}</h1>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
        </Layout>
    );
}

export default Post;

type IPath = {
    params: {
        id: string
    },
    locale: string
}

export const getStaticPaths = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: Post[] = await res.json();

    let paths: IPath[] = [];

    posts.map(post => {
        ['en', 'pt', 'fr'].map(lang => {
            paths.push({
                params: { id: post.id.toString() },
                locale: lang
            })
        })
    })

    return { paths, fallback: false }
}

interface IParams extends ParsedUrlQuery {
    id: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params as IParams;
    const { locale } = context;

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}?language=${locale}`);
    const post: Post[] = await res.json();

    return {
        props: {
            post
        }
    }
}