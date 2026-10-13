import { UserDoesNotExistError } from "../../../domain/errors/user-does-not-exist.error.js";

import type { UserRepository } from "../../../domain/repositories/user.repository.js";
import type { UserIdToDeleteDto } from "../../dtos/users/delete-user.dto.js";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userIdToDeleteDto: UserIdToDeleteDto): Promise<void> {
    const { userId } = userIdToDeleteDto;

    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserDoesNotExistError(userId);

    await this.userRepository.delete(userId);
  }
}
