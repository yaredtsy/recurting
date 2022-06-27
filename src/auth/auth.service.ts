import {
  Injectable,
  NotFoundException,
  ResponseDecoratorOptions,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/auth.entity';
import { UserRepository } from './model/auth.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Role } from './model/role.enum';
import { UserDetaile } from 'src/user-detaile/model/user-detail.entity';
import { createQueryBuilder } from 'typeorm';
import { Skill } from 'src/skills/model/skill.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async googleLogin(req, res) {
    try {
      if (!req.user) {
        throw new UnauthorizedException('');
      }

      const createUserDto = req.user;
      const payload: JwtPayload = { email: createUserDto.email };

      let user = await this.userRepository.findOne({
        email: createUserDto.email,
      });

      const response = {
        isRegister: true,
        accessToken: '',
        user: {},
      };

      if (!user) {
        response.isRegister = false;
        user = await this.userRepository.createUser(createUserDto);
        const userdetail = await UserDetaile.create({
          user: user,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
        }).save();
        user.userDetails = userdetail;
        await user.save();
      }

      response.user = this.userRepository.removeRealtedFiled(user);
      response.accessToken = this.jwtService.sign(payload);

      // return { s: 'orra' };
      return res.redirect(
        process.env.LOGIN_SUCCESS_REDIRECT_URL + response.accessToken,
      );
    } catch (error) {}
  }

  async adminLogin(adminlogin: AdminLoginDto) {
    const { email } = adminlogin;

    const user = await this.userRepository.findOne({ email: email });

    if (!user) throw new NotFoundException('Email not found');
    if (user.role == Role.USER)
      throw new UnauthorizedException('Online admin can use this account');

    const result = await this.userRepository.validateUserPassword(adminlogin);
    if (!result) throw new UnauthorizedException('Invalid credentials');

    const response = {
      isRegister: true,
      accessToken: '',
      user: user,
    };

    const payload: JwtPayload = { email: email };

    response.accessToken = this.jwtService.sign(payload);

    return response;
  }

  async signUp(user: User, createUserDto: CreateUserDto) {
    const newuser = await this.userRepository.createUser({
      email: user.email,
      username: createUserDto.username,
      firstName: '',
      lastName: '',
    });
    return newuser;
  }

  async getUser(user: User) {
    let userQuery = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: user.id })
      .leftJoinAndSelect('user.skill', 'userSkill')
      .leftJoinAndSelect('user.userDetails', 'userDetails')
      .leftJoinAndSelect('user.workHistory', 'workHistory')
      .leftJoinAndSelect('user.education', 'education')
      .leftJoinAndSelect('workHistory.skills', 'skills')
      .innerJoinAndSelect('userSkill.skill', 'sk')
      .loadRelationCountAndMap('sk.job', 'sk.job')

      .cache(50000)
      .getOne();
    if (userQuery == null) {
      userQuery = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: user.id })
        .leftJoinAndSelect('user.skill', 'userSkill')
        .leftJoinAndSelect('user.userDetails', 'userDetails')
        .leftJoinAndSelect('user.workHistory', 'workHistory')
        .leftJoinAndSelect('user.education', 'education')
        .cache(50000)
        .getOne();
    }

    return userQuery;
  }

  async getUsersList(query: PaginateQuery) {
    return paginate(query, this.userRepository, {
      relations: ['userDetails'],
      sortableColumns: ['username', 'email', 'id'],
      searchableColumns: ['userDetails.firstName', 'role'],
      defaultSortBy: [['created_at', 'DESC']],
    });
  }

  async updateUserStatus(id: number, status: UpdateUserStatusDto) {
    await this.userRepository.update({ id: id }, { status: status.status });
    const job = await this.userRepository.findOne(id);
    return await this.getUser(job);
  }
}
