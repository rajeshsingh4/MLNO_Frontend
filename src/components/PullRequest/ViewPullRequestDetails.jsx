import React from 'react';
import PullRequestService from '../../services/pull-request.service';

const ViewPullRequestDetails = (props) => {
    const [pullRequestDetailsLoader, setPullRequestDetailsLoader] = React.useState(false);
    const [pullRequestDetailsError, setPullRequestDetailsError] = React.useState(false);
    const [pullRequestDetails, setPullRequestDetails] = React.useState([]);

    const getPullRequestListDetails = async () => {
        setPullRequestDetailsLoader(true);
        try {
            const pullRequestResp = await PullRequestService.getPullRequestById();
            setPullRequestDetails(pullRequestResp.data);
        } catch (err) {
            console.error("Error fetching pull request details ", err);
            setPullRequestDetailsError(true);
        } finally {
            setPullRequestDetailsLoader(false);
        }
    };

    React.useEffect(() => {
        getPullRequestListDetails();
    }, []);

    if (pullRequestDetailsLoader) {
        return (
            <>Loading Pull Requests Details...</>
        )
    }

    if (pullRequestDetailsError) {
        return <>Error Loading Pull Requests Details, Please try again!!</>
    }
    return <>Pull Request Details here...</>
}

export default ViewPullRequestDetails;