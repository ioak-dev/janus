import { BehaviorSubject } from 'rxjs';

interface ColumnDefinitionChangedType {
  tableId: string | null;
  columnList: any[];
}

export const columnDefinitionChangedSubject = new BehaviorSubject<ColumnDefinitionChangedType>({
  tableId: null,
  columnList: []
});
