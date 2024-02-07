import React, { useEffect, useState } from "react";
import axios from "axios";

function Test() {

    useEffect(() => {
        getApi();
    }, []);

    const getApi = () => {
        axios.get("http://localhost:8080/api/bbsApi")
            .then(res => {
                console.log(res);
                console.log(res.data[0].id);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            Test 페이지
        </div>
    );
}

export default Test;
