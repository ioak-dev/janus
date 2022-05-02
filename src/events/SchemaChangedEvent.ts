import { BehaviorSubject } from 'rxjs';

interface SchemaChangedType {
  reference: string | null;
}

export const schemaChangedSubject = new BehaviorSubject<SchemaChangedType>({ reference: null });
