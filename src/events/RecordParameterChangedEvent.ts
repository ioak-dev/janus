import { BehaviorSubject } from 'rxjs';

export const recordParameterChangedSubject = new BehaviorSubject<RecordParameterChangedType>({
  tableId: '',
  filter: null,
  secondary: false
});

interface RecordParameterChangedType {
  tableId: string;
  filter: any;
  secondary: boolean;
}
