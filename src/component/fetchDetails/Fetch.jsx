import React, { useEffect } from 'react'
import {fetchDetails} from '../../redux/slice/authSlice'
import {useDispatch,useSelector} from 'react-redux'

const Fetch = () => {
    const token = sessionStorage.getItem("authToken");
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(fetchDetails(token));
        }
    }, [token, dispatch]);

    
    const userdata = useSelector((state) => state.allauth.data2); 
    console.log("Fetched data:", userdata);

  return (
    <div>
        <h4 className='text-info fst-italic'>Welcome {userdata.name}</h4>
    </div>
  )
}

export default Fetch