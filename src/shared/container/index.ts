import { container } from "tsyringe";

import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

import { SpecificationsRepository } from "@modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
)