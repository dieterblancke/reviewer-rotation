import EventBus from '../event/eventbus';
import EventType from "../event/eventtype";
import EventListener from "../event/eventlistener";
import Event from '../event/event';

class PullRequestService {

    constructor(eventBus: EventBus) {
        eventBus.on(EventType.PULL_REQUEST_CREATED, new PullRequestListener(this));
    }

    assignReviewer(pullRequestId: number, repositoryUuid: string, workspaceUuid: string) {
        console.log(pullRequestId, repositoryUuid, workspaceUuid);
        //        /2.0/repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}

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

        this.pullRequestService.assignReviewer(pullRequestId, repositoryUuid, workspaceUuid);
    }
}

export default PullRequestService;