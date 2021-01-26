import React , { useEffect, useState } from 'react'
import axios from '../axios';

const useAxios = (url) => {

    const [data, setData] = useState([])

    useEffect(() => {
        console.log('requete');
        console.log(url);
        const fetchData = async () => {
            const res = await axios.get(url);
            setData(res.data);
         }

        fetchData();
    }, [url]);

    console.log('DATA AVN RETURN', data);

    return data;
}

export default useAxios;