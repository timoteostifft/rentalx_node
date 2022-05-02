import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("Should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      brand: "Brand",
      daily_rate: 100, 
      fine_amount: 60, 
      license_plate: "ABC-1234",
      category_id: "category"
    });
  })
})