'use client'

import { useTab } from '@/contexts/TabContext'
import HomeTab from './HomeTab'
import LeaderboardTab from './LeaderboardTab'
import FriendsTab from './ReferralSystem'
import TasksTab from './TasksTab'

// اضافه کردن مقادیر initData، userId و startParam
const TabContainer = () => {
    const { activeTab } = useTab()

    // این مقادیر را می‌توانید از state، context یا props دریافت کنید
    const initData = 'someInitData';  // مقدار initData
    const userId = 'user123';         // مقدار userId
    const startParam = 'referrer123'; // مقدار startParam

    return (
        <div className="flex-1 overflow-hidden max-w-md mx-auto pt-[44px] pb-[72px]">
            <div className={`${activeTab === 'home' ? 'is-show' : 'is-hide'}`}>
                <HomeTab />
            </div>
            <div className={`${activeTab === 'leaderboard' ? 'is-show' : 'is-hide'}`}>
                <LeaderboardTab />
            </div>
            {/* ارسال مقادیر به کامپوننت FriendsTab */}
            <div className={`${activeTab === 'friends' ? 'is-show' : 'is-hide'}`}>
                <FriendsTab 
                    initData={initData}
                    userId={userId}
                    startParam={startParam}
                />
            </div>
            <div className={`${activeTab === 'earn' ? 'is-show' : 'is-hide'}`}>
                <TasksTab />
            </div>
        </div>
    )
}

export default TabContainer
