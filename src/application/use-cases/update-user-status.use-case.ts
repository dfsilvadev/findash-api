import { UserDoesNotExistError } from "../../domain/errors/user-does-not-exist.error.js";

import type { UserRepository } from "../../domain/repositories/user.repository.js";
import type { UserId, UserStatusDto } from "../dtos/update-user-status.dto.js";

export class UpdateUserStatusUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: UserId, status: UserStatusDto) {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) throw new UserDoesNotExistError(id);

    return this.userRepository.updateStatus(id, status);
  }
}
