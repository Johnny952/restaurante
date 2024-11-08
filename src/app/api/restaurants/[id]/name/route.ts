import { NextApiRequest, NextApiResponse } from 'next';
import { updateName } from '@/lib/services/restaurant';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        res.setHeader('Allow', ['PUT']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { id } = req.query;
    const { name, link } = req.body;

    const result = await updateName(id as string, name, link);

    if (result && 'error' in result) {
        return res.status(result.status).json({ error: result.error });
    }

    res.status(200).json(result);
}