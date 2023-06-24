'use client'

import { useEffect, useState } from 'react';
import Link from "next/link"
import firebase_app from "../firebase/config";
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";
import React from 'react';

export default function Home() {
  const [merchantsData, setMerchantsData] = useState([]);

  const getAllMerchantsData = async () => {
    const db = getFirestore(firebase_app);
    const querySnapshot = await getDocs(collection(db, "Merchants"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.docID = doc.id;
      setMerchantsData((prev) => [...prev, data]);
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
    });

  }



  useEffect(() => {
    getAllMerchantsData();
  }, [])




  return (
    
    <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-10'>
      <div className='pb-10'>
        <h1 className='text-5xl font-bold'>Merchants Data</h1>
      </div>

      {
          merchantsData.map((item) => {
            console.log(item);
            var date = item.createdAt.toDate().toDateString();
            return <div className='w-full border-2 border-white rounded-lg p-5 my-3'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <span className='text-gray-400 font-light text-sm'>{item.docID}</span>
                <span className='text-white font-light text-lg'>Merchant Name: {item.merchantName}</span>
                <span className='text-white font-light text-lg'>Entity Name: {item.entityName}</span>
                <span className='text-white font-light text-lg'>Date: {date}</span>
                
              </div>
    
              <div className='flex flex-col'>
                
                
                  {
                    item.isVerified == false ? <span className='font-bold text-orange-300'>Status: Under Review</span> : <span className='font-bold text-green-700'>Status: Approved</span>
                  }
                <div className='mt-auto flex'>
                  <div className='ml-auto'>
                    <Link href={`/merchantPage/${item.docID}/${item.entityNumber}`}><button className='text-white border-2 border-white font-bold py-1 px-4 rounded hover:bg-white hover:text-black'>View -&gt;</button></Link>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
              
          })
        }
      
      
      
    </div>
  )
}
