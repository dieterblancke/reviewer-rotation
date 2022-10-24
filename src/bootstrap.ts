import Server from './server/server';
import dotenv from 'dotenv';
import EventBus from './event/eventbus';
import PullRequestService from './bitbucket/pull_request_service';

class Bootstrap {

    private eventBus!: EventBus;
    private server!: Server;
    private pullRequestService!: PullRequestService;

    constructor() {
        dotenv.config();
    }

    start() {
        this.eventBus = new EventBus();

        this.registerServices();
        this.startServer();
    }

    registerServices() {
        this.pullRequestService = new PullRequestService(this.eventBus);
    }

    startServer() {
        const port: number = parseInt(process.env.PORT ?? "5656");
        const webhookUuid: string = process.env.WEBHOOK_UUID ?? "";

        this.server = new Server(this.eventBus, port, webhookUuid);
        this.server.start();
    }
}

export default Bootstrap;