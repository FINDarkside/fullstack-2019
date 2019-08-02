import { useState, useEffect } from 'react';
import axios from 'axios';

export default (url) => {

    let [resources, setResources] = useState([]);

    const create = async (resource) => {
        const response = await axios.post(url, resource);
        setResources([...resources, response.data]);
        return response.data;
    }

    useEffect(() => {
        const getAll = async () => {
            const response = await axios.get(url);
            return response.data;
        };
        getAll().then(res => setResources(res));
    }, [url]);

    return [resources, { create }];
}
