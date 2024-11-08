import { updateBackground } from '@/lib/services/restaurant';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        res.setHeader('Allow', ['PUT']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { id } = req.query;
    const { background } = req.body;

    const result = await updateBackground(id as string, background);

    if (result && 'error' in result) {
        return res.status(result.status).json({ error: result.error });
    }

    res.status(200).json(result);
}