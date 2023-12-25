export const actionList = [
    {
        label: 'Destroy',
        value: 'destroy'
    },
    {
        label: 'HOLD',
        value: 'hold'
    },
    {
        label: 'Accelerate',
        value: 'accelerate'
    },
    {
        label: 'Re-direct',
        value: 'redirect'
    },
    {
        label: 'Change courier',
        value: 'changecourier'
    },
    {
        label: 'New value',
        value: 'newvalue'
    },
    {
        label: 'Block Card (lost in transit)',
        value: 'blockcard'
    },
    {
        label: 'Reject Record (could be a range of records separated by - or ,)',
        value: 'rejectrecord'
    },
    {
        label: 'Reject File',
        value: 'rejectfile'
    }
];

export const actionListMap = {
    destroy: 'Destroy',
    hold: 'HOLD',
    accelerate: 'Accelerate',
    redirect: 'Re-direct',
    changecourier: 'Change courier',
    newvalue: 'New value',
    blockcard: 'Block Card (lost in transit)',
    rejectrecord: 'Reject Record (could be a range of records separated by - or ,)',
    rejectfile: 'Reject File'
};

export const modeList = [
    {
        label: 'Phone',
        value: 'phone'
    },
    {
        label: 'E-mail',
        value: 'email'
    },
    {
        label: 'WhatsApp',
        value: 'whatsapp'
    },
    {
        label: 'SMS',
        value: 'sms'
    },
    {
        label: 'In-Person',
        value: 'inperson'
    },
    {
        label: 'Other',
        value: 'other'
    }
];

export const modeLsitMap = {
    phone: 'Phone',
    email: 'E-mail',
    whatsapp: 'WhatsApp',
    sms: 'SMS',
    inperson: 'In-Person',
    other: 'Other'
}

export const breadcrumbNameMap = {
    '/bureau-comparision': 'Bureau Comparision',
    '/bureau-reports': 'Pending Bureau Reports',
    '/files': 'File Wise Tracking',
    '/files:/id': 'File Wise Tracking Cards',
    '/file-tat-report': 'File TAT Report',
    '/pull-request': 'Pull Request',
    '/pull-request/create': 'Create Pull Request',
    '/pull-request/manage': 'Manage Pull Request',
    '/pull-request/view/:id': 'View Pull Request',
    '/bureau-pull-request/': 'Bureau Pull Request',
    '/bureau-pull-request/create': 'View Pull Request',
    '/bureau-pull-request/manage': 'Manage Pull Request',
    '/bureau-pull-request/view/:id': 'View Pull Request',
};
