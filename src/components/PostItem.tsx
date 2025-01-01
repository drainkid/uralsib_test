import {Post} from "../types.ts"
import {Divider, IconButton, ListItem, ListItemText} from "@mui/material"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {useNavigate} from "react-router";
import {FC} from "react";

interface PostItemProps {
    posts:Post
}



const PostItem: FC<PostItemProps> = ({posts}) => {

    const navigate = useNavigate();
    const handleNavigation = () => navigate(`/${posts.id}`)

    return (
        <div>
            <ListItem>
                <ListItemText primary={[posts.id + '. '+ posts.title]} />
                <IconButton onClick={handleNavigation}>
                    <ArrowForwardIcon />
                </IconButton>
            </ListItem>
            <Divider component="li"/>
        </div>
    )
}

export default PostItem;