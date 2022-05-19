import { AppError } from "@shared/errors/AppError"
import dayjs from "dayjs"
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentaluseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate()
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory
    createRentaluseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
  })
  
  it("should be able to create a new rental", async () => {
    const rental = await createRentaluseCase.execute({
      user_id: "12345",
      car_id: "54321",
      expected_return_date: dayAdd24Hours
    })
    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if user already has one opened", async () => {
    expect(async () => {
      await createRentaluseCase.execute({
        user_id: "12345",
        car_id: "1",
        expected_return_date: dayAdd24Hours
      })
      await createRentaluseCase.execute({
        user_id: "12345",
        car_id: "2",
        expected_return_date: dayAdd24Hours
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental if car already has one opened", async () => {
    expect(async () => {
      await createRentaluseCase.execute({
        user_id: "1",
        car_id: "54321",
        expected_return_date: dayAdd24Hours
      })
      await createRentaluseCase.execute({
        user_id: "2",
        car_id: "54321",
        expected_return_date: dayAdd24Hours
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentaluseCase.execute({
        user_id: "1",
        car_id: "54321",
        expected_return_date: dayjs().toDate()
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})