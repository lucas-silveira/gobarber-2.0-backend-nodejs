import { container } from 'tsyringe';
import { IDateHandler } from '@domain/protocols/utils/DateHandler.interface';
import DateFnsDateHandlerAdapter from '@infra/utils/dateHandler/DateFnsDateHandler.adapter';
import { IAuthenticateUtil } from '@domain/protocols/utils/Authenticate.interface';
import JWTAuthenticateAdapter from '@infra/utils/authentication/JWTAuthenticate.adapter';
import BcryptEncryptorAdapter from '@infra/utils/encryptor/BcryptEncryptor.adapter';
import { IEncryptor } from '@domain/protocols/utils/Encryptor.interface';
import DiskStorageHandlerAdapter from '@infra/utils/storageHandler/DiskStorageHandler.adapter';
import { IStorageHandler } from '@domain/protocols/utils/StorageHandler.interface';

container.registerSingleton<IAuthenticateUtil>(
  'AuthenticateUtil',
  JWTAuthenticateAdapter,
);
container.registerSingleton<IDateHandler>(
  'DateHandler',
  DateFnsDateHandlerAdapter,
);
container.registerSingleton<IEncryptor>('Encryptor', BcryptEncryptorAdapter);
container.registerSingleton<IStorageHandler>(
  'StorageHandler',
  DiskStorageHandlerAdapter,
);
