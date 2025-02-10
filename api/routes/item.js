import express from "express";
import { getItemInfo } from "../../service/getItemInfo.js"
import { searchItems } from "../../service/searchItems.js"
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
export default router;