import React from 'react'
import PagesFirst from './PagesFirst'
import PagesSecond from './PagesSecond'
import PageThird from './PageThird'
import PagesFourth from './PagesFourth'
import PagesFifth from './PagesFifth'
import PagesSixth from './PagesSixth'
import PagesSeventh from './PagesSeventh'
import PagesEighth from './PagesEighth'
import PagesNinth from './PagesNinth'
import PagesTenth from './PagesTenth'
import PagesEleventh from './PagesEleventh'

const AdminRoute = ({ routes, admin, stats }) => {
    switch (routes) {
        case "PageThird":
            return <PageThird admin={admin} stats={stats} />;

        case "PagesSecond":
            return <PagesSecond admin={admin} stats={stats} />;

        case "PagesFourth":
            return <PagesFourth admin={admin} stats={stats} />;

        case "PagesFifth":
            return <PagesFifth admin={admin} stats={stats} />;

        case "PagesSixth":
            return <PagesSixth admin={admin} stats={stats} />;

        case "PagesSeventh":
            return <PagesSeventh admin={admin} stats={stats} />;

        case "PagesEighth":
            return <PagesEighth admin={admin} stats={stats} />;

        case "PagesNinth":
            return <PagesNinth admin={admin} stats={stats} />;

        case "PagesTenth":
            return <PagesTenth admin={admin} stats={stats} />;

        case "PagesEleventh":
            return <PagesEleventh admin={admin} stats={stats} />;

        default:
            return <PagesFirst admin={admin} stats={stats} />;
    }
}

export default AdminRoute