import { NextApiRequest, NextApiResponse } from 'next';

// یک دیتابیس فرضی (برای مثال از یک آرایه استفاده می‌کنیم)
let referralsDatabase: { [key: string]: string[] } = {}; // ذخیره رفرال‌ها بر اساس userId

// API برای ثبت و دریافت رفرال‌ها
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // ثبت رفرال
    const { userId, referrerId } = req.body;

    if (!userId || !referrerId) {
      return res.status(400).json({ message: 'User ID and Referrer ID are required.' });
    }

    // بررسی وجود رفرال‌ها برای کاربر
    if (!referralsDatabase[userId]) {
      referralsDatabase[userId] = [];
    }

    // ثبت رفرال
    referralsDatabase[userId].push(referrerId);

    return res.status(200).json({ message: 'Referral saved successfully' });
  }

  if (req.method === 'GET') {
    // دریافت رفرال‌ها برای یک کاربر خاص
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const referrals = referralsDatabase[userId as string] || [];

    return res.status(200).json({ referrals, referrer: referrals[0] || null }); // برگرداندن رفرال‌ها و اولین رفرر
  }

  // متد غیرمجاز
  res.status(405).json({ message: 'Method Not Allowed' });
}
