// pages/api/subscribe.ts
// import axios from 'axios';
// import emailjs from 'emailjs-com';


// export default async function handler(req:any, res:any) {
//   if (req.method === 'POST') {
//     try {
//       const { email } = req.body;
//       const listId = process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID;

//       const response = await axios.post(
//         `https://us21.api.mailchimp.com/3.0/lists/${listId}/members`,
//         {
//           email_address: email,
//           status: 'subscribed',
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
//           },
//         }
//       );
      
      
//       res.status(response.status).json(response.data);
//     } catch (error) {
//       console.error('Error subscribing to the list:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
import emailjs from 'emailjs-com';

interface EmailData {
  to_email: string;
  from_name: string;
  message: string;
}

export const sendThankYouEmail = async (emailData: EmailData) => {
  const templateParams = {
    ...emailData,
  };

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.EMAILJS_USER_ID!
    );

    console.log('Thank you email sent successfully');
  } catch (error) {
    console.error('Error sending thank you email:', error);
  }
};
