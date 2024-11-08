import { NextApiRequest, NextApiResponse } from 'next';
import { getByLink } from '@/lib/services/restaurant';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { link } = req.query;

    switch (req.method) {
        case 'GET':
            const resultGet = await getByLink(link as string);
            if ('error' in resultGet) {
                return res.status(resultGet.status).json({ error: resultGet.error });
            }
            return res.status(200).json(resultGet);
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}