import { NeynarAPIClient, FeedType, FilterType } from "@neynar/nodejs-sdk";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Using an environment variable for the port
const client = new NeynarAPIClient(process.env.NEYNAR_KEY ?? "undefined");

app.get("/feed/", async (req, res) => {
  try {
    const feed = await client.fetchFeed(FeedType.Filter, {
      filterType: FilterType.GlobalTrending,
      cursor: req.query.cursor,
    });
    return res.send(feed);
  } catch (error) {
    return res.json({
      error: error.message,
      status: error.status,
    });
  }
});

app.get("/thread/:hash", async (req, res) => {
  try {
    const thread = await client.fetchAllCastsInThread(req.params.hash);
    return res.send(thread);
  } catch (error) {
    return res.json({
      error: error.message,
      status: error.status,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
