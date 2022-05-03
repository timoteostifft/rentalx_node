import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      brand: "Brand",
      daily_rate: 100, 
      fine_amount: 60, 
      license_plate: "ABC-1234",
      category_id: "category"
    });

    expect(car).toHaveProperty("id");
  })

  it("Should not be able to create a car if with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car1",
        description: "Description Car",
        brand: "Brand",
        daily_rate: 100, 
        fine_amount: 60, 
        license_plate: "ABC-1234",
        category_id: "category"
      });

      await createCarUseCase.execute({
        name: "Name Car2",
        description: "Description Car",
        brand: "Brand",
        daily_rate: 100, 
        fine_amount: 60, 
        license_plate: "ABC-1234",
        category_id: "category"
      });
    }).rejects.toBeInstanceOf(AppError);
  })

  it("Should be able to create a car if with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car Available",
      description: "Description Car",
      brand: "Brand",
      daily_rate: 100, 
      fine_amount: 60, 
      license_plate: "ABCD-1234",
      category_id: "category"
    });

    expect(car.available).toBe(true);
  })
})