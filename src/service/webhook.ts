import { Request, Response, NextFunction } from "express";
import { OpenArtificialIntelligence, sendTextMessage } from "../utils/bot";

export const facebookWebhookVerify = (
    req: Request | any,
    res: Response,
    next: NextFunction
) => {
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (mode && token) {
        if (mode === "subscribe" && token === process.env.VERIFYTOKEN) {
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
}

export const facebookWebhook = (
    req: Request | any,
    res: Response,
    next: NextFunction
) => {
    if (req.body.entry.length && req.body.entry[0]["changes"]) {
        let changes = req.body.entry[0]["changes"];
        let message : any = changes[0]["value"]["messages"] ? changes[0]["value"]["messages"][0] : false;
        // console.log(message)
        if (message) {
            switch (message["type"]) {
                case "text":
                    OpenArtificialIntelligence(message.text.body).then((message : any) => {
                        sendTextMessage(message).then(res => {
                            console.log(res);
                        }).catch(err => {
                            console.log(err)
                        })
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err)
                    })
                    break;
                default:
                    break;
            }
        } 
    }
}
