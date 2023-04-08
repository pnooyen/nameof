import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method === "POST") {
      const {type} = req.body

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      };

      const payload = {
        model: "text-davinci-003",
        prompt: `Give me the 2 of ${type} name that fantastic and unexpected\n for male and female\nproperty meaning at least 7 words\nRETURN RESULTS AS JSON [{'gender': '', 'name': '','pronounce': '', 'meaning':''}]`,
        max_tokens: 150,
      };
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      const { choices } = await response.json();
      const results = JSON.parse(choices[0].text.replace(/\\[btnfr"\\']/g, '').replace(/'/g, '"'));
    //   console.log(results, typeof results)
      //   return new Response(JSON.stringify(results), {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      res.status(200).send(results);
    } else {
      throw new Error("failed to load data");
    }
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
