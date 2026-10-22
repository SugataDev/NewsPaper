import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';
import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

let server;
let baseUrl;

describe('API Endpoints Tests', () => {
  before(async () => {
    await connectDB();
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) await new Promise((r) => server.close(r));
    await mongoose.disconnect();
  });

  test('GET /api/health returns 200 ok', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'ok');
  });

  test('GET /api/home returns all homepage blocks in one payload', async () => {
    const res = await fetch(`${baseUrl}/api/home`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.topTeasers, 'topTeasers exists');
    assert.strictEqual(data.topTeasers.length, 3);
    assert.ok(data.hero, 'hero section exists');
    assert.ok(data.hero.centerLead, 'hero centerLead exists');
    assert.ok(data.hero.left.length > 0, 'hero left list populated');
    assert.ok(data.hero.right.length > 0, 'hero right list populated');
    assert.ok(data.video.length > 0, 'video section populated');
    assert.ok(data.promoStrip.length === 4, 'promoStrip has 4 items');
    assert.ok(data.mostReadAndSports.tabs.read.length === 5, 'mostRead has 5 items');
    assert.ok(data.mostReadAndSports.sports.lead, 'sports lead exists');
    assert.ok(data.bangladesh.lead, 'bangladesh lead exists');
    assert.ok(data.world.lead, 'world lead exists');
    assert.ok(data.entertainment.lead, 'entertainment lead exists');
    assert.ok(data.lifestyle.length === 4, 'lifestyle has 4 cards');
    assert.ok(data.opinion.lead, 'opinion lead exists');
    assert.ok(data.business.lead, 'business lead exists');
  });

  test('GET /api/categories returns navigation categories', async () => {
    const res = await fetch(`${baseUrl}/api/categories`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data));
    assert.ok(data.length >= 10);
  });

  test('GET /api/topics/trending returns trending topics', async () => {
    const res = await fetch(`${baseUrl}/api/topics/trending`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data));
    assert.ok(data.length > 0);
  });

  test('GET /api/articles with pagination', async () => {
    const res = await fetch(`${baseUrl}/api/articles?limit=5`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.articles.length, 5);
    assert.ok(data.pagination.total > 100);
  });

  test('GET /api/most-read returns tabs data', async () => {
    const res = await fetch(`${baseUrl}/api/most-read?tab=read`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.length, 5);
  });

  test('GET /api/locations returns divisions', async () => {
    const res = await fetch(`${baseUrl}/api/locations?type=division`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.length, 8);
  });
});
