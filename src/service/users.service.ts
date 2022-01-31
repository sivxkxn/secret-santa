import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../entity/user.entity';

import { IUserCreate, IUser } from 'src/interfaces/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async createUser(user: IUserCreate): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async setSanta(): Promise<any> {
    let shuffledArray = [];
    const allUsers = await this.usersRepository.find();
    if (allUsers.length < 3 || allUsers.length > 500) {
      return 'Users should be more than 3 and less than 500';
    } else {
      shuffledArray = this.shuffleArray(allUsers);
      for (let i = 1; i < shuffledArray.length; i++) {
        shuffledArray[i - 1].santa = shuffledArray[i].id;
      }
      shuffledArray[shuffledArray.length - 1].santa = shuffledArray[0].id;
      return shuffledArray;
    }
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async login(login) {
    return this.usersRepository.findOne(login);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  shuffleArray(array: User[]): User[] {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
}
