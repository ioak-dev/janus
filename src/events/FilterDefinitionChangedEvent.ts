import { BehaviorSubject } from 'rxjs';

interface FilterDefinitionChangedType {
  schemaId: string | null;
}

export const filterDefinitionChangedSubject = new BehaviorSubject<FilterDefinitionChangedType>({
  schemaId: null
});
