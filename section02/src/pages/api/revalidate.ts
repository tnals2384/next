import { NextApiRequest, NextApiResponse } from "next";

//localhost:3000/api/revalidate로 요청이 들어올 경우, 해당 페이지를 재생성해줌
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (err) {
    void err;
    res.status(500).send("Revalidate Failed");
  }
}
