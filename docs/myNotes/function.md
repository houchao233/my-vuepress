# 常用函数

## 自定义指令图片懒加载
```js:no-line-numbers
import defaultImg from '@/assets/images/default.png' // 导入默认图片
export default {
  install (Vue) {
    Vue.directive('lazy', {
      mounted (el, binding) {
        // 浏览器提供 IntersectionObserver
        const observer = new IntersectionObserver(
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              // 图片加载失败就显示默认图片
              el.onerror = function () {
                el.src = defaultImg
              }
              el.src = binding.value
              // 不在监听dom
              observer.unobserve(el)
            }
          },
          {
            threshold: 0.01 // 指示应执行观察者回调的目标可见性百分比
          }
        )
        // 监听dom
        observer.observe(el)
      }
    })
  }
}
```