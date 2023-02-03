import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
function Redirect() {
    const { shortCode } = useParams();
    useEffect(() => {
        window.location.replace(`http://localhost:5000/${shortCode}`)
    })
    return (
        <div style={{ display: "block" }}>
            <div style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                WebkitTransform: "translate(-50%, -50%)",
                transform: "translate(-50%, -50%)",
            }}><CircularProgress />
            </div>
        </div>)
}

export default Redirect;