import { useLoadingStore } from '@/store/loading';
import { Http } from '@/utils/http';
import { useRequestStore } from './store/request';
import { abstract } from '@/utils/http/abstract';

export const useHooks = () => {
  const {
    globalLoading
  } = useLoadingStore();

  const http = new Http({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    },
    abstract,
    requestOptions: {
      abort: false
    }
  });

  const {
    queues
  } = useRequestStore();

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

  const request = () => {
    const random = Math.random();

    console.log(http.request({
      url: 'http://localhost:3000/api',
      data: {
        random
      }
    }));
    console.log(http.request({
      url: 'http://localhost:3000/api',
      data: {
        random
      }
    }));
    console.log(http.request({
      url: 'http://localhost:3000/api',
      data: {
        random
      }
    }));
  };

  return {
    globalLoading,
    increment,
    request,
    queues
  };
};
