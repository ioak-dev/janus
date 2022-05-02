import { BehaviorSubject } from 'rxjs';

interface RecordParameterChangedType {
  tableId: string;
  filter: any;
  quickFilter: any;
  secondary: boolean;
}

export const recordParameterChangedSubject = new BehaviorSubject<RecordParameterChangedType>({
  tableId: '',
  filter: null,
  quickFilter: null,
  secondary: false
});
