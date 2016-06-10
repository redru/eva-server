"use strict";

import { Router } from "express-serve-static-core";
import * as express from "express";

export class ApiRouter {

    public static v01(): Router {
        var router  = express.Router();

        router.use(function timeLog(req: express.Request, res: express.Response, next: express.NextFunction) {
            console.log(req.method, '-', new Date());
            next();
        });

        router.get('/', function(req: express.Request, res: express.Response) {
            res.status(200).json({ data: { }, message: 'API services are UP.' });
        });

        return router;
    }

}
