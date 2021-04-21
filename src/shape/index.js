import EventDispatcher from "@/utils/eventDispatcher.js";
import styleMap from "@/shape/styleMap.js";
import { isFn, isObject, errorHandler } from "@/utils/base.js";

class Shape extends EventDispatcher {
  constructor({ core = {}, style = {}, events, animation }) {
    super();
    this.core = this._setTrace(core);
    this.style = this._setTrace(style);
    this.events = events;
    this.animation = animation;
    this.path = new Path2D();
    this.dirty = false;
    this.isEnter = false;
    // this.oldData = {}
  }

  /**
   * @param  {Renderer} renderer
   */
  init(renderer) {
    const { ctx, dpr } = renderer;
    this.ctx = ctx;
    this.dpr = dpr;
    this.render();
  }

  render() {
    this.dirty = false;
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    this._setStyles();
    this.path = this.drawPath();
    ctx.fill(this.path);
    ctx.closePath();
    ctx.restore();
  }

  drawPath() {
    errorHandler("render 需要被重写");
  }

  /**
   * @param  {String} eventName
   * @param  {MouseEvent} event
   */
  eventHandler(eventName, event) {
    const realName = this._transformEvent(eventName, event);
    isFn(this.events[realName]) && this.events[realName](this, event);
  }

  remove() {
    this.dispatch("remove", this);
  }

  /**
   * @param  {Object} item
   */
  _setTrace(item) {
    return new Proxy(item, {
      set: (target, prop, value) => {
        target[prop] = value;
        if (!this.dirty) {
          this.dispatch("update", this);
          this.dirty = true;
        }
        return true;
      },
    });
  }

  // TODO: 需要性能优化
  _setStyles() {
    const ctx = this.ctx;
    for (let k of Object.keys(this.style)) {
      const exec = styleMap[k];
      if (exec) {
        exec(ctx, this.style[k]);
      }
    }
  }

  /**
   * ps: 抗锯齿和 isPointInPath 需要校验点击位置
   * @param  {MouseEvent} event
   */
  _isPointInPath(event) {
    return this.ctx.isPointInPath(
      this.path,
      event.offsetX * this.dpr,
      event.offsetY * this.dpr
    );
  }

  /**
   * @param  {String} eventName
   * @param  {MouseEvent} event
   */
  _transformEvent(eventName, event) {
    const isPointInPath = this._isPointInPath(event);
    if (eventName === "click") {
      if (isPointInPath) return "click";
    } else if (eventName === "mousemove") {
      if (!this.isEnter && isPointInPath) {
        this.isEnter = true;
        return "mouseenter";
      } else if (this.isEnter && !isPointInPath) {
        this.isEnter = false;
        return "mouseleave";
      }
    }
    return false;
  }
}

export default Shape;
