// PromiseA+:https://promisesaplus.com/
class MyPromise {
  //-- 2.1-->promise只能是这三个状态中的一种
  static PENDING = '等待'
  static FULFILLED = '成功'
  static REJECTED = '失败'
  constructor(execute) {
    this.value = undefined;
    this.reason = undefined
    this.status = MyPromise.PENDING
    this.onFulfilledFns = []
    this.onRejectedFns = []
    execute(this.resolve, this.reject)
  }
  resolve = (value) => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED
      this.value = value
      while (this.onFulfilledFns.length) {
        this.onFulfilledFns.shift()()
      }
    }
  }
  reject = (reason) => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED
      this.reason = reason
      while (this.onRejectedFns.length) {
        this.onRejectedFns.shift()()
      }
    }
  }
  then = (onFulfilled, onRejected) => {
    const promise2 = new MyPromise((resolve, reject) => {
      //--当resolve，reject非函数时，当前promise状态其值保留到下一promise
      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : resolve;
      onRejected = typeof onRejected === "function" ? onRejected : reject;
      const doFullfill = () => {
        //-- 通过queueMicrotask创建微任务
        queueMicrotask(() => {
          try {
            var x = onFulfilled(this.value)
            // --onFulfilled正常返回，则执行Promise 解决过程
            promiseResolve(x, promise2, resolve, reject)
          } catch (error) {
            // 抛错，则执行后promise-reject
            reject(error)
          }

        })
      }
      // 处理拒绝态
      const doReject = () => {
        queueMicrotask(() => {
          try {
            var x = onRejected(this.reason)
            // onRejected正常返回，则执行后Promise 解决过程
            promiseResolve(x, promise2, resolve, reject)
          } catch (error) {
            // 抛错，则执行promise2-reject
            reject(error)
          }
        })
      }
      if (this.status === MyPromise.FULFILLED) {
        // 调用then时，状态已经非ending,则立即添加微任务执行onFulfilled
        doFullfill()
      }
      if (this.status === MyPromise.PENDING) {
        // 调用then时，状态为pending,则在事件数组中添加
        this.onFulfilledFns.push(doFullfill)
        this.onRejectedFns.push(doReject)
      }
      if (this.status === MyPromise.REJECTED) {
        // 调用then时，状态已经飞pending，立即添加微任务执行onReject
        doReject()
      }
    })
    return promise2
  }
}

/**
 * Promise解决过程
 * @param {*} x onRejected，onFulfilled 返回值
 * @param {*} promise2 下一promise
 * @param {*} resolve promise2 
 * @param {*} reject promise2
 */
function promiseResolve(x, promise2, resolve, reject) {
  // 当返回值 === promise2时，promise2以TypeError=》rejected
  // 死循环了
  if (x === promise2) {
    throw TypeError('Chaining cycle detected for promise')
  }
  // x只要是类promise对象就执行下面
  if ((x && typeof x === 'object') || typeof x === 'function') {
    // 因为x是一个类promise对象，不清楚其如何执行，在这里价格限制
    let called = false
    try {
      var then = x.then
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return;
          called = true;
          promiseResolve(y, promise2, resolve, reject)
        }, (e) => {
          if (called) return;
          called = true;
          reject(e)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error)
    }
  } else {
    resolve(x)
  }
}

MyPromise.defer = MyPromise.deferred = function () {
  let deferred = {}

  deferred.promise = new MyPromise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  return deferred
}

module.exports = MyPromise
var m = new MyPromise((r)=>{
  r()
}).then(()=>{
  return new Promise((r=>{
    r(123)
  }))
}).then((data)=>{
  console.log(typeof data.then);
})