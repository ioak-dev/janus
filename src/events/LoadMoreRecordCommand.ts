import { BehaviorSubject } from 'rxjs';

interface LoadMoreRecordCommandType {
  secondary: boolean;
}

export const loadMoreRecordCommandSubject = new BehaviorSubject<LoadMoreRecordCommandType>({
  secondary: false
});
