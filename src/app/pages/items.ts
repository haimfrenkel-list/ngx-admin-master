import { NbMenuItem } from '@nebular/theme';


export class Items {
    role: String;
    constructor() {
    }
    investorMenu: NbMenuItem[] = [
        {
            title: 'Assets',
            icon: {icon: 'investment-opportunities', pack: 'ListIconPackage'},
            // link: '/pages/manage/investment-opportunities',
            link: '/manage/assets',
            home: true,
        },
        {
            title: 'Pending & Alerts',
            icon: { icon: 'pending', pack: 'ListIconPackage' },
            // link: '/pages/manage/pending-n-alerts',
            link: '/manage/pending-n-alerts',
            home: true,

        },
        {
            title: 'Watchlist & Simulation',
            icon: { icon: 'watchListNSimulation', pack: 'ListIconPackage' },
            // link: '/pages/manage/pending-n-alerts',
            link: '/manage/watch-list',
        },
      /* {
            title: 'Simulation',
            icon: {icon:'simulation', pack:'ListIconPackage'},
            link: '/manage/simulation',
            home: true

        },*/
        {
            title: 'Portfolio',
            icon: {icon: 'simulation', pack: 'ListIconPackage'},
            // link: '/pages/manage/holdings-investment-schedule',
            link: '/manage/holdings-investment-schedule',
            home: true,

        },
        {
            title: 'Account',
            icon: {icon: 'account', pack: 'ListIconPackage'},
            // link: '/pages/manage/account',
            link: '/manage/account',
            home: true,
        },
        // {
        //     title: 'New Policy',
        //     icon: {icon:'support', pack:'ListIconPackage'},
        //     link: '/manage/admin-new-policy',
        // },
        // {
        //     title: 'In Progress',
        //     icon: {icon:'support', pack:'ListIconPackage'},
        //     link: '/manage/admin-in-progress',
        // },
        // {
        //     title: 'Approved',
        //     icon: {icon:'support', pack:'ListIconPackage'},
        //     link: '/manage/admin-approved',
        // },
        {
            title: 'Upload Policy',
            icon: {icon: 'support', pack: 'ListIconPackage'},
            link: '/manage/policy/upload',
        },
    ];
    getMenu(): NbMenuItem[] {
        return [
            {
                title: 'Uploading Documents',
                icon: 'cloud-upload-outline',
                link: '/manage/upload',
                home: true,
            },
            {
                title: 'Data Extraction',
                icon: 'layers-outline',
                link: '/manage/ocr',
            },
            {
                title: 'General Information',
                icon: 'person-done-outline',
                link: '/manage/general-info',
            },
            {
                title: 'Impairments',
                icon: 'options-2-outline',
                link: '/manage/impairements',
            },
            {
                title: 'Medications',
                icon: 'heart-outline',
                link: '/manage/medication',
            },
            {
                title: 'Labs',
                icon: 'droplet-outline',
                link: '/manage/labs',
            },
            {
                title: 'Lifestyle',
                icon: 'tv-outline',
                link: '/manage/lifestyle',
            },
            {
                title: 'Troubleshooting',
                icon: 'shuffle-outline',
                link: '/manage/troubleshooting',
            },
            {
                title: 'Predictions',
                icon: {icon: 'investment-opportunities', pack: 'ListIconPackage'},
                link: '/manage/le',
            },
            {
                title: 'Add user',
                icon: 'plus-outline',
                link: '/manage/add',
            },
            {
                title: 'manage underwriting',
                icon: 'plus-outline',
                link: '/manage/manageUnder',
            },
        ];
    }


    getDemoMenu(): NbMenuItem[] {
        return [
            {
                title: 'Uploading Documents',
                icon: 'cloud-upload-outline',
                link: '/manage/upload',
                home: true,
            },
            {
                title: 'Data Extraction',
                icon: 'layers-outline',
                link: '/manage/ocr',
            },
            {
                title: 'General Information',
                icon: 'person-done-outline',
                link: '/manage/general-info',
            },
            {
                title: 'Impairments',
                icon: 'options-2-outline',
                link: '/manage/impairements',
            },
            {
                title: 'Medications',
                icon: 'heart-outline',
                link: '/manage/medication',
            },
            {
                title: 'Labs',
                icon: 'droplet-outline',
                link: '/manage/labs',
            },
            {
                title: 'Lifestyle',
                icon: 'tv-outline',
                link: '/manage/lifestyle',
            },
            {
                title: 'Troubleshooting',
                icon: 'shuffle-outline',
                link: '/manage/troubleshooting',
            },
            {
                title: 'Predictions',
                icon: {icon: 'investment-opportunities', pack: 'ListIconPackage'},
                link: '/manage/le',
            },
           
        ];
    }
}
