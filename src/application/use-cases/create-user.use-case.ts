import { UserAlreadyExistsError } from "../../domain/errors/user-already-exists.error.js";

import type {
  CreateUserInput,
  UserRepository
} from "../../domain/repositories/user.repository.js";
import type { PasswordHasherService } from "../../domain/services/password-hasher.service.js";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasherService
  ) {}

  async execute(userData: CreateUserInput) {
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) throw new UserAlreadyExistsError(userData.email);

    const hashedPassword = await this.passwordHasher.hash(userData.password);

    await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });
  }
}
