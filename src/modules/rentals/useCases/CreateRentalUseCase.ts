import { AppError } from "@shared/errors/AppError"
import { Rental } from "../infra/typeorm/entities/Rental"
import { IRentalsRepository } from "../repositories/IRentalsRepository"

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental>{
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if(carUnavailable) { 
      throw new AppError("Car is unavaible.") 
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

    console.log(rentalOpenToUser)

    if(rentalOpenToUser) {
      throw new AppError("There is a rental already in progress for user!")
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    return rental
  }
}

export { CreateRentalUseCase }