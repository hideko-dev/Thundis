import React, { useState } from "react";
let data = {};
let dataState = false;
export default function Test(){
    const [value, setValue] = useState("");

    async function getData(value){
        try {
            const res = await fetch(`https://thundis.vercel.app/tag/${value}`)
            data = await res.json()
            dataState = true
        } catch (error) {
            console.log(error)
        }
    }
    const inputChange = (e) => {
        setValue(e.target.value)
    }
    const handleBtn = () => {
        getData(value)
    }

    return (
        <>
            <input type="text" value={value} onChange={inputChange}/>
            <button onClick={handleBtn}>Get Data</button>
            <p>{data.id}</p>
            <p>aa</p>
        </>
    )
}