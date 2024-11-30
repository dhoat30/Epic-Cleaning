'use client'
import {useState, useEffect} from 'react'
import axios from "axios";

 export default function GoogleReviews(){ 
   useEffect(()=> { 
         axios.get("/api/google-reviews").then((res)=> { 
         console.log(res)
         }).catch((error)=>
         { 
             console.log(error)
         }
         )
   })
    return <h1>hsdfs</h1>
 }