import { CircularProgress, Container, List, Typography } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import PostItem from "./PostItem.tsx";
import { Post } from "../types.ts";

const PostList = () => {

    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const lastElement = useRef<HTMLDivElement>(null)

    const ListStyle = {
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
    }

    const getPosts = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(
                `https://jsonplaceholder.typicode.com/posts`,
                {
                    params: {
                        _limit: 10,
                        _page: page,
                    }
                }
            )
            if (res.data.length === 0) {
                setHasMore(false)
            } else {
                setPosts((prevPosts) => [...prevPosts, ...res.data])
            }
        }
        catch (error) {
            alert(`Ошибка при загрузке постов: ${error}`)
        }
        finally {
            setIsLoading(false)
        }
    }

    // загрузка первой страницы
    useEffect(() => {
            getPosts()
        }
    , [])

    // запрос на получение постов для следующих страниц
    useEffect(() => {
        if (page === 1) return
        getPosts()
    }, [page])

    // пагинация с помощью IntersectionObserver API
    useEffect(() => {

        if (isLoading || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1)
                }
            },
        )

        if (lastElement.current) {
            observer.observe(lastElement.current);
        }

        return () => {
            if (lastElement.current) {
                observer.unobserve(lastElement.current)
            }
        }

    }, [isLoading, hasMore])


    return (
        <div>
            <Container>
                <Typography variant="h1" sx={{textAlign: 'center', marginBottom: '20px'}}>
                    Список постов
                </Typography>

                <List sx={ListStyle}>
                    {posts.map((post) => (
                        <Fragment key={post.id}>
                            <PostItem posts={post} key={post.id}/>
                        </Fragment>
                    ))}
                </List>

                <div ref={lastElement} style={{height: "10px"}}/>
                {isLoading && <CircularProgress sx={{display: "block", margin: "auto"}}/>}

            </Container>
        </div>
    )
};

export default PostList
