import { defineComponent } from 'vue';
import { useHooks } from './hooks';

export default defineComponent({
  name: 'App',

  setup () {
    const {
      increment,
      globalLoading
    } = useHooks();

    return {
      increment,
      globalLoading
    };
  },

  render () {
    const {
      increment,
      globalLoading
    } = this;

    return (
      <>
        <div>
          <button onClick={() => increment()}>增加请求</button>
          <p></p>
          <button onClick={() => [...Array(10)].map(() => increment(true))}>增加 10 跳随机请求</button>
          <p>请求数量: { globalLoading.queuesNum }</p>
        </div>
        {
          !!globalLoading.queuesNum && (
            <div class='loading'>
              <span>loading...</span>
              <span>剩余数量 {globalLoading.queuesNum}</span>
            </div>
          )
        }
      </>
    );
  }
});
