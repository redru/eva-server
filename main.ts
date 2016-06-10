"use strict";

import * as http from "http";
import * as https from "https";
import { Express } from "express-serve-static-core";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as HttpConf from "./configuration/HttpServerConf";
import { ApiRouter } from "./api/api-router"

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: Express;

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        this.app = express(); // create expressjs application
        this.config(); // configure express application
        this.route(); // define application routing
    }

    /**
     * Setup the server configuration
     *
     * @class Server
     * @return {void}
     */
    public config(): void {
        this.app.use(bodyParser.json());
    }

    /**
     * Define routing
     *
     * @class Server
     * @return {void}
     */
    public route(): void {
        // Keep alive
        this.app.get('/', function keepAlive(req: express.Request, res: express.Response) {
            res.status(200).json({ data: { }, message: 'Server UP.' });
        });

        // Api routing
        this.app.use('/api', ApiRouter.v01());

        // Generic error handling
        // TODO Error handling not being called
        this.app.use(function error(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            res.status(404).json();
        });
    }

    /**
     * Start server
     *
     * @class Server
     * @return {void}
     */
    public start(): void {
        http.createServer(this.app).listen(HttpConf.port, HttpConf.domain, function () {
            console.log('eva-server running on http://' + HttpConf.domain + ':' + HttpConf.port);
        });
    }

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {Server} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }
}

Server.bootstrap().start();
