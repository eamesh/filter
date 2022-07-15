import { defineStore } from 'pinia';
import GlobalLoadingInstance, { GlobalLoading } from '../loading';

export interface LoadingState {
  globalLoading: GlobalLoading;
}

export const useLoadingStore = defineStore({
  id: 'loading',

  state: (): LoadingState => ({
    globalLoading: GlobalLoadingInstance
  })
});
