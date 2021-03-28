import { BehaviorSubject } from 'rxjs';

export const schemaChangedSubject = new BehaviorSubject<SchemaChangedType>({ id: null });

interface SchemaChangedType {
  id: string | null;
}
