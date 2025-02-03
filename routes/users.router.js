import express from 'express';
import { faker } from '@faker-js/faker';

const router = express.Router();

router.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('No hay limit ni offset');
  }
})

export default router;
