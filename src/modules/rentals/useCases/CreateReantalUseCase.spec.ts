import { AppError } from "@shared/errors/AppError"
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentaluseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory
    createRentaluseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
  })
  
  it("should be able to create a new rental", async () => {
    const rental = await createRentaluseCase.execute({
      user_id: "12345",
      car_id: "54321",
      expected_return_date: new Date()
    })
    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if user already has one opened", async () => {
    expect(async () => {
      await createRentaluseCase.execute({
        user_id: "12345",
        car_id: "1",
        expected_return_date: new Date()
      })
      await createRentaluseCase.execute({
        user_id: "12345",
        car_id: "2",
        expected_return_date: new Date()
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental if car already has one opened", async () => {
    expect(async () => {
      await createRentaluseCase.execute({
        user_id: "1",
        car_id: "54321",
        expected_return_date: new Date()
      })
      await createRentaluseCase.execute({
        user_id: "2",
        car_id: "54321",
        expected_return_date: new Date()
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})