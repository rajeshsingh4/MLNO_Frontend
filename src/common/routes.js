export const ROUTES_LIST = [
    {
        title: 'Bureau Comparision',
        label: 'Bureau Comparision',
        path: '/bureau-comparision',
        exact: true,
        defaultColor: 'inherit',
<<<<<<< HEAD
        roles:['moderator']
=======
        deafultBgColor: '#ffffff',
        selectedColor: '#1976d2',
        selectedBgColor: '#f0f8ff',
>>>>>>> b6581f09ce797cdd27cf8661e36631e9cb530956
    },
    {
        title: 'Pending Bureau Reports',
        label: 'Pending Bureau Reports',
        path: '/bureau-reports',
        exact: true,
<<<<<<< HEAD
        roles:['admin']
=======
        defaultColor: 'inherit',
        deafultBgColor: '#ffffff',
        selectedColor: '#1976d2',
        selectedBgColor: '#f0f8ff',
>>>>>>> b6581f09ce797cdd27cf8661e36631e9cb530956
    },
    {
        title: 'File Wise Tracking',
        label: 'File Wise Tracking',
        path: '/files',
        exact: true,
<<<<<<< HEAD
        roles:['admin','user','moderator']
=======
        defaultColor: 'inherit',
        deafultBgColor: '#ffffff',
        selectedColor: '#1976d2',
        selectedBgColor: '#f0f8ff',
>>>>>>> b6581f09ce797cdd27cf8661e36631e9cb530956
    },
    {
        title: 'File Wise Tracking Cards',
        label: 'File Wise Tracking Cards',
        path: '/files/:id',
        hidden: true,
<<<<<<< HEAD
        roles:['admin','user','moderator']
=======
        defaultColor: 'inherit',
        deafultBgColor: '#ffffff',
        selectedColor: '#1976d2',
        selectedBgColor: '#f0f8ff',
>>>>>>> b6581f09ce797cdd27cf8661e36631e9cb530956
    },
    {
        title: 'File TAT Report',
        label: 'File TAT Report',
        path: '/file-tat-report',
        exact: true,
<<<<<<< HEAD
        roles:['admin','user','moderator']
=======
        defaultColor: 'inherit',
        deafultBgColor: '#ffffff',
        selectedColor: '#1976d2',
        selectedBgColor: '#f0f8ff',
>>>>>>> b6581f09ce797cdd27cf8661e36631e9cb530956
    },
    {
        title: 'Banker Pull Request',
        description: 'Banker creates/views pull request',
        label: 'Pull Request',
<<<<<<< HEAD
        path: '/pull-request',
        exact: true,
        roles:['user']
=======
        defaultColor: 'inherit',
        deafultBgColor: '#ffffff',
        childRoutes: [
            {
                title: 'Create Pull Request',
                label: 'Create Pull Request',
                path: '/pull-request/create',
                index: true,
                exact: true,
                defaultColor: 'inherit',
                deafultBgColor: '#ffffff',
                selectedColor: '#1976d2',
                selectedBgColor: '#f0f8ff',
            },
            {
                title: 'Manage Pull Request',
                label: 'Manage Pull Request',
                path: '/pull-request/manage',
                exact: true,
                defaultColor: 'inherit',
                deafultBgColor: '#ffffff',
                selectedColor: '#1976d2',
                selectedBgColor: '#f0f8ff',
            },
            {
                title: 'View Pull Request',
                label: 'View Pull Request',
                path: '/pull-request/view/:id',
                hidden: true,
                defaultColor: 'inherit',
                deafultBgColor: '#ffffff',
                selectedColor: '#1976d2',
                selectedBgColor: '#f0f8ff',
            }
        ]
    },
    {
        title: 'Bureau Pull Request',
        description: 'Bureau views/takes action on pull request',
        label: 'Bureau Pull Request',
        defaultColor: 'inherit',
        deafultBgColor: '#ffffff',
        childRoutes: [
            {
                title: 'View Pull Request',
                label: 'View Pull Request',
                path: '/bureau-pull-request/create',
                index: true,
                exact: true,
                defaultColor: 'inherit',
                deafultBgColor: '#ffffff',
                selectedColor: '#1976d2',
                selectedBgColor: '#f0f8ff',
            },
            {
                title: 'Manage Pull Request',
                label: 'Manage Pull Request',
                path: '/bureau-pull-request/manage',
                exact: true,
                defaultColor: 'inherit',
                deafultBgColor: '#ffffff',
                selectedColor: '#1976d2',
                selectedBgColor: '#f0f8ff',
            },
            {
                title: 'View Pull Request',
                label: 'View Pull Request',
                path: '/bureau-pull-request/view/:id',
                hidden: true,
                defaultColor: 'inherit',
                deafultBgColor: '#ffffff',
                selectedColor: '#1976d2',
                selectedBgColor: '#f0f8ff',
            }
        ]
>>>>>>> b6581f09ce797cdd27cf8661e36631e9cb530956
    },
]