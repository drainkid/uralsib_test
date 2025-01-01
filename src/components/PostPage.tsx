import {FC, useEffect, useState} from "react";
import {Comments, Post} from "../types.ts";
import {useParams} from "react-router";
import {Avatar, Box, CircularProgress, Container, Divider, Paper, Typography} from "@mui/material";
import {fetchCommentsPostById, fetchPostById} from "../services/api.ts";

const PostPage:FC = () => {


    const [post, setPost] = useState<Post>()
    const [comments, setComments] = useState<Comments[]>([])
    const params = useParams()


    const getPostById = async () => {

        const res = await fetchPostById(params.id)
        setPost(res)
    }

    const getCommentsPostById = async () => {

        const res = await fetchCommentsPostById(params.id)
        setComments(res)
    }


    useEffect(() => {
        getPostById()
        getCommentsPostById()

    },[])


    return (
        <div>
            { (post) ?
            <Container>
                <Typography variant="h4" sx={{textAlign: 'center', marginTop: '50px'}}>
                    Вы открыли пост под номером {params.id}
                </Typography>
                <Typography variant="h4" sx={{textAlign: 'center', marginTop: '30px'}}>
                    Тема: {post.title}
                </Typography>
                <Paper elevation={3} sx={{marginTop: '30px'}}>
                    <Box component="div">
                        <Typography component="p" sx = {{margin:'20px'}}>
                            {post.body}
                        </Typography>
                    </Box>
                </Paper>

                <Typography variant="h4" sx={{textAlign: 'left', marginTop: '50px'}}>
                    Комментарии
                </Typography>

                {comments.map((comm) => (
                    <Paper elevation={3} sx={{marginTop: '30px'}} key={comm.id}>

                        <Box component="div">
                            <Avatar sx ={{top:'10px', left: '20px'}}> {comm.name.charAt(0)}</Avatar>

                            <Typography component="p" sx={{ ml: 10, position: 'relative', bottom: '20px' }}>
                                {comm.name}, <strong>{comm.email}</strong>
                            </Typography>

                            <Divider/>

                            <Typography component="p" sx = {{margin: '20px'}} >
                                {comm.body}
                            </Typography>
                        </Box>

                    </Paper>
                ))}
            </Container>
                : <CircularProgress sx={{display: "block", margin: "auto"}}/>
            }
        </div>
    )
}

export default PostPage;