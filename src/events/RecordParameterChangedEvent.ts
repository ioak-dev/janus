import { BehaviorSubject } from 'rxjs';

export const recordParameterChangedSubject = new BehaviorSubject<RecordParameterChangedType>({
  tableId: '',
  filter: null,
  quickFilter: null,
  secondary: false
});

interface RecordParameterChangedType {
  tableId: string;
  filter: any;
  quickFilter: any;
  secondary: boolean;
}
