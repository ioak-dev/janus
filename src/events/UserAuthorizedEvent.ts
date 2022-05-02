import { BehaviorSubject } from 'rxjs';

interface UserAuthorizedType {
  isAuth: boolean;
}

export const userAuthorizedSubject = new BehaviorSubject<UserAuthorizedType>({ isAuth: false });
