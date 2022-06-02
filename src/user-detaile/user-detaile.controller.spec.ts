import { Test, TestingModule } from '@nestjs/testing';
import { UserDetaileController } from './user-detaile.controller';

describe('UserDetaileController', () => {
  let controller: UserDetaileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDetaileController],
    }).compile();

    controller = module.get<UserDetaileController>(UserDetaileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
