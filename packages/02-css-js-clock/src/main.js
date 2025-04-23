import './style.css'

// 缓存DOM元素引用
const secondHand = document.querySelector('.second-hand')
const minHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')

// 时间计算函数
const calculateDegrees = (time, maxUnits) => {
  const baseDegrees = (time / maxUnits) * 360 // 基础时间角度
  const initialOffset = 90 // 补偿CSS初始旋转
  return baseDegrees + initialOffset
}

// 获取当前时间（优化为直接返回时间数值）
const getCurrentTime = () => {
  const date = new Date()
  return {
    seconds: date.getSeconds(),
    minutes: date.getMinutes(),
    hours: date.getHours(), // 保持24小时制
    displayHours: date.getHours() % 12 || 12, // 显示用12小时制（0点显示为12）
  }
}

// 平滑处理角度过渡
const setRotation = (element, degrees) => {
  element.style.transform = `rotate(${degrees}deg)`
  // 处理360度过渡
  if (degrees >= 360) {
    element.style.transition = 'none'
  } else if (!element.style.transition) {
    element.style.transition = 'transform 0.3s cubic-bezier(0.4, 2.3, 0.6, 1)'
  }
}

// 使用requestAnimationFrame优化动画
const updateClock = () => {
  const { seconds, minutes, displayHours } = getCurrentTime()
  const secondsDegrees = calculateDegrees(seconds, 60)
  const minutesDegrees = calculateDegrees(minutes, 60) + (seconds / 60) * 6
  const hoursDegrees = calculateDegrees(displayHours, 12) + (minutes / 60) * 30

  setRotation(secondHand, secondsDegrees)
  setRotation(minHand, minutesDegrees)
  setRotation(hourHand, hoursDegrees)

  requestAnimationFrame(updateClock)
}

// 初始调用并添加窗口聚焦时重新同步
updateClock()
window.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateClock()
})
