import { Request, response, Response } from 'express'
import { container } from "tsyringe"
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(request: Request, reponse: Response): Promise<Response>{
    const { name, password, driver_license, email} = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license
    })

    return response.status(201).send()
  }
}

export { CreateUserController }