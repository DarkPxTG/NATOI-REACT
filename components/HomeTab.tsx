'use client'

import Wallet from '@/icons/Wallet'
import Community from '@/icons/Community'
import Star from '@/icons/Star'
import Image from 'next/image'
import ArrowRight from '@/icons/ArrowRight'
import { sparkles } from '@/images'
import { useEffect, useState } from 'react'

const HomeTab = () => {
    const [coins, setCoins] = useState(0)
    const [morseInput, setMorseInput] = useState('')
    const [isMorseVisible, setMorseVisible] = useState(false)
    const [usedMorseCodes, setUsedMorseCodes] = useState<string[]>([])

    // بارگذاری امتیاز از localStorage هنگام بارگذاری کامپوننت
    useEffect(() => {
        const savedCoins = localStorage.getItem('coins')
        if (savedCoins) {
            setCoins(Number(savedCoins))
        }

        const savedUsedMorseCodes = localStorage.getItem('usedMorseCodes')
        if (savedUsedMorseCodes) {
            setUsedMorseCodes(JSON.parse(savedUsedMorseCodes))
        }
    }, [])

    const handleMorseSubmit = () => {
        const correctMorseCode = '.... - .. - ....'

        if (morseInput === correctMorseCode) {
            if (usedMorseCodes.includes(morseInput)) {
                alert('This Morse Code has already been used!')
            } else {
                const newCoins = coins + 1000
                setCoins(newCoins)
                setUsedMorseCodes([...usedMorseCodes, morseInput])

                // ذخیره امتیاز و کدهای استفاده شده در localStorage
                localStorage.setItem('coins', newCoins.toString())
                localStorage.setItem('usedMorseCodes', JSON.stringify([...usedMorseCodes, morseInput]))

                alert('You gained 1K points!')
            }
        } else {
            alert('Invalid Morse Code! Check Chanel')
        }

        setMorseInput('')
        setMorseVisible(false)
    }

    const formatCoins = (value: number) => {
        return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value
    }

    const handleConnectWallet = () => {
        alert('Coming Soon')
    }

    return (
        <div className="home-tab-con transition-all duration-300 relative">
            {/* Morse Code Button */}
            <div className="absolute top-1 right-1 z-10">
                <button
                    onClick={() => setMorseVisible(!isMorseVisible)}
                    className="bg-[#3a3838] text-white px-3 py-1 rounded-full"
                >
                    Morse Code
                </button>
            </div>

            {isMorseVisible && (
                <div className="absolute top-10 right-2 bg-[#1e1e1e] p-4 rounded-lg z-20">
                    <input
                        type="text"
                        value={morseInput}
                        onChange={(e) => setMorseInput(e.target.value)}
                        placeholder="Enter Morse Code"
                        className="w-full p-2 rounded bg-[#2d2d2e] text-white mb-2"
                    />
                    <button
                        onClick={handleMorseSubmit}
                        className="w-full bg-[#007aff] text-white py-1 rounded"
                    >
                        Submit
                    </button>
                </div>
            )}

            <button onClick={handleConnectWallet} className="w-full flex justify-center mt-8 relative z-10">
                <div className="bg-[#007aff] text-white px-3 py-1 rounded-full flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    <span>Connect Wallet</span>
                </div>
            </button>

            <div className="flex flex-col items-center mt-8 relative z-10">
                <Image
                    src="/images/not.png"
                    alt="Custom Logo"
                    width={112}
                    height={112}
                    className="mb-4"
                />
                <div className="flex items-center gap-1 text-center">
                    <div className="text-6xl font-bold mb-1">{formatCoins(coins)}</div>
                    <div className="text-white text-2xl">NATOI</div>
                </div>
                <div className="flex items-center gap-1 text-[#a19f9f] rounded-full px-4 py-1.5 mt-2 cursor-pointer">
                    <span>NATOI</span>
                    <Image src={sparkles} alt="sparkles" width={18} height={18} />
                    <span>RANK</span>
                    <ArrowRight className="w-6 h-6" />
                </div>
            </div>

            <div className="space-y-3 px-4 mt-8 mb-8 relative z-10">
    {/* دکمه Join Community */}
    <button className="shine-effect w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-2 flex items-center justify-between max-w-[500px] mx-auto">
        <div className="flex items-center gap-3 font-medium">
            <Community className="w-8 h-8" />
            <span>Join our Community</span>
        </div>
        <ArrowRight className="w-6 h-6 text-gray-400" />
    </button>

    {/* دکمه Check Rewards */}
    <button className="w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-2 flex items-center justify-between max-w-[700px] mx-auto">
        <div className="flex items-center gap-3 font-medium">
            <Star className="w-8 h-8" />
            <span>Check your Rewards</span>
        </div>
        <ArrowRight className="w-6 h-6 text-gray-400" />
    </button>
</div>

        </div>
    )
}

export default HomeTab
