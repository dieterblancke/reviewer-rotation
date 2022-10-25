import express, {Express, Request, Response} from 'express';
import EventBus from '../event/eventbus';
import EventType from '../event/eventtype';
import Event from '../event/event';
import {Configuration} from "../configuration/configuration";

class Server {

    private eventBus: EventBus;
    private readonly webhookUuid: string;
    private readonly port: number;
    private app: Express;

    constructor(eventBus: EventBus, configuration: Configuration) {
        this.eventBus = eventBus;
        this.webhookUuid = configuration.bitbucket.webhookUuid;
        this.port = configuration.port;
        this.app = express();
        this.app.use(express.json());
        this.app.post('/webhook', this.onPullRequestCreated.bind(this));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`⚡️[SERVER]: Server is now running at https://localhost:${this.port}`);
        });
    }

    private onPullRequestCreated(req: Request, res: Response) {
        if ((req.header("X-Event-Key") ?? '') !== 'pullrequest:created') {
            return;
        }
        if ((req.header("X-Hook-UUID") ?? '') !== this.webhookUuid) {
            return;
        }

        this.eventBus.publish(EventType.PULL_REQUEST_CREATED, new Event(req.body));
    }
}

export default Server;