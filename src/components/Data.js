import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import "./global.css";

function Data() {
    const [list, setList] = useState();

    useEffect(()=> {
        fetchData();
    }, [])

    const url = "https://www.mocky.io/v2/5ba8efb23100007200c2750c";

    // fetch data.
    async function fetchData(){
        try{
            const data= await fetch(url).then((response)=> {
                return response.json();
            })
            setList(data);
        }catch(error){
            throw new Error(error);
        }
    }

  return (
    <div>
        <h1 className='heading'>Filter select</h1>
        {list && (
            <SearchBox users={list}/>
        )}
    </div>
  )
}

export default Data