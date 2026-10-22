import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { verifyWebsite } from './src/server/websiteVerifier.js';

function websiteCheckerPlugin() {
  const handler = async (req, res, next) => {
    // Check if the URL starts with /api/check-website
    const parsedUrl = new URL(req.url, 'http://localhost');
    if (parsedUrl.pathname === '/api/check-website') {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const targetUrl = parsed.url;
            if (!targetUrl || typeof targetUrl !== 'string' || !targetUrl.trim()) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Please enter a valid website URL.' }));
              return;
            }
            const result = await verifyWebsite(targetUrl.trim());
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, ...result }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message || 'Failed to inspect website.' }));
          }
        });
        return;
      } else if (req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: 'ok', service: 'CyberShield Website Verifier API' }));
        return;
      }
    }
    next();
  };

  return {
    name: 'website-checker-api',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}

export default defineConfig({
  plugins: [vue(), websiteCheckerPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
