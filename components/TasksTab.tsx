'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { taskWhitePaws, taskBlum } from '@/images'; // این import ها همچنان در اینجا قرار می‌گیرند

const TasksTab = () => {
  const [activeTab, setActiveTab] = useState<'in-game' | 'partners' | 'limited'>('in-game');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const [limitedTimers, setLimitedTimers] = useState<{ [key: string]: number }>({});

  const inGameTasks = [
    { id: 'task1', title: 'Put 🕷 in your name', reward: '+ 5,000 PAWS', link: '', image: 'daST.png' },
    { id: 'task2', title: 'Follow Youtube NATOI', reward: '+ 2,000 NATOI', link: 'https://youtube.com/@NATOI_tpg?si=sDLzGdTK1t8I7c1N', image: 'youtube.6cd3c9a8.png' },
    { id: 'task3', title: 'Boost NATOI channel', reward: '+ 2,500 NATOI', link: 'https://t.me/boost/Rabbit_coinR', image: 'bost.png' },
  ];

  const partnerTasks = [
    { id: 'partner1', title: 'Join Binance', reward: '+ 10,000 NATOI', link: 'https://www.binance.com', image: 'binance-logo.png' },
    { id: 'partner2', title: 'Join Whale Chanel', reward: '+ 10,000 NATOI', link: 'https://t.me/WhAlE_ChAnEl', image: 'telegram.d70bd4ea.png' },
  ];

  const limitedTasks = [
    { id: 'limited1', title: 'Play Paws', reward: '+ 15,000 NATOI', link: 'https://t.me/PAWSOG_bot/PAWS?startapp=eHsemNn8', image: 'paws.png' },
    { id: 'limited2', title: 'Play Buzzit', reward: '+ 20,000 NATOI', link: 'https://t.me/buzzit1_bot/buzzit?startapp=1725757055', image: 'Buzzit.png' },
    { id: 'limited3', title: 'Play Not Coin', reward: '+ 25,000 NATOI', link: 'https://t.me/notcoin_bot?start=er_11170585', image: 'not.png' },
  ];

  useEffect(() => {
    const savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    const savedTimers = JSON.parse(localStorage.getItem('timers') || '{}');
    const savedLimitedTimers = JSON.parse(localStorage.getItem('limitedTimers') || '{}');
    setCompletedTasks(savedCompletedTasks);
    setTimers(savedTimers);
    setLimitedTimers(savedLimitedTimers);
  }, []);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    localStorage.setItem('timers', JSON.stringify(timers));
    localStorage.setItem('limitedTimers', JSON.stringify(limitedTimers));
  }, [completedTasks, timers, limitedTimers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLimitedTimers((prev) => {
        const updatedTimers = { ...prev };
        Object.keys(updatedTimers).forEach((taskId) => {
          const timeLeft = Math.max(0, updatedTimers[taskId] - Date.now());
          if (timeLeft <= 0) {
            delete updatedTimers[taskId];
          } else {
            updatedTimers[taskId] = timeLeft;
          }
        });
        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds: number) => {
    if (milliseconds <= 0) return '00:00:00';

    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleStart = (taskId: string, link: string) => {
    if (completedTasks.includes(taskId)) return;

    window.open(link, '_blank');

    const endTime = Date.now() + 5000; // برای مثال، ۵ ثانیه
    setTimers((prev) => ({ ...prev, [taskId]: endTime }));
    setLimitedTimers((prev) => ({
      ...prev,
      [taskId]: Date.now() + 48 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000, // زمان شروع تایمر از 48 ساعت
    }));

    const timerInterval = setInterval(() => {
      const timeLeft = Math.max(0, endTime - Date.now());
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        setCompletedTasks((prev) => [...prev, taskId]);
        setTimers((prev) => {
          const updatedTimers = { ...prev };
          delete updatedTimers[taskId];
          return updatedTimers;
        });
      } else {
        setTimers((prev) => ({ ...prev, [taskId]: timeLeft }));
      }
    }, 1000);
  };

  const currentTasks = activeTab === 'in-game' ? inGameTasks : activeTab === 'partners' ? partnerTasks : limitedTasks;

  return (
    <div className="quests-tab-con px-4 transition-all duration-300">
      <div className="pt-8">
        <h1 className="text-3xl font-bold mb-2">TASKS</h1>
        <div>
          <span className="text-xl font-semibold">GET REWARDS </span>
          <span className="text-xl text-gray-500">FOR</span>
        </div>
        <div className="text-xl text-gray-500">COMPLETING QUESTS</div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-0 mt-6">
        <button
          onClick={() => setActiveTab('in-game')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-300 ${activeTab === 'in-game' ? 'bg-white text-black' : 'bg-[#151515] text-white'}`}
        >
          In-game
        </button>
        <button
          onClick={() => setActiveTab('partners')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-300 ${activeTab === 'partners' ? 'bg-white text-black' : 'bg-[#151515] text-white'}`}
        >
          Partners
        </button>
        <button
          onClick={() => setActiveTab('limited')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-300 ${activeTab === 'limited' ? 'bg-white text-black' : 'bg-[#151515] text-white'}`}
        >
          Limited
        </button>
      </div>

      {/* Tasks List */}
      <div className="mt-4 mb-20 bg-[#151516] rounded-xl">
        {currentTasks.map((task) => (
          <div key={task.id} className="flex items-center">
            <div className="w-[72px] flex justify-center">
              <div className="w-10 h-10">
                {/* نمایش تصویر با استفاده از مسیر فایل در public */}
                <Image src={`/images/${task.image}`} alt={task.title} width={40} height={40} className="w-full h-full object-contain" />
              </div>
            </div>
            <div className={`flex items-center justify-between w-full py-4 pr-4 ${task.id !== currentTasks[0].id && 'border-t border-[#222622]'}`}>
              <div>
                <div className="text-[17px]">{task.title}</div>
                <div className="text-gray-400 text-[14px]">{task.reward}</div>
                {activeTab === 'limited' && (
                  <div className="text-sm text-white">
                    Time Left: {limitedTimers[task.id] ? formatTime(limitedTimers[task.id] - Date.now()) : '48:00:00'}
                  </div>
                )}
              </div>
              {completedTasks.includes(task.id) ? (
                <span className="text-green-500 font-bold">Complete</span>
              ) : (
                <button
                  className="h-8 bg-white text-black px-4 rounded-full text-sm font-medium flex items-center"
                  onClick={() => handleStart(task.id, task.link)}
                >
                  {timers[task.id] ? `Time Left: ${Math.ceil(timers[task.id] / 1000)}s` : 'Start'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksTab;
