'use client'

import { useEffect, useState } from 'react';
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
            return <div className='w-full border-2 border-white rounded-lg p-5 my-5'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <span className='text-gray-200 font-light text-sm'>{item.docID}</span>
                <span className='text-white font-light'>Merchant Name: {item.merchantName}</span>
                <span className='text-white font-light'>Merchant Registerd Email: {item.merchantEmail}</span>
                <span className='text-white font-light'>Merchant ID: {item.merchantID}</span>
                <span className='text-white font-light'>Location: {item.merchantLocation}</span>
                <span className='text-white font-light'>Entity Name: {item.entityName}</span>
                <span className='text-white font-light'>Entity Registration Number: {item.entityNumber}</span>
                <span className='text-white font-light'>Entity Address: {item.entityAddress}</span>
                <span className='text-white font-light'>Entity Type: {item.entityType}</span>
              </div>
    
              <div className='flex flex-col'>
                <span className='text-gray-200 font-light text-sm'>Date: {item.createdAt}</span>
                <div className='mt-auto'>
                  <h1 className='font-bold'>Status: Under Review</h1>
                  <div>
                    <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'>Reject</button>
                    &nbsp;
                    <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'>Approve</button>
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
