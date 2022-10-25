import fs from 'fs';
import BitbucketClientConfiguration from './bitbucket_client_configuration';

class BitbucketClient {

    constructor(configuration: BitbucketClientConfiguration) {
    }

}

export default BitbucketClient;

// GET /2.0/repositories/{workspace}/{repo_slug}/effective-default-reviewers
// PUT /2.0/repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}