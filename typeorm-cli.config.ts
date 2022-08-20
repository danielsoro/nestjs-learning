import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavors.entity';
import { CoffeeRefactor1660999831519 } from 'src/migrations/1660999831519-CoffeeRefactor';
import { SchemaSync1661004984849 } from 'src/migrations/1661004984849-SchemaSync';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1660999831519, SchemaSync1661004984849],
});
