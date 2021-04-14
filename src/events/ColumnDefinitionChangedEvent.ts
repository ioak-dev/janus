import { BehaviorSubject } from 'rxjs';

export const columnDefinitionChangedSubject = new BehaviorSubject<ColumnDefinitionChangedType>({
  tableId: null,
  columnList: []
});

interface ColumnDefinitionChangedType {
  tableId: string | null;
  columnList: any[];
}
