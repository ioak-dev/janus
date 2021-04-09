import { BehaviorSubject } from 'rxjs';

export const fetchActivityCommandSubject = new BehaviorSubject<FetchActivityCommandType>({
  tableId: ''
});

interface FetchActivityCommandType {
  tableId: string;
}
