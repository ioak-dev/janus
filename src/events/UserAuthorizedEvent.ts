import { BehaviorSubject } from 'rxjs';

export const userAuthorizedSubject = new BehaviorSubject<UserAuthorizedType>({ isAuth: false });

interface UserAuthorizedType {
  isAuth: boolean;
}
