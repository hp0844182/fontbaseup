<h1 align="center">Welcome to regular 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/npm/v/regular.svg">
</p>

> 正則表達式

## 什麽是正則表達式？

```
正則表達式是描述字符串的一种模式（pattern），或者说规律，在處理文本時很有用，最常見的操作就是用於文本查找與替換。
```
## 如何解析正則表達式？


```
正則表達式同樣是由字符組成。不同的字符對應著不同的含義。但是大致分爲三種：位置、對應字符、數量。也就是正則表達式中有些字符代表位置、有些對應這某些字符、有些則對於數量。
```
> 接下來讓我們開始正則的解析吧。

⭐️今天我們以《We will rock you》 的歌詞來作爲測試文本
<details>
  <summary>展開歌詞</summary>
<pre>
    Buddy, you're a boy make a big noise
    Playing in the streets gonna be a big man someday
    You got mud on your face
    You big disgrace
    Kicking your can all over the place
    Singing
    We will, we will rock you
    We will, we will rock you
    Buddy you're a young man, hard man
    Shouting in the street gonna take on the world someday
    You got blood on your face
    You big disgrace
    Waving your banner all over the place
    We will, we will rock you
</pre>
</details>



## 1.  精確匹配字符
```
正則表達式是用來描述字符串的模式，那么最平凡的用法就是精确查找，正则是啥，匹配的字符串就是啥。
```

## 2. 横向模糊匹配
```
比如我们想找到歌词中所有连续出现的“e”。
```
![aa](https://user-gold-cdn.xitu.io/2019/7/17/16bfc12ebae7ea50?imageslim)


```
图中正则形如 p{m,n}，表示 p 至少连续出现 m 到 n 次（包括m、n）。p 可以是一个子模式，不一定只是一个字符
```
![aa](https://user-gold-cdn.xitu.io/2019/7/17/16bfc1a4ccadbec8?imageslim)

```
上图中,修改了部分歌词。正则表示 noise 这个整体重复出现了 1 到 3 次。
不知道此时你是否有疑问，{1,3} 表示 1 到 3 次。为啥上面的匹配结果只有一个呢？而不是匹配到 3 个 noise。又或者 noisenoise 和 noise，这两个结果呢？
这是因为量词有贪婪和惰性之分。{1,3} 这个量词是贪婪的，能满足条件的话，它会尽可能多地匹配。可以在量词的后面加个问号，让其变为惰性的。

```
![cc](https://user-gold-cdn.xitu.io/2019/7/17/16bfc21005f1a5fe?imageslim)

> 现在我们应该对正则中的量词有了一定的概念。下面我们来看量词的一些简写形式：

* \* <==> {0,},即任意个。
* \+ <==> {1,}。即至少一个。
* ?  <==> {0,1}。即有一个或者没有
* {m} 等价于{m,m}

```
这里要说明的是 ? 这时就可能两个含义。即一个表示惰性模式，一个表示量词。(量词后的？为惰性模式，匹配字符后的？为量词)
```
## 3.纵向模糊匹配

```
假设歌词中有几处不小心把“rock”写成“ruck”。我们需要找到二者，可以使用字符集 r[ou]ck。效果如下：  
```
![za](https://user-gold-cdn.xitu.io/2019/7/17/16bfc364b47895a6?imageslim)


```sh
其中 [ou]，这种方括号括起来的模式就是字符集。它是一个集合，匹配“o”或者“u”。又比如我们要找到所有 a 到 e 的字符，可以写成 [abcde]。这种连续的字符也可以简写成 [a-e]。
```
![aq](https://user-gold-cdn.xitu.io/2019/7/17/16bfc39294aaeacf?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
字符集是集合的意思，而集合有补集。正则里在方括号内开头加上脱字符，来表示取反[^a-e]，匹配一个不是 a、b、c、d、e 的某字符
```
![vn](https://user-gold-cdn.xitu.io/2019/7/17/16bfc3b0d3645772?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
字符类的含义搞清楚了，下来我们来看一下常见的简写形式:
```
* \d 等价于 [0-9]。表示是一位数字。digit 的首字母。
* \D 等价于 [^0-9]。
* \w 等价于 [0-9a-zA-Z_]。表示数字、大小写字母和下划线。word的首字母，也称单词字符。
* \W 等价于 [^0-9a-zA-Z_]。
* \s 等价于 [ \t\n\r\f]。表示空白符，包括空格、制表符、换行符、回车符、换页符。记忆方式：s是space character的首字母。
* \S 等价于 [^ \t\v\n\r\f]。
* \S 等价于 [^ \t\v\n\r\f]。
* . 等价于[^\n\r\u2028\u2029]。点是通配符，表示几乎任意字符。
```
字符集是正则实现模糊匹配的另外一种方式，具体到某一位上，要匹配的字符可以是不确定的，我称之为纵向模糊匹配。
```

```
上面我们其实讲了两个东西，字符组和量词。这两个算是正则当中最重要的两个东西。这里再举一个例子。找到所有以“ing”结尾的单词。
```
![az](https://user-gold-cdn.xitu.io/2019/7/17/16bfc4629dadd9ad?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
```
此时，“singing”这个单词分成了“sing”和“ing”。要完整的匹配一个单词。需要匹配位置。
```
## 4.匹配一个具体位置
```
比如匹配“you”这个单词，可能会匹配到“your”中的 you。
```
![sz](https://user-gold-cdn.xitu.io/2019/7/17/16bfc4c18a47d7ee?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
此时我们可以使用\b。b 是单词 boundary 的首字母。它表示匹配一个位置，这个位置某一边是\w，另一边是\W。也就是一边是单词字符，一边是非单词字符，因此它叫单词边界。
```
```
位置也是有反义的。比如 \B 表示非单词边界。我们也可以看看。
```

```
有了单词字符后，要准确的匹配单词“you”，可以使用\byou\b。
```
![a](https://user-gold-cdn.xitu.io/2019/7/17/16bfc50c424f6528?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
除了单词边界这种位置之外，估计大家应该知道 ^ 和 $。它匹配整个文本的开头和结尾。
```
![z](https://user-gold-cdn.xitu.io/2019/7/17/16bfc586460b1dcd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
***
```
还记得前面我们找“we”吗，如果我们想找到所有行开头的 we 单词。我们可以使用多行模式：
```
![gg](https://user-gold-cdn.xitu.io/2019/7/17/16bfc5a139ce71c3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
此时修饰符里多了一个 m，是 multiline 的首字母，表示多行匹配。所谓多行匹配，就是说 ^ 和 $，可以匹配行开头和行结尾，不再局限于整个文本的开头和结尾。
```

> 除了 \b、\B、^、$ 外，还有一种断言位置。比如 (?=p)，表示模式 p 前面的位置。

![zf](https://user-gold-cdn.xitu.io/2019/7/17/16bfc5f205a8c4d2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
```
(?!p)是其反义。还有反向的断言，例如 (?<=p)，表示模式 p 后面的位置。或者说该位置的后面是 p。它也有反义的形式 (?<!p)。请读者自己尝试看看都匹配了啥。
```

```
假如我想找到这样的位置，该位置不能是开头，并且后面的字符是 s，此时该怎么做呢？
```
![dsa](https://user-gold-cdn.xitu.io/2019/7/17/16bfc63f49889458?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 5. 引用
> street 里有两个 e，而 all 里有两个 l。此时我想找到所有这样的双棒字母，该怎么做呢？


> 这个时候我们就需要使用到引用

![](https://user-gold-cdn.xitu.io/2019/7/17/16bfc6d66eae0175?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> \1 是反向引用，表示第一个括号里捕获的数据。那么 \2 呢，表示第二个括号捕获的。

![](https://user-gold-cdn.xitu.io/2019/7/17/16bfc6f673dfac68?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 6. 分支

> 比如我想找到所有的 face 和 place。此时该怎么办？

![](https://user-gold-cdn.xitu.io/2019/7/17/16bfc793d4973bc0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
管道符 |，表示或的关系，多选一。它从左到右面一个个尝试，如果成功，就不再继续尝试了。可以说它是短路的、惰性的。比如用 you|your 去匹配 your 时，它只会匹配到 your 的前 3 个字母。所以分支顺序不同结果可能也会不同。
```