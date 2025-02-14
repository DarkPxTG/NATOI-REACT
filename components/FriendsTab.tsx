import { useState, useEffect } from 'react';
import * as utils from '@telegram-apps/sdk'; // استفاده از utils به جای initUtils
import Image from 'next/image';
import { paws } from '@/images';

interface ReferralSystemProps {
  initData: string;
  userId: string;
  startParam: string;
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ initData, userId, startParam }) => {
  const [referrals, setReferrals] = useState<string[]>([]);
  const [referrer, setReferrer] = useState<string | null>(null);
  const INVITE_URL = "https://t.me/DarkCoiin_bot/start";

  useEffect(() => {
    const checkReferral = async () => {
      if (startParam && userId) {
        try {
          const response = await fetch('/api/referrals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, referrerId: startParam }),
          });
          if (!response.ok) throw new Error('Failed to save referral');
        } catch (error) {
          console.error('Error saving referral:', error);
        }
      }
    };

    const fetchReferrals = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/referrals?userId=${userId}`);
          if (!response.ok) throw new Error('Failed to fetch referrals');
          const data = await response.json();
          setReferrals(data.referrals);
          setReferrer(data.referrer);
        } catch (error) {
          console.error('Error fetching referrals:', error);
        }
      }
    };

    checkReferral();
    fetchReferrals();
  }, [userId, startParam]);

  const handleCopyLink = () => {
    // ساخت لینک با userId و startParam
    const inviteLink = `${INVITE_URL}?startapp=${userId}`;
    navigator.clipboard.writeText(inviteLink);
    alert('Invite link copied to clipboard!');
  };

  return (
    <div className={`friends-tab-con px-4 pb-24 transition-all duration-300`}>
      {/* Header Text */}
      <div className="pt-8 space-y-1">
        <h1 className="text-3xl font-bold">INVITE FRIENDS</h1>
        <div className="text-xl">
          <span className="font-semibold">SHARE</span>
          <span className="ml-2 text-gray-500">YOUR INVITATION</span>
        </div>
        <div className="text-xl">
          <span className="text-gray-500">LINK &</span>
          <span className="ml-2 font-semibold">GET 35%</span>
          <span className="ml-2 text-gray-500">OF</span>
        </div>
        <div className="text-gray-500 text-xl">FRIEND'S POINTS</div>
      </div>

      {/* Referrer Info */}
      {referrer && (
        <p className="text-green-500 mt-4">You were referred by user {referrer}</p>
      )}

      {/* Empty State or Referral List */}
      <div className="mt-8 mb-2">
        <div className="bg-[#151516] w-full rounded-2xl p-8 flex flex-col items-center">
          {referrals.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-white">Your Referrals</h2>
              <ul className="w-full">
                {referrals.map((referral, index) => (
                  <li key={index} className="text-xl text-[#8e8e93] bg-gray-800 p-4 mb-2 rounded">
                    User {referral}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <Image
                src={paws}
                alt="Paws"
                width={171}
                height={132}
                className="mb-4"
              />
              <p className="text-xl text-[#8e8e93] text-center">
                There is nothing else.<br />
                Invite to get more rewards.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Fixed Copy Button */}
      <div className="fixed bottom-[80px] left-0 right-0 py-4 flex justify-center">
        <div className="w-full max-w-md px-4">
          <button 
            onClick={handleCopyLink}
            className="w-full bg-black text-white py-4 rounded-xl text-lg font-medium border-2 border-white"
          >
            Copy Invite Link
          </button>
        </div>
      </div>

    </div>
  );
};

export default ReferralSystem;
