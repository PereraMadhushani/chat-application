import { Resend } from "resend";
import { ENV } from "./env.js";

// prefer explicit ENV entry but fall back to process.env (in case env loader runs differently)
const apiKey = ENV.RESEND_API_KEY || process.env.RESEND_API_KEY;

if (!apiKey) {
    throw new Error(
        'Missing RESEND API key. Set the RESEND_API_KEY environment variable (for example in a `.env` file: RESEND_API_KEY=re_123)'
    );
}

export const resendClient = new Resend(apiKey);

export const sender = {
    email: ENV.EMAIL_FROM || process.env.EMAIL_FROM,
    name: ENV.EMAIL_FROM_NAME || process.env.EMAIL_FROM_NAME,
};