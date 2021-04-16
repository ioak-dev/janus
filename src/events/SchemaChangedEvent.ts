import { BehaviorSubject } from 'rxjs';

export const schemaChangedSubject = new BehaviorSubject<SchemaChangedType>({ reference: null });

interface SchemaChangedType {
  reference: string | null;
}
