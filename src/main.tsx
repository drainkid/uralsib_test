import { createRoot } from 'react-dom/client'
import './styles/style.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PostList from "./components/PostList.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import PostPage from "./components/PostPage.tsx";

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
            <Routes>
                <Route path = '/' element = {<PostList/>}/>
                <Route path = '/:id' element = {<PostPage/>}/>
            </Routes>
    </BrowserRouter>

)
