import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListAvailableCarsUseCase"

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  })

  it("Should be able to list all available cars", async () => {

    const car = await carsRepositoryInMemory.create({
      "name": "Car1",
      "description": "Car description",
      "daily_rate": 140,
      "license_plate": "DEF-1212",
      "fine_amount": 180,
      "brand": "Car brand",
      "category_id": "category_id"
    })

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  })

  it("Should be able to list all available cars by brand", async () => {

    const car = await carsRepositoryInMemory.create({
      "name": "Car2",
      "description": "Car description",
      "daily_rate": 140,
      "license_plate": "DEF-1212",
      "fine_amount": 180,
      "brand": "Car brand test",
      "category_id": "category_id"
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car brand test"
    });

    expect(cars).toEqual([car]);
    console.log(cars);
  });

  it("Should be able to list all available cars by name", async () => {

    const car = await carsRepositoryInMemory.create({
      "name": "Car name",
      "description": "Car description",
      "daily_rate": 140,
      "license_plate": "DEF-1245",
      "fine_amount": 180,
      "brand": "Car brand test",
      "category_id": "category_id"
    });

    const cars = await listCarsUseCase.execute({
      name: "Car name"
    });

    expect(cars).toEqual([car]);
    console.log(cars);
  });

  it("Should be able to list all available cars by category", async () => {

    const car = await carsRepositoryInMemory.create({
      "name": "Car name",
      "description": "Car description",
      "daily_rate": 140,
      "license_plate": "DEF-1245",
      "fine_amount": 180,
      "brand": "Car brand test",
      "category_id": "12345"
    });

    const cars = await listCarsUseCase.execute({
      category_id: "12345"
    });

    expect(cars).toEqual([car]);
    console.log(cars);
  });
})