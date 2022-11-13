import fs from 'fs';
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {BitbucketConfiguration} from '../configuration/configuration';

class BitbucketClient {

    private readonly requestClient: AxiosInstance;

    constructor(configuration: BitbucketConfiguration) {
        this.requestClient = axios.create({
            baseURL: 'https://api.bitbucket.org',
            headers: {
                common: {
                    'Authorization': 'Basic ' + Buffer.from(`${configuration.username}:${configuration.password}`).toString('base64')
                }
            }
        });
    }

    public async getDefaultReviewers(workspaceUuid: string, repoUuid: string): Promise<string[]> {
        const response: AxiosResponse = await this.requestClient.get(`/2.0/repositories/${workspaceUuid}/${repoUuid}/effective-default-reviewers`);
        const reviewerUuids: string[] = [];

        for (let value of response.data.values) {
            reviewerUuids.push(value.user.uuid);
        }

        return reviewerUuids;
    }

    public async updatePullRequest(workspaceUuid: string, repoUuid: string, pullRequestId: number) {
        const response: AxiosResponse = await this.requestClient.put(`/2.0/repositories/${workspaceUuid}/${repoUuid}/pullrequests/${pullRequestId}`);

        
    }
}

export default BitbucketClient;

// GET /2.0/repositories/{workspace}/{repo_slug}/effective-default-reviewers
// PUT /2.0/repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}