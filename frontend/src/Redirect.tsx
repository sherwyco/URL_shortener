import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData } from './Api/Client';

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
    return <h1> You will be automatically redirected if link exists...</h1>
}

export default Redirect