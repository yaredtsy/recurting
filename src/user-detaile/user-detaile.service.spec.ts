import { Test, TestingModule } from '@nestjs/testing';
import { UserDetaileService } from './user-detaile.service';

describe('UserDetaileService', () => {
  let service: UserDetaileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDetaileService],
    }).compile();

    service = module.get<UserDetaileService>(UserDetaileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
