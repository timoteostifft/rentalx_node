import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Rental } from "../infra/typeorm/entities/Rental"
import { IRentalsRepository } from "../repositories/IRentalsRepository"
import { AppError } from "@shared/errors/AppError"

dayjs.extend(utc)

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
    const minimumRentalHours = 24

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
    if(carUnavailable) { 
      throw new AppError("Car is unavailable.") 
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)
    if(rentalOpenToUser) {
      throw new AppError("There is a rental already in progress for user!")
    }

    const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format()

    const dateNow = dayjs().utc().local().format()

    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours")

    if (compare < minimumRentalHours) {
      console.log(compare)
      throw new AppError("Invalid return time!")
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