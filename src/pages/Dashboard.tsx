import React, { useState } from 'react';
import { FiMapPin, FiAlertCircle } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import MenuButton from '../components/MenuButton';
import OrphanagesDashboard from './OrphanagesDashboard';

import '../styles/pages/dashboard.css';

export default function Dashboard() {
    const [isActiveScreenOrphanages, setIsActiveScreenOrphanage] = useState(true);
    const [isActiveScreenApprovalPending, setIsActiveScreenApprovalPending] = useState(false);

    const screens = [setIsActiveScreenOrphanage, setIsActiveScreenApprovalPending]

    function handleActiveScreenOrphanage() {
        screens.forEach(screen => {
            screen(false);
        });
        setIsActiveScreenOrphanage(true);
    }

    function handleActiveScreenApprovalPending() {
        screens.forEach(screen => {
            screen(false);
        });
        setIsActiveScreenApprovalPending(true);
    }

    return (
        <div className="dashboard-container" >
            <Sidebar hasSignOut={ true } >
                <MenuButton
                    icon={ FiMapPin }
                    isActive={ isActiveScreenOrphanages }
                    onClick={ handleActiveScreenOrphanage }
                />

                <MenuButton
                    icon={ FiAlertCircle }
                    isActive={ isActiveScreenApprovalPending }
                    onClick={ handleActiveScreenApprovalPending }
                />
            </Sidebar>

            <main className="dashboard-content" >
                { isActiveScreenOrphanages && <OrphanagesDashboard />}
            </main>
        </div>
    );
}