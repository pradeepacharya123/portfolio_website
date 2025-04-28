import { Resend } from 'resend';

// ✅ Initialize with your Resend API key
const resend = new Resend(process.env.RESEND_API_KEY); // Better to use environment variable

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // ✅ Compose email
    const emailData = {
      from: process.env.FROM_EMAIL, // From email (use the environment variable here)
      to: process.env.TO,  
      subject: subject || 'No Subject',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    };

    // ✅ Send the email
    const result = await resend.emails.send(emailData);

    console.log('✅ Email sent successfully:', result);

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });

  } catch (error) {
    console.error('❌ Error sending email:', error);

    return new Response(JSON.stringify({ message: 'Error sending email', error: error.message }), {
      status: 500,
    });
  }
}
