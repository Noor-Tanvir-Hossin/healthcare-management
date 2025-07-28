import { Response } from "express";

const sendResponse = <T>(res:Response, jsonData:{
    statusCode:string,
    success:boolean,
    message:string,
    meta?:{
        page?:number,
        limit?:number,
        total?:number
    },
    data: T | null| undefined
})=>{
    const {statusCode, success, message, meta, data} = jsonData;

    res.status(Number(statusCode)).json({
        success,
        message,
        meta: meta || undefined || null,
        data:data || undefined || null
    });
}
export default sendResponse;