// pages/api/flower.ts
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;
  try {
    const response = await axios.get(`https://trefle.io/api/v1/species/search`, {
      params: {
        q,
        limit: 10,
        token: "hp-otrN7Xzzg-pLNwoo5zIxArVbOUMm93r4_5brSjbA" // store token in .env
      },
    });
    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
