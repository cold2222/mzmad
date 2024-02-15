import React, { useEffect, useState } from "react";
import axios from "axios";

function Test() {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        getApi();
    }, []);

    const getApi = () => {
        axios.get("http://localhost:8080/api/bbsApi")
            .then(res => {
                console.log(res);
                console.log(res.data[0].id);
                setDataList(res.data);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h1>Test 페이지</h1>
            <ul>
                {dataList.map(item => (
                    <li key={item.id}>
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
