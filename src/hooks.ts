import { useLoadingStore } from './store/loading';

export const useHooks = () => {
  const {
    globalLoading
  } = useLoadingStore();

  const increment = (random: boolean = false) => {
    globalLoading.increment();

    let timeout = 1000;

    random && (
      timeout = Math.floor(Math.random() * 10000)
    );

    setTimeout(() => {
      globalLoading.decrement();
    }, timeout);
  };

  return {
    globalLoading,
    increment
  };
};
