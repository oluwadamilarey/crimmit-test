import { Test, TestingModule } from '@nestjs/testing';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';

describe('OwnersController', () => {
  let ownersController: OwnersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OwnersController],
      providers: [OwnersService],
    }).compile();

    ownersController = app.get<OwnersController>(OwnersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ownersController.getHello()).toBe('Hello World!');
    });
  });
});
