import { UserRepository } from '@utils/repositories/UserRepository';

describe('UserRepository', () => {
  it('should get a specific user from data set', () => {
    // arrange
    const userRepository = new UserRepository();
    const userId = 'a85312c0-6b44-495b-b878-9cc31004bbf7';
    const expectedUser = {
      id: 'a85312c0-6b44-495b-b878-9cc31004bbf7',
      firstName: 'Furman',
      lastName: 'Reichel',
      phoneNumber: '1-982-746-7287 x2297',
      email: 'Furman.Reichel42@gmail.com',
    };

    // act
    const user = userRepository.get(userId);

    // assert
    expect(user).toEqual(expectedUser);
  });

  it('should return undefined if user is not found', () => {
    // arrange
    const userRepository = new UserRepository();
    const userId = 'invalid_id';

    // act
    const user = userRepository.get(userId);

    // assert
    expect(user).toBeUndefined();
  });

  it('should get the spends of a specific user', async () => {
    // arrange
    const userRepository = new UserRepository();
    const userId = 'a85312c0-6b44-495b-b878-9cc31004bbf7';
    const expectedSpends = 207448;

    // act
    const spends = await userRepository.getSpends(userId);

    // assert
    expect(spends).toEqual(expectedSpends);
  });
});
