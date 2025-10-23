import aj from '../lib/arcjet.js';
import { isSpoofedBot } from '@arcjet/inspect';

export const arcjetProtection = async (req, res, next) => {
    try{
        const decision = await aj.protect(req);

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({ message: 'Too Many Requests - Rate Limit Exceeded' });
            }
         else if(decision.reason.isBot()){
            return res.status(403).json({ message: 'Access Denied - Bot Detected' });
        } else{
            return res.status(403).json({ message: 'Access Denied by security policy' });
        }
        }

        //check for spoofed bots
        if(decision.results.some(isSpoofedBot)){
            return res.status(403).json({
                error:"Spoofed Bot Detected - Access Denied",
                message:"Malicious bot activity detected."
            });
        }
        next();

    } catch (error) {
        console.log('Arcjet Protection Middleware Error:', error);
        next();
    }
}