import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "GET method only" });
  }

  const { id } = req.query;

  let URL = `https://app.ecwid.com/api/v3/${process.env.NEXT_PUBLIC_ECWID_STORE_ID}/products`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ECWID_PUBLIC_TOKEN}`,
    },
  };

  return fetch(URL + `/${id}`, options)
    .then((res) => res.json())
    .then((json) => res.status(200).json({ result: json }))
    .catch((err) => res.status(400).json({ error: err }));
};
