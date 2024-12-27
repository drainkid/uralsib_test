import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PostList from "./PostList.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import PostPage from "./PostPage.tsx";

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
        <StrictMode>
            <Routes>
                <Route path = '/' element = {<PostList/>}/>
                <Route path = '/:id' element = {<PostPage/>}/>
            </Routes>
        </StrictMode>
    </BrowserRouter>

)
