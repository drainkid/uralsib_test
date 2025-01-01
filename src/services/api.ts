import axios from 'axios'

const API_BASE = 'https://jsonplaceholder.typicode.com'

export const fetchPosts =  async (limit: number, page: number)  => {

    const res = await axios.get(
        `${API_BASE}/posts/`,
        {
            params: {
                _limit: limit,
                _page: page,
            }
        }
    )
    return res.data
}

export const fetchPostById  = async (id: string | undefined) => {

    const res = await axios.get(
        `${API_BASE}/posts/${id}`
    )

    return res.data
}

export const fetchCommentsPostById  = async (id: string | undefined) => {

    const res = await axios.get(
        `${API_BASE}/posts/${id}/comments`
    )

    return res.data
}