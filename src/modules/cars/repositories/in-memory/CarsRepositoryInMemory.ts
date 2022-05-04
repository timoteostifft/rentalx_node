import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
 
  cars: Car[] = [];

  async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      name,
      daily_rate,
      license_plate,
      description,
      fine_amount,
      category_id
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(): Promise<Car[]> {
    const cars = this.cars.filter((car) => {car.available === true});
    return cars;
  }
}

export { CarsRepositoryInMemory }