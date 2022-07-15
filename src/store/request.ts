import { defineStore } from 'pinia';

export interface ReuqestState {
  queues: Map<string, AbortController>;
}

export const useRequestStore = defineStore({
  id: 'request',

  state: (): ReuqestState => ({
    queues: new Map()
  })
});

export const useRequestStoreWithout = () => {
  return useRequestStore();
};
