import express from "express";

const router = express.Router()

router.get("/send", (req,res) =>{
    res.send("Send message endpoint")
})

router.get("/receive", (req,res) =>{
    res.send("Received message endpoint")
})

export default router