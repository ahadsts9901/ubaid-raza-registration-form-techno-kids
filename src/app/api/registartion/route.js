
// import Register from "@/models/registration";
import { data } from "autoprefixer";
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';

import Joi from "joi";
import { connect } from "mongoose";
// import { NextResponse } from "next/server";
import connectToDb from "../../../database";
import Register from "../../../models/registration";
import { NextResponse } from "next/server";




const RegistrationSchema = Joi.object({
    fullName: Joi.string().required(),
    fatherName: Joi.string().required(),
    email: Joi.string().required(),
    course: Joi.string().required(),
    batch: Joi.number().required(),
    rollNo:Joi.string().required(),
    payment:Joi.string().required(),
    paymentImg:Joi.string().required(),
    status:Joi.string().required(),
    city: Joi.string().required(),
    cnic: Joi.string().required(),
    phone: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    gender: Joi.string().required(),
    qualification: Joi.string().required(),
    address: Joi.string().required(),
    imageUrl: Joi.string().required()
})



export const dynamic = "force-dynamic"




export async function POST(req) {
    try {
        await connectToDb();

        

            const extractData = await req.json();
            const {
                 fullName,
                fatherName,
                email,
                course,
                batch,
                payment,
                paymentImg,
                status,
                city,
                cnic,
                phone,
                dateOfBirth,
                gender,
                qualification,
                address,
                imageUrl}= extractData;

                // const generateRandomNumber = () => Math.floor(10000 + Math.random() * 90000);
                // const generatedRollNo=generateRandomNumber()


                const lastRegisteredUser = await Register.findOne().sort({ rollNo: -1 });

        // Increment the last roll number or start from 1 if no user exists
        const lastRollNo = lastRegisteredUser ? parseInt(lastRegisteredUser.rollNo) : 0;
        const nextRollNo = lastRollNo + 1;
        const generatedRollNo = nextRollNo.toString().padStart(5, '0');


            const { error } = RegistrationSchema.validate({
                fullName,
                fatherName,
                email,
                course,
                batch,
                payment,
                paymentImg,
                status,
                city,
                cnic,
                phone,
                dateOfBirth,
                gender,
                qualification,
                address,
                imageUrl,
                rollNo: generatedRollNo
            });
    
            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                });
            }
    
            const newlyRegisteredUser = await Register.create({
                fullName,
                fatherName,
                email,
                course,
                batch,
                payment,
                paymentImg,
                status,
                city,
                cnic,
                phone,
                dateOfBirth,
                gender,
                qualification,
                address,
                imageUrl,
                rollNo: generatedRollNo,
            });

            if(newlyRegisteredUser){
                console.log(newlyRegisteredUser);
                return NextResponse.json({
                    success: true,
                    user:newlyRegisteredUser,
                    message: "Registered Successfully!",
                })
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Failed to register. Plz try again! ",
                })
            }




        



    } catch (error) {
        // if (error.code === 11000) {
        //     // Duplicate key error, handle it
        //     return NextResponse.json({
        //         success: false,
        //         message: "A user with the same CNIC already exists.",
        //     });
        // }
        console.log("Error in adding new user-->", error);

        return NextResponse.json({
            success: false,
            message: "Something went Wrong, please Try Again later!"
        })
    }
}