import {test, expect} from "@playwright/test";
import { usersList } from "../test-data/users";
import AuthController from "../api/controllers/AuthControllers";

let authController: AuthController;

test.describe('API Requests', () => {
  let sid: string;

   test.beforeAll(async ({ request }) => {
    authController = new AuthController(request);
    
      sid = await authController.getAuthCookie(usersList.mainUser.email, usersList.mainUser.password);
       expect(sid).not.toBeUndefined();
   });

   test.describe('Positive', () => {

       test('Add new car Ford Focus [/api/cars/]', async ({ request }) => {
           const carToAdd = {
               "carBrandId": 3,
               "carModelId": 12,
               "mileage": 0
           }
           const response = await request.post('/api/cars/', {
               data: carToAdd,
               headers: {
                   'Cookie': sid
               }
           });
           const body = await response.json();
           expect(response.status()).toBe(201);
           expect(body.data.carBrandId).toBe(carToAdd.carBrandId);
           expect(body.data.carModelId).toBe(carToAdd.carModelId);
           expect(body.data.mileage).toBe(carToAdd.mileage);
           expect(body.data.initialMileage).toBe(carToAdd.mileage);
           expect(body.data.brand).toBe('Ford');
       })

       test('Add new car Audi Q7 [/api/cars/]', async ({ request }) => {
           const carToAdd = {
               "carBrandId": 1,
               "carModelId": 3,
               "mileage": 999999
           }
           const response = await request.post('/api/cars/', {
               data: carToAdd,
               headers: {
                   'Cookie': sid
               }
           });
           const body = await response.json();
           expect(response.status()).toBe(201);
           expect(body.data.carBrandId).toBe(carToAdd.carBrandId);
           expect(body.data.carModelId).toBe(carToAdd.carModelId);
           expect(body.data.mileage).toBe(carToAdd.mileage);
           expect(body.data.initialMileage).toBe(carToAdd.mileage);
           expect(body.data.brand).toBe('Audi');
       });

       test('Add new car BMW X5 [/api/cars/]', async ({ request }) => {
           const carToAdd = {
               "carBrandId": 2,
               "carModelId": 8,
               "mileage": 976
           }
           const response = await request.post('/api/cars/', {
               data: carToAdd,
               headers: {
                   'Cookie': sid
               }
           });
           const body = await response.json();
           expect(response.status()).toBe(201);
           expect(body.data.carBrandId).toBe(carToAdd.carBrandId);
           expect(body.data.carModelId).toBe(carToAdd.carModelId);
           expect(body.data.mileage).toBe(carToAdd.mileage);
           expect(body.data.initialMileage).toBe(carToAdd.mileage);
           expect(body.data.brand).toBe('BMW');
       });

       test('Add new car Fiat Panda[/api/cars/]', async ({ request }) => {
           const carToAdd = {
               "carBrandId": 5,
               "carModelId": 21,
               "mileage": 999999
           }
           const response = await request.post('/api/cars/', {
               data: carToAdd,
               headers: {
                   'Cookie': sid
               }
           });
           const body = await response.json();
           expect(response.status()).toBe(201);
           expect(body.data.carBrandId).toBe(carToAdd.carBrandId);
           expect(body.data.carModelId).toBe(carToAdd.carModelId);
           expect(body.data.mileage).toBe(carToAdd.mileage);
           expect(body.data.initialMileage).toBe(carToAdd.mileage);
           expect(body.data.brand).toBe('Fiat');
       });

       test('Add and remove new car Porsche Cayenne [/api/cars/]', async ({ request }) => {
           const carToAdd = {
               "carBrandId": 4,
               "carModelId": 17,
               "mileage": 2364
           }
           const response = await request.post('/api/cars/', {
               data: carToAdd,
               headers: {
                   'Cookie': sid
               }
           });
           const body = await response.json();
           expect(response.status()).toBe(201);
           expect(body.data.carBrandId).toBe(carToAdd.carBrandId);
           expect(body.data.carModelId).toBe(carToAdd.carModelId);
           expect(body.data.mileage).toBe(carToAdd.mileage);
           expect(body.data.initialMileage).toBe(carToAdd.mileage);
           expect(body.data.brand).toBe('Porsche');

           //delete
           const carId = body.data.id;
           const deleteResponse = await request.delete(`/api/cars/${carId}`, {
             headers: {
               'Cookie': sid
             }
           });
           expect(deleteResponse.status()).toBe(200);
       });
   });

   test.describe('Negative', () => {

       test('Add new car with incorrect mileage [/api/cars/]', async ({ request }) => {
           const carToAdd = {
               "carBrandId": 1,
               "carModelId": 3,
               "mileage": 1000000
           }
           const response = await request.post('/api/cars/', {
               data: carToAdd,
               headers: {
                   'Cookie': sid
               }
           });
           const body = await response.json();
           expect(response.status()).toBe(400);
           expect(body.message).toBe('Mileage has to be from 0 to 999999')
       });

       test('Add new car with a negative mileage [/api/cars/]', async ({ request }) => {
           const carToAdd = {
               "carBrandId": 1,
               "carModelId": 3,
               "mileage": -1
           }
           const response = await request.post('/api/cars/', {
               data: carToAdd,
               headers: {
                   'Cookie': sid
               }
           });
           const body = await response.json();
           expect(response.status()).toBe(400);
           expect(body.message).toBe('Mileage has to be from 0 to 999999')
       });

       test('Add new car with incorrect car Brand Id [/api/cars/]', async ({ request }) => {
           const carToAdd = {
               "carBrandId": 9,
               "carModelId": 1,
               "mileage": 342
           }
           const response = await request.post('/api/cars/', {
               data: carToAdd,
               headers: {
                   'Cookie': sid
               }
           });
           const body = await response.json();
           expect(response.status()).toBe(404);
           expect(body.message).toBe('Brand not found')
       });

       test('Add new car with incorrect car Model Id [/api/cars/]', async ({ request }) => {
           const carToAdd = {
               "carBrandId": 5,
               "carModelId": 54,
               "mileage": 100
           }
           const response = await request.post('/api/cars/', {
               data: carToAdd,
               headers: {
                   'Cookie': sid
               }
           });
           const body = await response.json();
           console.log(body);
           expect(response.status()).toBe(404);
           expect(body.message).toBe('Model not found')
       });
 
       test('Add new car without mileage [/api/cars/]', async ({ request }) => {
           const carToAdd = {
               "carBrandId": 1,
               "carModelId": 2,
           }
           const response = await request.post('/api/cars/', {
               data: carToAdd,
               headers: {
                   'Cookie': sid
               }
           });
           const body = await response.json();
           expect(response.status()).toBe(400);
           expect(body.message).toBe('Mileage is required')
       });

       test('Add new car without car Brand Id [/api/cars/]', async ({ request }) => {
           const carToAdd = {
               "carModelId": 2,
               "mileage": 100
           }
           const response = await request.post('/api/cars/', {
               data: carToAdd,
               headers: {
                   'Cookie': sid
               }
           });
           const body = await response.json();
           expect(response.status()).toBe(400);
           expect(body.message).toBe('Car brand id is required')
       });

       test('Add new car without car Model Id [/api/cars/]', async ({ request }) => {
           const carToAdd = {
               "carBrandId": 1,
               "mileage": 100
           }
           const response = await request.post('/api/cars/', {
               data: carToAdd,
               headers: {
                   'Cookie': sid
               }
           });
           const body = await response.json();
           expect(response.status()).toBe(400);
           expect(body.message).toBe('Car model id is required')
       });
   });
});