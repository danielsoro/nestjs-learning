import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavors.entity';

describe('CoffeesController', () => {
  let controller: CoffeesController;
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeesController],
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CoffeesController>(CoffeesController);
    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    const coffeeId = 1;

    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const expectedCoffee = {};

        jest
          .spyOn(service, 'findOne')
          .mockReturnValue(Promise.resolve(expectedCoffee as Coffee));
        const coffee = await service.findOne(coffeeId);

        expect(coffee).toBeDefined();
        expect(coffee).toEqual(expectedCoffee);
      });
    });
  });
});
