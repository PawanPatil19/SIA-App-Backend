'use client'

import { useRouter } from 'next/navigation'
import Link from "next/link";
import { useEffect, useState } from 'react';
import firebase_app from "../../../../firebase/config";
import { getFirestore, doc, getDoc, updateDoc, getStorage, ref, getDownloadURL } from "firebase/firestore";


export default function Home({params}) {
    const router = useRouter()
    const id = params.id;
    const entityNumber = params.entityNumber;
    const db = getFirestore(firebase_app);

    const [merchantData, setMerchantData] = useState([]);
    const [registrationData, setRegistrationData] = useState([]);
    const [entityData, setEntityData] = useState([]);

    const getMerchantData = async () => {
        const docRef = doc(db, "Merchants", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setMerchantData(docSnap.data());

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const approveMerchant = async () => {
        console.log('Merchant Approved')
        const docRef = doc(db, "Merchants", id);
        await updateDoc(docRef, {
            isVerified: true
        })
        router.push('/')
    }

    const getRegistrationData = async (entityNumber) => {
        fetch('https://data.gov.sg/api/action/datastore_search?resource_id=5ab68aac-91f6-4f39-9b21-698610bdf3f7&q=' + entityNumber)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setRegistrationData(actualData);
                setEntityData(actualData.result.records[0]);
                
            })
            .catch((err) => {
                console.log(err.message);
            });
        }



    useEffect(() => {
        getRegistrationData(entityNumber);
        getMerchantData();
        
    }, [])


    
    
    //console.log(registrationData);

    return (
        <div className='max-w-screen-xl items-center justify-between mx-auto p-4 mt-10'>
            <div className='pb-10'>
                <h1 className='text-3xl font-bold'>{merchantData.entityName}</h1>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className='border-2 rounded-lg p-5'>
                    <div className='flex flex-col'>
                        <span className='text-white font-light'>Merchant Name: {merchantData.merchantName}</span>
                        <span className='text-white font-light'>Merchant Registerd Email: {merchantData.merchantEmail}</span>
                        <span className='text-white font-light'>Merchant ID: {merchantData.merchantID}</span>
                        <span className='text-white font-light'>Location: {merchantData.merchantLocation}</span>
                        <span className='text-white font-light'>Entity Name: {merchantData.entityName}</span>
                        <span className='text-white font-light'>Entity Registration Number: {merchantData.entityNumber}</span>
                        <span className='text-white font-light'>Entity Address: {merchantData.entityAddress}</span>
                        <span className='text-white font-light'>Entity Type: {merchantData.entityType}</span>
                    </div>
                </div>

                <div className='border-2 rounded-lg p-5'>
                    <div>
                        <span className='text-white font-light'>Documents Uploaded for verification:</span>
                        <div>
                           
                                <span className='text-orange-300 font-light underline'>
                                    <a href={merchantData.uploadDocumentRef}>
                                    Entity Registration Certificate
                                    </a>
                                </span>
                            
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='flex justify-center'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => getRegistrationData(merchantData.entityNumber)}>
                    Verify Entity Details
                </button>
            </div> */}

            
        <div className='w-full border-2 rounded-lg p-5 my-10'>
            <div className='flex flex-col'>
                <span className='text-white pb-5 font-semibold'>Data gathered from 
                <a href="https://data.gov.sg/dataset/entities-with-unique-entity-number"> 
                <span className="underline text-orange-300"> data.gov.sg</span>
                </a>
                </span>
                
                <span className='text-white font-light'>Entity UEN: {entityData.uen}</span>
                <span className='text-white font-light'>Entity Street: {entityData.reg_street_name}</span>
                <span className='text-white font-light'>Postal Code: {entityData.reg_postal_code}</span>
                <span className='text-white font-light'>Entity Name: {entityData.entity_name}</span>
                <span className='text-white font-light'>Entity Type: {entityData.entity_type}</span>
                <span className='text-white font-light'>Issuance Agency ID: {entityData.issuance_agency_id}</span>
                <span className='text-white font-light'>UEN Issue Date: {entityData.uen_issue_date}</span>
                <span className='text-white font-light'>UEN status: {entityData.uen_status}</span>
            </div>
        </div>

        {!merchantData.isVerified ? (
            entityData.uen != null ? (
                <div>
                    <div className='flex justify-center rounded-lg p-3 bg-slate-500 bg-opacity-40'>
                        <span className='text-white'>
                            Entity registration information acquired from database. Looks good 👍
                        </span>
                    </div>
                    <div className='flex justify-center my-10'>
                        <button className='bg-yellow-500  text-white font-bold py-2 px-4 rounded mr-auto'>
                            Request for more information
                        </button>
                        <div className='flex ml-auto'>
                            <button className='bg-green-500  text-white font-bold py-2 px-4 rounded'
                                onClick={() => approveMerchant()}>
                                Approve
                            </button>
                            &nbsp;
                            <button className='bg-red-500  text-white font-bold py-2 px-4 rounded'>
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            ) :
            (
                <div>
                    <div className='flex justify-center'>
                        <span className='text-white'>
                            No entity registration information acquired from database. Please verify manually.
                        </span>
                    </div>
                    <div className='flex justify-center my-10'>
                        <button className='bg-yellow-500  text-white font-bold py-2 px-4 rounded mr-auto'>
                            Request for more information
                        </button>
                        <div className='flex ml-auto'>
                            <button className='bg-green-500  text-white font-bold py-2 px-4 rounded'
                                onClick={() => approveMerchant()}>
                                Approve
                            </button>
                            &nbsp;
                            <button className='bg-red-500  text-white font-bold py-2 px-4 rounded'>
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )
  
        ): 
        (
            <div className='flex justify-center rounded-lg p-3 bg-slate-500 bg-opacity-40'>
                <span className='text-white'>
                    Merchant Approved
                </span>
            </div>
        )
}

        

            

            

            

        </div>
        
    )
}
