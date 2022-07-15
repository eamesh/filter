import { AxiosRequestConfig } from 'axios';
import qs from 'qs';

// export const queues = new Map<string, AbortController>();

export const generatorKey = (config: AxiosRequestConfig): string => {
  let {
    data,
    params
  } = config;
  data = typeof data === 'string' ? JSON.parse(config.data) : data;
  params = typeof params === 'string' ? JSON.parse(config.params) : params;

  return [config.method, config.url, qs.stringify(data), qs.stringify(params)].join('|');
};

export class AxiosAbort {
  private _queues: Map<string, AbortController>;

  constructor (queues: Map<string, AbortController>) {
    this._queues = queues;
  }

  get queues () {
    return this._queues;
  }

  // 队列处理
  addQueue (config: AxiosRequestConfig) {
    // 存在相同请求, 做 abort 处理
    this.removeQueue(config);

    config.signal = config.signal || (() => {
      const key = generatorKey(config);
      const controller = new AbortController();

      this.queues.set(key, controller);
      return controller.signal;
    })();
  }

  // 移除、拦截处理
  removeQueue (config: AxiosRequestConfig) {
    const key = generatorKey(config);

    if (this.queues.has(key)) {
      console.info(`%crequest key repeat { ${key} } abort`, 'color: red;');
      this.queues.get(key)?.abort();
      this.queues.delete(key);
    }
  }
}
