import './style.css'

// 获取键盘容器元素
const keysContainer = document.querySelector('.keys')

/**
 * @description 激活按键动画
 * @param {HTMLElement} keyElement  需要激活的按键元素
 */
const activateKey = keyElement => {
  // transitionend是一个在 CSS 过渡效果完成时触发的 JavaScript 事件。借助这个事件，开发者能够在 CSS 过渡结束时执行特定的 JavaScript 代码，进而实现更加丰富和交互性强的网页效果。
  keyElement.addEventListener(
    'transitionend',
    e => {
      // 仅处理transform属性和 border-bottom-color属性的过渡
      if (e.propertyName === 'transform' || e.propertyName === 'border-bottom-color') {
        keyElement.classList.remove('playing')
      }
    },
    { once: true } // 自动移除监听器防止内存泄漏
  )
  keyElement.classList.add('playing')
}

// 鼠标事件处理
keysContainer.addEventListener('click', event => {
  const keyElement = event.target.closest('[data-key]')
  if (keyElement) {
    activateKey(keyElement)
  }
})

// 键盘事件处理
window.addEventListener('keydown', event => {
  const keyElement = document.querySelector(`[data-key="${event.key}"]`)
  if (keyElement) {
    activateKey(keyElement)
  }
})
