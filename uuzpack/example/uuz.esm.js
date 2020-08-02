const ShapeFlags = {
  ELEMENT: 1,
  STATEFUL_COMPONENT: 1 << 2,
  TEXT_CHILDREN: 1 << 3,
  ARRAY_CHILDREN: 1 << 4
};
const getShapeFlag = type => {
  return typeof type === "string" ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT;
};

const createVNode = function (type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  const vnode = {
    el: null,
    component: null,
    key: props && props.key || null,
    type,
    props,
    children,
    shapeFlag: getShapeFlag(type)
  };

  if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  } else if (typeof children === "string") {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  }

  return vnode;
};

const openBlock = (...args) => {
  console.log(args, 'openBlock');
};

const createBlock = (...args) => {
  console.log(args, 'createBlock');
};

const queue = [];
const p = Promise.resolve();
let isFlushPending = false;

function nextTick(fn) {
  return fn ? p.then(fn) : p;
}

function queueJob(job) {
  if (!queue.includes(job)) {
    queue.push(job); // 执行所有的 job

    queueFlush();
  }
}

function queueFlush() {
  // 如果同时触发了两个组件的更新的话
  // 这里就会触发两次 then （微任务逻辑）
  // 但是着是没有必要的
  // 我们只需要触发一次即可处理完所有的 job 调用
  // 所以需要判断一下 如果已经触发过 nextTick 了
  // 那么后面就不需要再次触发一次 nextTick 逻辑了
  if (isFlushPending) return;
  isFlushPending = true;
  nextTick(flushJobs);
}

function flushJobs() {
  isFlushPending = false;
  let job;

  while (job = queue.shift()) {
    if (job) {
      job();
    }
  }
}

let targetMap = new WeakMap();
let activeEffect;

function effect(fn, options = {}) {
  const _effect = function (...args) {
    activeEffect = _effect;
    return fn(...args);
  };
  /* computed相关 */


  if (!options.lazy) {
    _effect();
  }
  /* 
    options 比如：scheduler
  */


  _effect.options = options;
  return _effect;
}

function track(target, key) {
  let depsMap = targetMap.get(target);

  if (!depsMap) {
    targetMap.set(target, depsMap = new Map());
  }

  let dep = depsMap.get(key);

  if (!dep) {
    depsMap.set(key, dep = new Set());
  }

  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const effects = new Set();
  depsMap.get(key).forEach(e => effects.add(e));
  effects.forEach(e => scheduleRun(e));
}

function scheduleRun(effect) {
  if (effect.options.scheduler !== void 0) {
    effect.options.scheduler(effect);
  } else {
    effect();
  }
}

function reactive(target) {
  return new Proxy(target, {
    get(target, prop) {
      track(target, prop);
      return Reflect.get(target, prop);
    },

    set(target, prop, newVal) {
      Reflect.set(target, prop, newVal);
      trigger(target, prop);
      /* 
        必须 return true;
        否则会产生警告 'set' on proxy: trap returned falsish for property
      */

      return true;
    }

  });
}

function ref(target) {
  let value = target;
  const obj = {
    get value() {
      track(obj, 'value');
      return value;
    },

    set value(newVal) {
      if (newVal !== value) {
        value = newVal;
        trigger(obj, 'value');
      }
    }

  };
  return obj;
}

function computed(fn) {
  let dirty = true;
  let value;

  let _computed;

  const runner = effect(fn, {
    lazy: true,
    scheduler: e => {
      if (!dirty) {
        dirty = true;
        trigger(_computed, 'value');
      }
    }
  });
  _computed = {
    get value() {
      if (dirty) {
        value = runner();
        dirty = false;
      }

      track(_computed, 'value');
      return value;
    }

  };
  return _computed;
}

function hostCreateElement(type) {
  console.log("hostCreateElement", type);
  const element = document.createElement(type);
  return element;
}

function hostSetElementText(el, text) {
  console.log("hostSetElementText", el, text);
  el.innerText = text;
}

function hostPatchProp(el, key, preValue, nextValue) {
  // preValue 之前的值
  // 为了之后 update 做准备的值
  // nextValue 当前的值
  console.log(`hostPatchProp 设置属性:${key} 值:${nextValue}`);
  console.log(`key: ${key} 之前的值是:${preValue}`);

  switch (key) {
    case "id":
    case "tId":
      if (nextValue === null || nextValue === undefined) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, nextValue);
      }

      break;

    case "onclick":
      // todo
      // 先临时实现 click 事件
      // 后面应该用 directive 来处理
      el.addEventListener("click", nextValue);
      break;
  }
}

function hostInsert(child, parent, anchor = null) {
  console.log("hostInsert");

  if (anchor) {
    parent.insertBefore(child, anchor);
  } else {
    parent.appendChild(child);
  }
}

function hostRemove(child) {
  const parent = child.parentNode;

  if (parent) {
    parent.removeChild(child);
  }
}

function createComponentInstance(vnode) {
  const instance = {
    type: vnode.type,
    vnode,
    props: {},
    proxy: null,
    isMounted: false
  };
  return instance;
}

const render = (vnode, container) => {
  console.log(vnode, ' render');
  patch(null, vnode, container);
};

function patch(oldVnode, vnode, container = null) {
  const {
    type,
    shapeFlag
  } = vnode;

  switch (type) {
    // TODO: 各种类型
    case "text":
      break;

    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        console.log("patch element");
        processElement(oldVnode, vnode, container);
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        console.log("patch component");
        processComponent(oldVnode, vnode, container);
      }

  }
}

function processElement(n1, n2, container) {
  if (!n1) {
    mountElement(n2, container);
  } else {
    // todo
    updateElement(n1, n2);
  }
}

function updateElement(n1, n2, container) {
  const oldProps = n1 && n1.props || {};
  const newProps = n2.props || {}; // 应该更新 element

  console.log("应该更新 element");
  console.log("旧的 vnode", n1);
  console.log("新的 vnode", n2); // 需要把 el 挂载到新的 vnode

  const el = n2.el = n1.el; // 对比 props

  patchProps(el, oldProps, newProps); // 对比 children

  patchChildren(n1, n2, el);
}

function patchProps(el, oldProps, newProps) {
  // 对比 props 有以下几种情况
  // 1. oldProps 有，newProps 也有，但是 val 值变更了
  // 举个栗子
  // 之前: oldProps.id = 1 ，更新后：newProps.id = 2
  // key 存在 oldProps 里 也存在 newProps 内
  // 以 newProps 作为基准
  for (const key in newProps) {
    const prevProp = oldProps[key];
    const nextProp = newProps[key];

    if (prevProp !== nextProp) {
      // 对比属性
      // 需要交给 host 来更新 key
      hostPatchProp(el, key, prevProp, nextProp);
    }
  } // 2. oldProps 有，而 newProps 没有了
  // 之前： {id:1,tId:2}  更新后： {id:1}
  // 这种情况下我们就应该以 oldProps 作为基准，因为在 newProps 里面是没有的 tId 的
  // 还需要注意一点，如果这个 key 在 newProps 里面已经存在了，说明已经处理过了，就不要在处理了


  for (const key in oldProps) {
    const prevProp = oldProps[key];
    const nextProp = null;

    if (!(key in newProps)) {
      // 这里是以 oldProps 为基准来遍历，
      // 而且得到的值是 newProps 内没有的
      // 所以交给 host 更新的时候，把新的值设置为 null
      hostPatchProp(el, key, prevProp, nextProp);
    }
  }
}

function patchChildren(n1, n2, container) {
  const {
    shapeFlag: prevShapeFlag,
    children: c1
  } = n1;
  const {
    shapeFlag,
    children: c2
  } = n2; // 如果 n2 的 children 是 text 类型的话
  // 就看看和之前的 n1 的 children 是不是一样的
  // 如果不一样的话直接重新设置一下 text 即可

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    if (c2 !== c1) {
      console.log("类型为 text_children, 当前需要更新");
      hostSetElementText(container, c2);
    }
  } else {
    // 如果之前是 array_children
    // 现在还是 array_children 的话
    // 那么我们就需要对比两个 children 啦
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        patchKeyedChildren(c1, c2, container);
      }
    }
  }
}

function patchKeyedChildren(c1, c2, container) {
  let i = 0;
  let e1 = c1.length - 1;
  let e2 = c2.length - 1;

  const isSameVNodeType = (n1, n2) => {
    return n1.type === n2.type && n1.key === n2.key;
  };

  while (i <= e1 && i <= e2) {
    const prevChild = c1[i];
    const nextChild = c2[i];

    if (!isSameVNodeType(prevChild, nextChild)) {
      console.log("两个 child 不相等(从左往右比对)");
      console.log(`prevChild:${prevChild}`);
      console.log(`nextChild:${nextChild}`);
      break;
    }

    console.log("两个 child 相等，接下来对比着两个 child 节点(从左往右比对)");
    patch(prevChild, nextChild, container);
    i++;
  }

  while (i <= e1 && i <= e2) {
    // 从右向左取值
    const prevChild = c1[e1];
    const nextChild = c2[e2];

    if (!isSameVNodeType(prevChild, nextChild)) {
      console.log("两个 child 不相等(从右往左比对)");
      console.log(`prevChild:${prevChild}`);
      console.log(`nextChild:${nextChild}`);
      break;
    }

    console.log("两个 child 相等，接下来对比着两个 child 节点(从右往左比对)");
    patch(prevChild, nextChild, container);
    e1--;
    e2--;
  }

  if (i > e1 && i <= e2) {
    // 如果是这种情况的话就说明 e2 也就是新节点的数量大于旧节点的数量
    // 也就是说新增了 vnode
    // 应该循环 c2
    while (i <= e2) {
      console.log(`需要新创建一个 vnode: ${c2[i].key}`);
      patch(null, c2[i], container);
      i++;
    }
  } else if (i > e2 && i <= e1) {
    // 这种情况的话说明新节点的数量是小于旧节点的数量的
    // 那么我们就需要把多余的
    while (i <= e1) {
      console.log(`需要删除当前的 vnode: ${c1[i].key}`);
      hostRemove(c1[i].el);
      i++;
    }
  } else {
    // 左右两边都比对完了，然后剩下的就是中间部位顺序变动的
    // 例如下面的情况
    // a,b,[c,d,e],f,g
    // a,b,[e,c,d],f,g
    let s1 = i;
    let s2 = i;
    const keyToNewIndexMap = new Map(); // 先把 key 和 newIndex 绑定好，方便后续基于 key 找到 newIndex

    for (let i = s2; i <= e2; i++) {
      const nextChild = c2[i];
      keyToNewIndexMap.set(nextChild.key, i);
    } // 需要处理新节点的数量


    const toBePatched = e2 - s2 + 1;
    const newIndexToOldIndexMap = new Array(toBePatched);

    for (let index = 0; index < newIndexToOldIndexMap.length; index++) {
      // 源码里面是用 0 来初始化的
      // 但是有可能 0 是个正常值
      // 我这里先用 -1 来初始化
      newIndexToOldIndexMap[index] = -1;
    } // 遍历老节点
    // 1. 需要找出老节点有，而新节点没有的 -> 需要把这个节点删除掉
    // 2. 新老节点都有的，—> 需要 patch


    for (i = s1; i <= e1; i++) {
      const prevChild = c1[i];
      const newIndex = keyToNewIndexMap.get(prevChild.key);
      newIndexToOldIndexMap[newIndex] = i; // 因为有可能 nexIndex 的值为0（0也是正常值）
      // 所以需要通过值是不是 undefined 来判断
      // 不能直接 if(newIndex) 来判断

      if (newIndex === undefined) {
        // 当前节点的key 不存在于 newChildren 中，需要把当前节点给删除掉
        hostRemove(prevChild.el);
      } else {
        // 新老节点都存在
        console.log("新老节点都存在");
        patch(prevChild, c2[newIndex], container);
      }
    } // 遍历新节点
    // 1. 需要找出老节点没有，而新节点有的 -> 需要把这个节点创建
    // 2. 最后需要移动一下位置，比如 [c,d,e] -> [e,c,d]


    for (i = e2; i >= s2; i--) {
      const nextChild = c2[i];

      if (newIndexToOldIndexMap[i] === -1) {
        // 说明是个新增的节点
        patch(null, c2[i], container);
      } else {
        // 有可能 i+1 没有元素 没有的话就直接设置为 null
        // 在 hostInsert 函数内如果发现是 null 的话，会直接添加到父级容器内
        const anchor = i + 1 >= e2 + 1 ? null : c2[i + 1];
        hostInsert(nextChild.el, container, anchor && anchor.el);
      }
    }
  }
}

function mountElement(vnode, container) {
  const {
    shapeFlag,
    props
  } = vnode; // 1. 先创建 element
  // 基于可扩展的渲染 api

  const el = vnode.el = hostCreateElement(vnode.type); // 支持单子组件和多子组件的创建

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // 举个栗子
    // render(){
    //     return h("div",{},"test")
    // }
    // 这里 children 就是 test ，只需要渲染一下就完事了
    console.log(`处理文本:${vnode.children}`);
    hostSetElementText(el, vnode.children);
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // 举个栗子
    // render(){
    // Hello 是个 component
    //     return h("div",{},[h("p"),h(Hello)])
    // }
    // 这里 children 就是个数组了，就需要依次调用 patch 递归来处理
    mountChildren(vnode.children, el);
  } // 处理 props


  if (props) {
    for (const key in props) {
      // todo
      // 需要过滤掉vue自身用的key
      // 比如生命周期相关的 key: beforeMount、mounted
      const nextVal = props[key];
      hostPatchProp(el, key, null, nextVal);
    }
  } // todo
  // 触发 beforeMount() 钩子


  console.log("vnodeHook  -> onVnodeBeforeMount");
  console.log("DirectiveHook  -> beforeMount");
  console.log("transition  -> beforeEnter"); // 插入

  hostInsert(el, container); // todo
  // 触发 mounted() 钩子

  console.log("vnodeHook  -> onVnodeMounted");
  console.log("DirectiveHook  -> mounted");
  console.log("transition  -> enter");
}

function mountChildren(children, container) {
  children.forEach(VNodeChild => {
    // todo
    // 这里应该需要处理一下 vnodeChild
    // 因为有可能不是 vnode 类型
    console.log("mountChildren:", VNodeChild);
    patch(null, VNodeChild, container);
  });
}

function processComponent(n1, n2, container) {
  // 如果 n1 没有值的话，那么就是 mount
  if (!n1) {
    // 初始化 component
    mountComponent(n2, container);
  }
}

function mountComponent(initialVNode, container) {
  // 1. 先创建一个 component instance
  const instance = initialVNode.component = createComponentInstance(initialVNode);
  console.log(`创建组件实例:`, instance);
  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function setupComponent(instance) {
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance) {
  console.log(instance.type, 'instance.type');
  const {
    setup
  } = instance.type.setup;
  const setupResult = setup && setup(instance.props);
  console.log('获取setup值', setupResult);
  handleSetupResult(instance, setupResult);
}

function handleSetupResult(instance, setupResult) {
  // setup 返回值不一样的话，会有不同的处理
  // 1. 看看 setupResult 是个什么
  if (typeof setupResult === "function") {
    // 如果返回的是 function 的话，那么绑定到 render 上
    // 认为是 render 逻辑
    // setup(){ return ()=>(h("div")) }
    instance.render = setupResult;
  } else if (typeof setupResult === "object") {
    // 返回的是一个对象的话
    // 先存到 setupState 上
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance) {
  // 给 instance 设置 render
  // 先取到用户设置的 component options
  const Component = instance.type;

  if (!instance.render) ;

  instance.render = Component.render; // applyOptions()
}

function setupRenderEffect(instance, container) {
  // 调用 render
  // 应该传入 ctx 也就是 proxy
  // ctx 可以选择暴露给用户的 api
  // 源代码里面是调用的 renderComponentRoot 函数
  // 这里为了简化直接调用 render
  // obj.name  = "111"
  // obj.name = "2222"
  // 从哪里做一些事
  // 收集数据改变之后要做的事 (函数)
  // 依赖收集   effect 函数
  // 触发依赖
  instance.update = effect(function componentEffect() {
    if (!instance.isMounted) {
      // 组件初始化的时候会执行这里
      // 为什么要在这里调用 render 函数呢
      // 是因为在 effect 内调用 render 才能触发依赖收集
      // 等到后面响应式的值变更后会再次触发这个函数
      console.log("调用 render,获取 subTree");
      const subTree = instance.subTree = instance.render(instance.proxy);
      console.log("subTree", subTree); // todo

      console.log(`${instance.type.name}:触发 beforeMount hook`);
      console.log(`${instance.type.name}:触发 onVnodeBeforeMount hook`); // 这里基于 subTree 再次调用 patch
      // 基于 render 返回的 vnode ，再次进行渲染
      // 这里我把这个行为隐喻成开箱
      // 一个组件就是一个箱子
      // 里面有可能是 element （也就是可以直接渲染的）
      // 也有可能还是 component
      // 这里就是递归的开箱
      // 而 subTree 就是当前的这个箱子（组件）装的东西
      // 箱子（组件）只是个概念，它实际是不需要渲染的
      // 要渲染的是箱子里面的 subTree

      patch(null, subTree, container);
      console.log(`${instance.type.name}:触发 mounted hook`);
      instance.isMounted = true;
    } else {
      // 响应式的值变更后会从这里执行逻辑
      // 主要就是拿到新的 vnode ，然后和之前的 vnode 进行对比
      console.log("调用更新逻辑"); // 拿到最新的 subTree

      const nextTree = instance.render(instance.proxy); // 替换之前的 subTree

      const prevTree = instance.subTree;
      instance.subTree = nextTree; // 触发 beforeUpdated hook

      console.log("beforeUpdated hook");
      console.log("onVnodeBeforeUpdate hook"); // 用旧的 vnode 和新的 vnode 交给 patch 来处理

      patch(prevTree, nextTree, prevTree.el); // 触发 updated hook

      console.log("updated hook");
      console.log("onVnodeUpdated hook");
    }
  }, {
    scheduler: effect => {
      // 把 effect 推到微任务的时候在执行
      queueJob(effect);
    }
  });
}

const createApp = (rootComponent, rootProps = null) => {
  const app = {
    mount(rootDom) {
      // 此时 rootComponent = {setup, render}
      const vnode = createVNode(rootComponent, rootProps);
      app._container = rootDom;
      render(vnode, rootDom);
    }

  };
  return app;
};

const isObject = val => val !== null && typeof val === 'object';

const toDisplayString = val => {
  return val == null ? '' : isObject(val) ? JSON.stringify(val, replacer, 2) : String(val);
};

export { computed, createApp, createBlock, createVNode, effect, nextTick, openBlock, queueJob, reactive, ref, render, toDisplayString };
