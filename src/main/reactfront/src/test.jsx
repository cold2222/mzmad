import React, { useEffect, useState } from "react";
import axios from "axios";

function Test() {
    const [bbsList, setBbsList] = useState([]);

    useEffect(() => {
        getApi();
    }, []);

    const getApi = () => {
        axios.get("http://localhost:8080/api/bbsApi")
            .then(res => {
                console.log(res);
                setBbsList(res.data);
                console.log(res.data[0].id);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <ul>
                {bbsList.map((item, index) => (
                    <li key={index}>
                        <div>ID: {item.id}</div>
                        <div>Name: {item.name}</div>
                        <div>Age: {item.age}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Test;
