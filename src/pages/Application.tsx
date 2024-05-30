import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import {data} from '../helpers/application'
import Table from '../components/Table'
import Header from '../components/Header'

const Application = () => {
    useEffect(()=>{
        console.log(data);
      },[])
      return (
        <div className='flex'>
          {" "}
            <Sidebar />{" "}
            <div className='p-2 w-full h-full overflow-x-auto'>   
            <Header/>
            <Table/>
            </div>
        </div>
      )
}

export default Application