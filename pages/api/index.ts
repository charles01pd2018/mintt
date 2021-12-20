// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// types
import type { NextApiRequest, NextApiResponse } from 'next'

export default (
  req: NextApiRequest, 
  res: NextApiResponse,
) => {
  res.status(200).json({ secret: 'merry christmas!' })
}
