<template>
  <div class="mark-line" ref="markLine">
    <div
      v-for="line in lines"
      :key="line"
      class="line"
      :class="line.includes('x') ? 'xline' : 'yline'"
      :ref="line"
      v-show="lineStatus[line] || false"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    curComponent: null,
    componentData: null
  },
  data() {
    return {
      lines: ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'], // 分别对应三条横线和三条竖线
      diff: 3, // 相距 dff 像素将自动吸附
      lineStatus: {
        xt: false,
        xc: false,
        xb: false,
        yl: false,
        yc: false,
        yr: false
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.markLine.parentElement.style.cssText += ` height: 100%;
    position: relative;
    left:0;
    top:0;
    width: 100%;`
    })
  },
  methods: {
    getDomStyle(selector) {
      let dom = null
      if (typeof selector === 'string') {
        dom = document.querySelector(selector)
      } else {
        dom = selector
      }
      const temStyle = getComputedStyle(dom, null)
      function toNum(str) {
        return str.slice(0, -2) * 1
      }
      return {
        width: toNum(temStyle.width),
        height: toNum(temStyle.height),
        top: toNum(temStyle.top),
        left: toNum(temStyle.left),
        bottom: toNum(temStyle.bottom),
        right: toNum(temStyle.right)
      }
    },
    hideLine() {
      Object.keys(this.lineStatus).forEach((line) => {
        this.lineStatus[line] = false
      })
    },

    showLine(isDownward, isRightward) {
      const lines = this.$refs
      const components = Array.from(document.querySelectorAll(this.componentData))
      const curComponentStyle = this.getDomStyle(this.curComponent)
      const curComponentHalfwidth = curComponentStyle.width / 2
      const curComponentHalfHeight = curComponentStyle.height / 2
      this.hideLine()
      components.forEach((component) => {
        if (component === this.curComponent) return

        const componentStyle = this.getDomStyle(component)
        const { top, left, bottom, right } = componentStyle
        const componentHalfwidth = componentStyle.width / 2
        const componentHalfHeight = componentStyle.height / 2

        const conditions = {
          top: [
            {
              isNearly: this.isNearly(curComponentStyle.top, top),
              lineNode: lines.xt[0], // xt
              line: 'xt',
              dragShift: top,
              lineShift: top
            },
            {
              isNearly: this.isNearly(curComponentStyle.bottom, top),
              lineNode: lines.xt[0], // xt
              line: 'xt',
              dragShift: top - curComponentStyle.height,
              lineShift: top
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: this.isNearly(
                curComponentStyle.top + curComponentHalfHeight,
                top + componentHalfHeight
              ),
              lineNode: lines.xc[0], // xc
              line: 'xc',
              dragShift: top + componentHalfHeight - curComponentHalfHeight,
              lineShift: top + componentHalfHeight
            },
            {
              isNearly: this.isNearly(curComponentStyle.top, bottom),
              lineNode: lines.xb[0], // xb
              line: 'xb',
              dragShift: bottom,
              lineShift: bottom
            },
            {
              isNearly: this.isNearly(curComponentStyle.bottom, bottom),
              lineNode: lines.xb[0], // xb
              line: 'xb',
              dragShift: bottom - curComponentStyle.height,
              lineShift: bottom
            }
          ],
          left: [
            {
              isNearly: this.isNearly(curComponentStyle.left, left),
              lineNode: lines.yl[0], // yl
              line: 'yl',
              dragShift: left,
              lineShift: left
            },
            {
              isNearly: this.isNearly(curComponentStyle.right, left),
              lineNode: lines.yl[0], // yl
              line: 'yl',
              dragShift: left - curComponentStyle.width,
              lineShift: left
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: this.isNearly(
                curComponentStyle.left + curComponentHalfwidth,
                left + componentHalfwidth
              ),
              lineNode: lines.yc[0], // yc
              line: 'yc',
              dragShift: left + componentHalfwidth - curComponentHalfwidth,
              lineShift: left + componentHalfwidth
            },
            {
              isNearly: this.isNearly(curComponentStyle.left, right),
              lineNode: lines.yr[0], // yr
              line: 'yr',
              dragShift: right,
              lineShift: right
            },
            {
              isNearly: this.isNearly(curComponentStyle.right, right),
              lineNode: lines.yr[0], // yr
              line: 'yr',
              dragShift: right - curComponentStyle.width,
              lineShift: right
            }
          ]
        }

        const needToShow = []
        Object.keys(conditions).forEach((key) => {
          // 遍历符合的条件并处理
          conditions[key].forEach((condition) => {
            if (!condition.isNearly) return

            // eslint-disable-next-line no-param-reassign
            condition.lineNode.style[key] = `${condition.lineShift}px`
            needToShow.push(condition.line)
          })
        })
        // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
        // 同一方向上的线只显示一条，例如多条横条只显示一条横线
        if (needToShow.length) {
          this.chooseTheTureLine(needToShow, isDownward, isRightward)
        }
      })
    },

    chooseTheTureLine(needToShow, isDownward, isRightward) {
      // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
      // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
      if (isRightward) {
        if (needToShow.includes('yr')) {
          this.lineStatus.yr = true
        } else if (needToShow.includes('yc')) {
          this.lineStatus.yc = true
        } else if (needToShow.includes('yl')) {
          this.lineStatus.yl = true
        }
      } else if (needToShow.includes('yl')) {
        this.lineStatus.yl = true
      } else if (needToShow.includes('yc')) {
        this.lineStatus.yc = true
      } else if (needToShow.includes('yr')) {
        this.lineStatus.yr = true
      }

      if (isDownward) {
        if (needToShow.includes('xb')) {
          this.lineStatus.xb = true
        } else if (needToShow.includes('xc')) {
          this.lineStatus.xc = true
        } else if (needToShow.includes('xt')) {
          this.lineStatus.xt = true
        }
      } else if (needToShow.includes('xt')) {
        this.lineStatus.xt = true
      } else if (needToShow.includes('xc')) {
        this.lineStatus.xc = true
      } else if (needToShow.includes('xb')) {
        this.lineStatus.xb = true
      }
    },

    isNearly(dragValue, targetValue) {
      return Math.abs(dragValue - targetValue) <= this.diff
    }
  }
}
</script>

<style lang="less" scoped>
.mark-line {
  height: 100%;
}
.line {
  background: #59c7f9;
  position: absolute;
  z-index: 1000;
}
.xline {
  width: 100%;
  height: 1px;
}
.yline {
  width: 1px;
  height: 100%;
}
</style>
