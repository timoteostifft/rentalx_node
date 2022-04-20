import { User } from "../../entities/User";
import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../IUsersRepository";

class UsersRepository implements IUserRepository{
  private repository: Repository<User>

  constructor(){
    this.repository = getRepository(User)
  }
  
  async create({name, username, email, driver_license, password}: ICreateUserDTO): Promise<void> {
    
    const user = this.repository.create({
      name,
      username,
      email,
      driver_license,
      password
    })

    await this.repository.save(user)
  }
}

export { UsersRepository }