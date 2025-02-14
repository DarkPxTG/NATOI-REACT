// components/HomeTab.tsx

/**
 * This project was developed by Nikandr Surkov.
 * 
 * YouTube: https://www.youtube.com/@NikandrSurkov
 * GitHub: https://github.com/nikandr-surkov
 */

'use client'

import Wallet from '@/icons/Wallet'
import Community from '@/icons/Community'
import Star from '@/icons/Star'
import Image from 'next/image'
import ArrowRight from '@/icons/ArrowRight'
import { sparkles } from '@/images'
import Snowfall from 'react-snowfall' // اضافه کردن کتابخانه برف

const HomeTab = () => {
    return (
        <div className={`home-tab-con transition-all duration-300`}>
            {/* اضافه کردن افکت برف */}
            <Snowfall 
                snowflakeCount={100} // تعداد برف‌ها
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} 
            />
            
            {/* Connect Wallet Button */}
            <button className="w-full flex justify-center mt-8">
                <div className="bg-[#007aff] text-white px-3 py-0.5 rounded-full flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    <span>Connect wallet</span>
                </div>
            </button>

            {/* PAWS Balance */}
            <div className="flex flex-col items-center mt-8">
                {/* عکس سفارشی از پوشه public/images */}
                <Image 
                    src="/images/not.png"  // مسیر واقعی عکس رو اینجا بذار
                    alt="Custom Logo" 
                    width={112} 
                    height={112} 
                    className="mb-4"
                />
                <div className="flex items-center gap-1 text-center">
                    <div className="text-6xl font-bold mb-1">4,646</div>
                    <div className="text-white text-2xl">NATOI</div>
                </div>
                <div className="flex items-center gap-1 text-[#a19f9f] rounded-full px-4 py-1.5 mt-2 cursor-pointer">
                    <span>NATOI</span>
                    <Image
                        src={sparkles}
                        alt="sparkles"
                        width={18}
                        height={18}
                    />
                    <span>RANK</span>
                    <ArrowRight className="w-6 h-6" />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 px-4 mt-8 mb-8">
                <button className="shine-effect w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-medium">
                        <Community className="w-8 h-8" />
                        <span>Join our community</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                </button>

                <button className="w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-medium">
                        <Star className="w-8 h-8" />
                        <span>Check your rewards</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                </button>
            </div>
        </div>
    )
}

export default HomeTab
