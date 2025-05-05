import './style.css'

const inputs = document.querySelectorAll('.controls input')
// 这里不要随意使用箭头函数,会导致this指向window
function handleUpdate() {
  const suffix = this.dataset.sizing || ''
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}

inputs.forEach(input => input.addEventListener('change', handleUpdate))
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate))
