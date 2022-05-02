import { BehaviorSubject } from 'rxjs';

interface FetchActivityCommandType {
  tableId: string;
}

export const fetchActivityCommandSubject = new BehaviorSubject<FetchActivityCommandType>({
  tableId: ''
});
