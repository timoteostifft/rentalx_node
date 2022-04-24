import { inject, injectable } from "tsyringe"
import { IUserRepository } from "../../repositories/IUsersRepository"
import { sign } from 'jsonwebtoken';

import { compare } from 'bcryptjs'

interface IRequest {
  email: string,
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new Error("Email or password incorrect!");
      
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Email or password incorrect!");
    }

    const token = sign({}, '7d3d1fca497a22b8cdc9b7812b0ffff6', {
      subject: user.id,
      expiresIn: "1d"
    });

    return {
      user,
      token
    }

  }
}


export { AuthenticateUserUseCase }