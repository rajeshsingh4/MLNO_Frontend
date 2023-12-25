export const ROUTES_LIST = [
    {
        title: 'Bureau Comparision',
        label: 'Bureau Comparision',
        path: '/bureau-comparision',
        exact: true,
        defaultColor: 'inherit',
        roles:['moderator']
    },
    {
        title: 'Pending Bureau Reports',
        label: 'Pending Bureau Reports',
        path: '/bureau-reports',
        exact: true,
        roles:['admin']
    },
    {
        title: 'File Wise Tracking',
        label: 'File Wise Tracking',
        path: '/files',
        exact: true,
        roles:['admin','user','moderator']
    },
    {
        title: 'File Wise Tracking Cards',
        label: 'File Wise Tracking Cards',
        path: '/files/:id',
        hidden: true,
        roles:['admin','user','moderator']
    },
    {
        title: 'File TAT Report',
        label: 'File TAT Report',
        path: '/file-tat-report',
        exact: true,
        roles:['admin','user','moderator']
    },
    {
        title: 'Pull Request',
        label: 'Pull Request',
        path: '/pull-request',
        exact: true,
        roles:['user']
    },
]