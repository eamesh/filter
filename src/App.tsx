import { defineComponent } from 'vue';
import { useHooks } from './hooks';

export default defineComponent({
  name: 'App',

  setup () {
    const {
      queues,
      request,
      increment,
      globalLoading
    } = useHooks();

    return {
      queues,
      request,
      increment,
      globalLoading
    };
  },

  render () {
    const {
      queues,
      request,
      increment,
      globalLoading
    } = this;

    return (
      <>
        <div>
          <button onClick={() => increment()}>增加动作请求</button>
          <p></p>
          <button onClick={() => [...Array(10)].map(() => increment(true))}>增加 10 条随机动作请求</button>
          <p></p>
          <button onClick={() => [...Array(1)].map(() => request())}>增加 1 x 3 条相同模拟请求</button>
          <p></p>
          <button onClick={() => [...Array(1000)].map(() => request())}>增加 1000 x 3 条随机相同模拟请求</button>
          <p>剩余动作数量 {globalLoading.queuesNum}</p>
          <p>剩余请求数量 {queues.size}</p>
        </div>
        {
          (!!globalLoading.queuesNum || !!queues.size) && (
            <div class='loading'>
              <span>loading...</span>
            </div>
          )
        }
      </>
    );
  }
});
