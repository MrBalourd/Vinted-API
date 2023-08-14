import express from "express";
import { searchMembers } from "../../service/searchMembers.js";
import { searchItems } from "../../service/searchItems.js";
import { getItemInfo } from "../../service/getItemInfo.js";
import { getMemberItems } from "../../service/getMemberItems.js";
import { getMemberInfo } from "../../service/getMemberInfo.js";
import {getMemberRates} from "../../service/getMemberRates.js";
const router = express.Router();

router.post('/api/items', async (req, res) => {
  const query = req.body;
  if (!query || !query.text || !query.currency || !query.order) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const data = await searchItems(query);
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' + error });
  }
});

router.post('/api/item', async (req, res) => {
  const query = req.body;
  if (!query || !query.item) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    // Fetch search results using the provided query
    console.log(query)

    const data = await getItemInfo(query);

    console.log(data)

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' + error });
  }
});

router.get("/api/members/search", async (req, res) => {
  const search = req.query.query.replace(/'/g, '').replace(/"/g, '');
  if (search === undefined || search === null || search.length === 0 || search === " " || search === ' ') {
    res.send({ error: true, message: "Please enter a search term." });
  } else {
    const membersResult = await searchMembers(search);
    res.send(membersResult);
  }

});

router.get("/api/member/:id/items", async (req, res) => {
  let memberId = req.params.id;
  let page = req.query.page || 1;
  if (!memberId) {
    return res.status(400).json({ error: 'Invalid member ID' });
  }

  try {

    const memberItems = await getMemberItems(memberId, page);
    res.json(memberItems);

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' + error });

  }


});


router.get('/api/member/:memberId', async (req, res) => {
  const memberId = req.params.memberId;
  if (!memberId) {
    return res.status(400).json({ error: 'Invalid member ID' });
  }
  try {
    // Fetch items for the specified member using their ID
    const memberInfos = await getMemberInfo(memberId);
    res.json(memberInfos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' + error });

  }
});

router.get('/api/member/:memberId/rate', async (req, res) => {
  const memberId = req.params.memberId;
  if (!memberId) {
      return res.status(400).json({ error: 'Invalid member ID' });
  }

  try {
      const memberRates = await getMemberRates(memberId);
      res.json(memberRates);
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' + error });

  }
});

router.get("/1", (req, res) => {
  res.send("1");
});

export default router;