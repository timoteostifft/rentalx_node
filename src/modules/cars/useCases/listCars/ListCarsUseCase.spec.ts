import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase"

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
})