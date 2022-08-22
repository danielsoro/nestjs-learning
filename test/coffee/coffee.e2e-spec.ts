import {
  INestApplication,
  ValidationPipe,
  HttpStatus,
  HttpServer,
} from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';
import { Coffee } from 'src/coffees/entities/coffee.entity';

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    title: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };
  const expectedPartialCoffee = expect.objectContaining({
    ...coffee,
    flavors: expect.arrayContaining(
      coffee.flavors.map((name) => expect.objectContaining({ name })),
    ),
  });
  let app: INestApplication;
  let httpServer: HttpServer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    httpServer.close();
    await app.close();
  });

  it('Create [POST /]', async () => {
    const result = await request(httpServer).post('/coffees').send(coffee);
    expect(result.statusCode).toEqual(HttpStatus.CREATED);
    expect(result.body).toEqual(expectedPartialCoffee);
  });

  it('Get all [GET /]', async () => {
    const result = await request(httpServer).get('/coffees');
    expect(result.body.length).toBeGreaterThan(0);
    expect(result.body[0]).toEqual(expectedPartialCoffee);
  });

  it('Get one [GET /:id]', async () => {
    const result = await request(httpServer).get('/coffees/1');
    expect(result.body).toEqual(expectedPartialCoffee);
  });

  it('Update one [PATCH /:id]', async () => {
    const updateCoffeeDto: UpdateCoffeeDto = {
      ...coffee,
      title: 'New and Improved Shipwreck Roast',
    };

    const resultPatch = await request(httpServer)
      .patch('/coffees/1')
      .send(updateCoffeeDto);

    const coffeResultPatch: Coffee = resultPatch.body as Coffee;
    expect(coffeResultPatch.title).toEqual(updateCoffeeDto.title);

    const resultGet = await request(httpServer).get('/coffees/1');
    const coffeResultGet: Coffee = resultGet.body as Coffee;
    expect(coffeResultGet.title).toEqual(updateCoffeeDto.title);
  });

  it('Delete one [DELETE /:id]', async () => {
    const resultDelete = await request(httpServer).delete('/coffees/1');
    expect(resultDelete.statusCode).toEqual(HttpStatus.OK);

    const resultGet = await request(httpServer).get('/coffees/1');
    expect(resultGet.statusCode).toEqual(HttpStatus.NOT_FOUND);
  });
});
