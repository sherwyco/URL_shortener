import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData } from '../Api/Client';
import { CircularProgress } from '@mui/material';

function Redirect() {
    const { shortCode } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        // eslint-disable-next-line
        getData(`/${shortCode}`, "", {}).then((response: any) => {
            window.location.replace(response.data.original_url)
        }).catch((error) => {
            console.log(error)
            navigate("/")
        })
    })
    return <><CircularProgress /></>
}

export default Redirect;