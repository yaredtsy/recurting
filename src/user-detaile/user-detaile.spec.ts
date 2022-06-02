import { Test, TestingModule } from '@nestjs/testing';
import { UserDetaile } from './user-detaile';

describe('UserDetaile', () => {
  let provider: UserDetaile;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDetaile],
    }).compile();

    provider = module.get<UserDetaile>(UserDetaile);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
