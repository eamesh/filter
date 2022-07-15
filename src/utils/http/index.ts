import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosAbort, generatorKey } from './abort';
import cloneDeep from 'lodash.clonedeep';
import {
  AbstractSchema
  // abstract
} from './abstract';
import { useRequestStoreWithout } from '@/store/request';

export interface RequestOptions {
  abort?: boolean;
}

export interface HttpRequestConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
  abstract?: AbstractSchema;
}

export class Http {
  private _instance: AxiosInstance;
  private _options: HttpRequestConfig;

  public get instance () {
    return this._instance;
  }

  public get options () {
    return this._options;
  }

  constructor (options: HttpRequestConfig) {
    this._options = options;
    this._instance = axios.create(options);

    this.handleInterceptors();
  }

  public request<T = any> (config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    // 合并处理
    const requestConfig = cloneDeep(config) as HttpRequestConfig;
    const requestOptions = Object.assign({}, this.options.requestOptions, options);

    requestConfig.requestOptions = requestOptions;

    return new Promise((resolve, reject) => {
      // 可以进一步抽象处理
      /**
       * TODO...
       */

      return this.instance.request(requestConfig)
        .then(response => {
          // 进一步处理
          /**
           * TODO...
           */

          /**
           * eg:
           *    处理数据格式
           *    status !== 200 ? resolve(response) : reject(new Error('error msg'))
           *
           */

          if (undefined === response) return;

          console.info(`%c请求成功, key: ${generatorKey(response.config)}`, 'color: green;');
          resolve(response as unknown as Promise<T>);
        })
        .catch(error => reject(error));
    });
  }

  private handleInterceptors () {
    // 做演示使用 pinia 代理
    const { queues } = useRequestStoreWithout();
    const axiosAbort = new AxiosAbort(queues);

    const {
      abstract
    } = this.options;

    const {
      handleRequestException,
      handleResponseException
    } = abstract as AbstractSchema;

    // 请求拦截
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      // 处理抽象逻辑
      /**
       * TODO...
       */

      !this.options.requestOptions!.abort && axiosAbort.addQueue(config);

      return config;
    });

    // 抽象请求异常处理
    handleRequestException &&
      this.instance.interceptors.request.use(undefined, handleRequestException);

    // 响应拦截
    this.instance.interceptors.response.use((response: AxiosResponse) => {
      axiosAbort.removeQueue(response.config);

      return response;
    });

    // 抽象响应异常处理
    handleResponseException &&
      this.instance.interceptors.response.use(undefined, handleResponseException);
  }
}

// Demo 演示需要 pinia 代理, 注释
// export default new Http({
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   abstract,
//   requestOptions: {
//     abort: false
//   }
// });
