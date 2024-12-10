// import { NextApiRequest, NextApiResponse } from "next";
// import s3 from "../../utils/s3Config";
// import { v4 as uuidv4 } from "uuid";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       const { fileName, fileType } = req.body;

//       if (!fileName || !fileType) {
//         return res.status(400).json({ error: "Missing fileName or fileType" });
//       }

//       const key = `${uuidv4()}-${fileName}`;

//       const params = {
//         Bucket: process.env.AWS_BUCKET_NAME as string, 
//         Key: key,
//         ContentType: fileType,
//         Expires: 60, 
//       };

//       const uploadUrl = await s3.getSignedUrlPromise("putObject", params);

//       res
//         .status(200)
//         .json({
//           uploadUrl,
//           fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`,
//         });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to generate upload URL" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }
