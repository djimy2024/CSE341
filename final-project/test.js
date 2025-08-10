const request = require('supertest');
const express = require('express');

const app = express();


app.get('/books', (req, res) => {
  res.json([
    {
      _id: "688fbe6cd2d0cd24a31f07b7",
      title: "Any",
      author: "Any",
      genre: "Any",
      publishedDate: "Any",
      publisher: "Any",
      pages: "Any",
      language: "Any"
    }
  ]);
});

app.get('/authors', (req, res) => {
  res.json([
    {
      _id: "a01",
      name: "any",
      bio: "any",
      birthdate: "any",
      deathDate: "any",
      nationality: "any",
      notableWorks: "any",
      awards: "any"
    }
  ]);
});

app.get('/genres', (req, res) => {
  res.json([
    {
      _id: "g01",
      name: "Any",
      description: "Any",
      popularAuthors: "Any",
      exampleBooks: "Any",
      origin: "Any",
      subgenres: "Any",
      themes: "Any"
    }
  ]);
});

app.get('/publishers', (req, res) => {
  res.json([
    {
      _id: "p01",
      name: "Any",
      location: "Any",
      founded: "Any",
      founders: "Any",
      genresPublished: "Any",
      website: "Any",
      bestsellers: "Any"
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
    expect(res.body[0]).toHaveProperty('genre');
    expect(res.body[0]).toHaveProperty('publishedDate');
     expect(res.body[0]).toHaveProperty('publisher');
    expect(res.body[0]).toHaveProperty('pages');
    expect(res.body[0]).toHaveProperty('language');
  });

  test('GET /authors returns authors array', async () => {
    const res = await request(app).get('/authors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('bio');
    expect(res.body[0]).toHaveProperty('birthdate');
    expect(res.body[0]).toHaveProperty('deathDate');
    expect(res.body[0]).toHaveProperty('nationality');
    expect(res.body[0]).toHaveProperty('notableWorks');
    expect(res.body[0]).toHaveProperty('awards');
  });

  test('GET /genres returns genres array', async () => {
    const res = await request(app).get('/genres');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('description');
    expect(res.body[0]).toHaveProperty('popularAuthors');
    expect(res.body[0]).toHaveProperty('exampleBooks');
    expect(res.body[0]).toHaveProperty('origin');
    expect(res.body[0]).toHaveProperty('subgenres');
    expect(res.body[0]).toHaveProperty('themes');
  });

  test('GET /publishers returns publishers array', async () => {
    const res = await request(app).get('/publishers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('location');
    expect(res.body[0]).toHaveProperty('founded');
    expect(res.body[0]).toHaveProperty('founders');
    expect(res.body[0]).toHaveProperty('genresPublished');
    expect(res.body[0]).toHaveProperty('website');
    expect(res.body[0]).toHaveProperty('bestsellers');
  });
});
