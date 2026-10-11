import { CanNotUpdateSuspendedUserError } from "../../domain/errors/can-not-update-suspended-user.error.js";
import { EmailAlreadyInUseError } from "../../domain/errors/email-already-in-use.error.js";
import { UserDoesNotExistError } from "../../domain/errors/user-does-not-exist.error.js";

import type {
  UpdateUserInput,
  UserResponse
} from "../../domain/entities/user.entity.js";
import type { UserRepository } from "../../domain/repositories/user.repository.js";
import type { UpdateUserInputDto, UserId } from "../dtos/update-user.dto.js";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: UserId, input: UpdateUserInputDto): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new UserDoesNotExistError(id);

    if (user.status === "SUSPENDED")
      throw new CanNotUpdateSuspendedUserError("Cannot update suspended user");

    const { firstName, lastName, email } = input;

    if (email !== undefined && email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) throw new EmailAlreadyInUseError(email);
    }

    const changes: UpdateUserInput = {
      ...(firstName !== undefined && { firstName }),
      ...(lastName !== undefined && { lastName }),
      ...(email !== undefined && { email })
    };

    return this.userRepository.update(id, changes);
  }
}
