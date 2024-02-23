import app from "../app";
import request from 'supertest';


test('Test home route', async () => {
const res = await request(app).get('/');
expect(res.statusCode).toBe(200);
})