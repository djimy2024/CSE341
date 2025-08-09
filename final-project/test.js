const request = require('supertest');
const express = require('express');

const app = express();


app.get('/books', (req, res) => {
  res.json([
    {
      _id: "688fbe6cd2d0cd24a31f07b7",
      title: "any",
      author: "any",
      genre: "any",
      publishedDate: "any",
      summary: "any"
    }
  ]);
});

app.get('/authors', (req, res) => {
  res.json([
    {
      _id: "a01",
      name: "Isaac Asimov",
      bio: "Author of science fiction and popular science books.",
      birthdate: "1920-01-02"
    }
  ]);
});

app.get('/genres', (req, res) => {
  res.json([
    {
      _id: "g01",
      name: "Science Fiction",
      description: "Fiction with futuristic or technological themes."
    }
  ]);
});

app.get('/publishers', (req, res) => {
  res.json([
    {
      _id: "p01",
      name: "Penguin Random House",
      location: "New York, USA",
      founded: 1927
    }
  ]);
});

describe('API Tests', () => {
  test('GET /books returns books array', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('title');
    expect(res.body[0]).toHaveProperty('author');
  });

  test('GET /authors returns authors array', async () => {
    const res = await request(app).get('/authors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('bio');
  });

  test('GET /genres returns genres array', async () => {
    const res = await request(app).get('/genres');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('description');
  });

  test('GET /publishers returns publishers array', async () => {
    const res = await request(app).get('/publishers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('location');
  });
});
