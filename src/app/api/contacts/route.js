// import { NextResponse } from "next/server";
// import Register from "../../../models/registration";
// import connectToDb from "../../../database";

import { NextResponse } from "next/server";
import connectToDb from "../../../database";
import Inform from "../../../models/inform";

// import { NextResponse } from "next/server";
// import connectToDb from "../../../database";
// import Course from "../../../models/course";





export const dynamic = "force-dynamic";


export async function GET(req) {
  await connectToDb()

//   const page = 1;
//   const limit = 10;
//   const skip = (page -1) * limit;

  try {
          const contacts = await Inform.find().sort({_id: -1})
        //   .skip(skip).limit(limit).toArray();
          if (contacts.length > 0) {
              return NextResponse.json({
                  success: true,
                  data: contacts,
              }, {
                  headers: {
                      "Cache-Control": "no-cache",
                  },
              });
          } else {
              return NextResponse.json({
                  success: false,
                  status: 204,
                  message: "Issue in fetching Contacts!",
              }, {
                  headers: {
                      "Cache-Control": "no-cache",
                  },
              });
            }
        
  } catch (error) {
      console.error("An error occurred:", error);
      return NextResponse.json({
          success: false,
          status: 500,
          message: "Internal Server Error"
      }, {
          headers: {
              "Cache-Control": "no-cache"
          }
      });
  }
}