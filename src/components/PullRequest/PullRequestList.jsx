import React from 'react';
import PullRequestService from '../../services/pull-request.service';

const PullRequestList = (props) => {
    const [pullRequestLoader, setPullRequestLoader] = React.useState(false);
    const [pullRequestListError, setPullRequestListError] = React.useState(false);
    const [pullRequestList, setPullRequestList] = React.useState([]);

    const getPullRequestList = async () => {
        setPullRequestLoader(true);
        try {
            const pullRequestResp = await PullRequestService.getPullRequest();
            setPullRequestList(pullRequestResp.data);
        } catch (err) {
            console.error("Error fetching list of pull requests", err);
            setPullRequestListError(true);
        } finally {
            setPullRequestLoader(false);
        }
    };

    React.useEffect(() => {
        getPullRequestList();
    }, []);

    if (pullRequestLoader) {
        return (
            <>Loading Pull Requests...</>
        )
    }

    if (pullRequestListError) {
        return <>Error Loading Pull Requests, Please try again!!</>
    }
    return <>Pull Request List here...</>
}

export default PullRequestList;