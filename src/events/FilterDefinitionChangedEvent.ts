import { BehaviorSubject } from 'rxjs';

export const filterDefinitionChangedSubject = new BehaviorSubject<FilterDefinitionChangedType>({
  schemaId: null
});

interface FilterDefinitionChangedType {
  schemaId: string | null;
}
