import { BehaviorSubject } from 'rxjs';

export const loadMoreRecordCommandSubject = new BehaviorSubject<LoadMoreRecordCommandType>({
  secondary: false
});

interface LoadMoreRecordCommandType {
  secondary: boolean;
}
