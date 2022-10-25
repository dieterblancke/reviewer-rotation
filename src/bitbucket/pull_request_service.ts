import EventBus from '../event/eventbus';
import EventType from "../event/eventtype";
import EventListener from "../event/eventlistener";
import Event from '../event/event';
import BitBucketClient from "./bitbucket_client";

class PullRequestService {

    private client: BitBucketClient;

    constructor(eventBus: EventBus, client: BitBucketClient) {
        this.client = client;

        eventBus.on(EventType.PULL_REQUEST_CREATED, new PullRequestListener(this));
    }

    public async assignReviewer(pullRequestId: number, repositoryUuid: string, workspaceUuid: string) {
        const reviewers: string[] = await this.client.getDefaultReviewers(workspaceUuid, repositoryUuid);

        // TODO: determine reviewer that hasn't gotten a ticket the longest

        console.log(pullRequestId, repositoryUuid, workspaceUuid);
        // GET /2.0/repositories/{workspace}/{repo_slug}/effective-default-reviewers
        // PUT /2.0/repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}

        // TODO: request (and cache) effective-default-reviewers and assign the one that has had the longest time since last assignment and remove the others.
    }
}

class PullRequestListener extends EventListener {

    private pullRequestService: PullRequestService;

    constructor(pullRequestService: PullRequestService) {
        super();

        this.pullRequestService = pullRequestService;
    }

    handle(event: Event): void {
        const pullRequestId: number = event.data.pullrequest.id;
        const repositoryUuid: string = event.data.repository.uuid;
        const workspaceUuid: string = event.data.repository.workspace.uuid;

        this.pullRequestService.assignReviewer(pullRequestId, repositoryUuid, workspaceUuid)
            .then(() => console.log("Successfully assigned reviewer for pull request " + pullRequestId))
            .catch(e => console.error("Could not assign reviewer for pull request " + pullRequestId, e));
    }
}

export default PullRequestService;