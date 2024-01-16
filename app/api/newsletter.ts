import { NextApiRequest, NextApiResponse } from "next";
import NewsletterSubscriber from "@/model/NewsletterSubscriber";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;
      const existingSubscriber = await NewsletterSubscriber.findOne({
        email,
      });
      if (existingSubscriber) {
        return res.status(400).json({ error: "Email already registered" });
      }

      //Save the subscribers email to the database
      const subscriber = await NewsletterSubscriber.create({ email });
      return res
        .status(201)
        .json({ message: "Subscriber subscribed to newsletter", subscriber });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while sending the newsletter." });
    }
  }
  res.status(404).end();
}
