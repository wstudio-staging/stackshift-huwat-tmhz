import { nanoid } from "nanoid";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ message: "POST method only" });
  }

  const REFERER_URL = req.headers.referer || process.env.NEXT_PUBLIC_SITE_URL;
  const payload = req.body;

  const { data, id } = JSON.parse(payload);
  data["_nonce"] = nanoid(23);

  const response = await fetch(
    process.env.WEBRIQ_FORMS_API_URL ||
      `https://ndzsixva5l.execute-api.us-west-2.amazonaws.com/pagebuilder/forms/${id}/submissions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        referer: REFERER_URL,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    return res.status(400).json({ message: "Error submitting form!" });
  }

  const responseData = await response.json();

  return res.json({ message: "OK! Form submitted successfully!" });
};
