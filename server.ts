import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  executeSeniorMatchLogic,
  fetchSingStatTableM810771,
  SeniorMatchQuery,
  SINGSTAT_M810771_JSON_SCHEMA,
} from './server/singstatSchema';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON request body parser
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'SilverCircle Senior Matching API' });
  });

  // SingStat Table TS/M810771 JSON Schema specification
  app.get('/api/singstat/m810771/schema', (req, res) => {
    res.json(SINGSTAT_M810771_JSON_SCHEMA);
  });

  // Pull data from SingStat Table TS/M810771
  app.get('/api/singstat/m810771/data', async (req, res) => {
    try {
      const result = await fetchSingStatTableM810771();
      res.json({
        success: true,
        source: 'SingStat Table TS/M810771',
        url: 'https://tablebuilder.singstat.gov.sg/table/TS/M810771',
        isLive: result.isLive,
        timestamp: result.timestamp,
        cohorts: result.data,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to fetch SingStat M810771 data' });
    }
  });

  // Senior Matching Backend Logic Endpoint
  app.post('/api/seniors/match', async (req, res) => {
    try {
      const query: SeniorMatchQuery = {
        gender: req.body.gender || 'all',
        ageRanges: Array.isArray(req.body.ageRanges) ? req.body.ageRanges : [],
        interests: Array.isArray(req.body.interests) ? req.body.interests : [],
        maxTransitTimeMinutes: req.body.maxTransitTimeMinutes,
      };

      const matchResult = await executeSeniorMatchLogic(query);
      res.json({
        success: true,
        result: matchResult,
      });
    } catch (err) {
      console.error('Error executing senior match logic:', err);
      res.status(500).json({ success: false, error: 'Matching calculation failed' });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SilverCircle server running on http://localhost:${PORT}`);
  });
}

startServer();
