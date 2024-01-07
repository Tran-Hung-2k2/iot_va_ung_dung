import nodemailer from 'nodemailer';

const service = {
    send_email: async (email, subject, text) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: subject,
                text: text,
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
};

export default service;
