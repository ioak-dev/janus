import { BehaviorSubject } from 'rxjs';

export const columnDefinitionChangedSubject = new BehaviorSubject<ColumnDefinitionChangedType>({
  tableId: null
});

interface ColumnDefinitionChangedType {
  tableId: string | null;
}
