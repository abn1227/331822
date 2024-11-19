import { CreateHandyManDto, UpdateHandyManDto } from "@/dtos/handyman";
import { IHandyMan } from "@/models/HandyMan";
import { HandyManRepository } from "@/repositories/HandyManRepository";

export class CreateHandyManCommand {
  constructor(public readonly data: CreateHandyManDto) {}
}

export class UpdateHandyManCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateHandyManDto
  ) {}
}

export class DeleteHandyManCommand {
  constructor(public readonly id: string) {}
}

export class HandyManCommandHandlers {
  constructor(private handyManRepository: HandyManRepository) {}

  async createHandyMan(command: CreateHandyManCommand): Promise<IHandyMan> {
    const { firstName, lastName, phone, expertise, availability, services } =
      command.data;

    const handyMan = await this.handyManRepository.create({
      firstName,
      lastName,
      phone,
      expertise,
      availability,
      services,
    });

    return handyMan;
  }

  async updateHandyMan(command: UpdateHandyManCommand): Promise<IHandyMan> {
    const { id, data } = command;

    const handyMan = await this.handyManRepository.findById(id);

    if (!handyMan) {
      throw new Error(`HandyMan not found with id: ${id}`);
    }

    const { firstName, lastName, phone, expertise, availability, services } =
      data;

    if (firstName) {
      handyMan.firstName = firstName;
    }

    if (lastName) {
      handyMan.lastName = lastName;
    }

    if (phone) {
      handyMan.phone = phone;
    }

    if (expertise) {
      handyMan.expertise = expertise;
    }

    if (availability) {
      handyMan.availability = availability;
    }

    if (services) {
      handyMan.services = services;
    }

    await this.handyManRepository.update(id, handyMan);

    return handyMan;
  }

  async deleteHandyMan(command: DeleteHandyManCommand): Promise<boolean> {
    const { id } = command;

    const handyMan = await this.handyManRepository.findById(id);

    if (!handyMan) {
      throw new Error(`HandyMan not found with id: ${id}`);
    }

    return await this.handyManRepository.delete(id);
  }
}
