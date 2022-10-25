import Server from './server/server';
import dotenv from 'dotenv';
import EventBus from './event/eventbus';
import PullRequestService from './bitbucket/pull_request_service';
import BitbucketClient from "./bitbucket/bitbucket_client";
import {Configuration, BitbucketConfiguration} from "./configuration/configuration";

class Bootstrap {

    private configuration!: Configuration;
    private eventBus!: EventBus;
    private server!: Server;
    private pullRequestService!: PullRequestService;
    private bitbucketClient!: BitbucketClient;

    constructor() {
        dotenv.config();
    }

    start() {
        this.eventBus = new EventBus();

        this.loadConfiguration();
        this.registerServices();
        this.startServer();
    }

    private loadConfiguration() {
        this.configuration = new Configuration(
            parseInt(process.env.PORT ?? "5656"),
            new BitbucketConfiguration(
                process.env.BITBUCKET_USERNAME ?? '',
                process.env.BITBUCKET_PASSWORD ?? '',
                process.env.BITBUCKET_WEBHOOK_UUID ?? ''
            )
        );

        if (!this.configuration.validate()) {
            console.error("Could not start up the application as the configuration is incomplete!");
            process.exit(1);
        }
    }

    private registerServices() {
        this.bitbucketClient = new BitbucketClient(this.configuration.bitbucket);
        this.pullRequestService = new PullRequestService(this.eventBus, this.bitbucketClient);
    }

    private startServer() {
        this.server = new Server(this.eventBus, this.configuration);
        this.server.start();
    }
}

export default Bootstrap;