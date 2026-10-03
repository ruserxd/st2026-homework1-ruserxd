# nycu-swt-lab2

## PartA 手動分析四塊程式碼的問題

### 1 findLast

(a) 指出錯在哪裡，並提出修改方式
- 錯誤：i > 0 就停止，所以不會跑到 i == 0 的時候。
- 修改：應改成 `for (let i = x.length - 1; i >= 0; i--)`。

(b) 找出一個「完全不會執行到 fault」的測資
- 測資：x = 1，y = 3
- 理由：這個測試資料都測不到 fault，因為會在判斷是否為陣列時，就拋出 TypeError('The first parameter must be an array')。

(c) 找出一個「有執行到 fault，但狀態沒變錯」的測資
- 測資：x = [1, 2, 3]，y = 3
- 理由：這個測試有執行到 fault 的部分 (i > 0) 的 for 迴圈判斷，但是如果我們改成 i >= 0 時，一樣會在 i = 2 時就提早 return 2，所以回傳都是 2 符合預期的結果。
- Expected = 2, Actual = 2

(d) 找出一個「狀態有變錯，但最後輸出剛好是對的」的測資
- 測資：x = [1, 2, 3]，y = 4
- Expected = -1, Actual = -1


(e) 針對 (d)，描述錯誤狀態
- 第一個 error state：x = [1, 2, 3]，y = 4，i = 0，PC 指向 `return -1`
- 正確程式此時應為：PC 指向 `if (x[i] === y) {`
- 過程：
  - i = 2 時，3 !== 4 所以繼續做下去
  - i = 1 時，2 !== 4 所以繼續做下去
  - i = 0 時，因為判斷式的不同當前的判斷不會跑到陣列為 [0] 的位置，而 i >= 0 的則會多判斷一次 1 != 4，雖然輸出的結果都為 -1

### 2 lastZero

(a) 指出錯在哪裡，並提出修改方式
- 錯誤：錯在他是從 i = 0 開始，但是方法期望回傳的是最後一個 idx，所以假設當出現兩個 0 在陣列時，會先輸出前面的而非後者。
- 修改：程式碼應改成 `for (let i = x.length - 1; i >= 0; i--)`

(b) 找出一個「完全不會執行到 fault」的測資
- 測資：x = 1
- 理由：因為 input 非 array 所以會直接拋出 TypeError('Not an array')，不會經歷 for 迴圈

(c) 找出一個「有執行到 fault，但狀態沒變錯」的測資
- 測資：x = [0]
- 理由：因為陣列的大小為 1，所以不管怎樣 i 都從 0 開始，因為 x[0] === 0，所以會直接回傳 0
- Expected = 0, Actual = 0

(d) 找出一個「狀態有變錯，但最後輸出剛好是對的」的測資
- 測資：x = [1, 2, 0]
- Expected = 2, Actual = 2


(e) 針對 (d)，描述錯誤狀態
- 說明：有成功的找到 x[2] 是 0 並回傳 2，雖然實際與預期的回傳值仍然是相同的，但是迴圈的順序反了，所以狀態會錯誤。
- 第一個 error state：x = [1, 2, 0]，i = 0，PC 指向 `if (x[i] === 0)`
- 正確程式此時應為：i = 2（PC 同樣指向 `if (x[i] === 0)`）
- 過程：
  - 有 bug 的迴圈是從 i = 0 開始
    - i = 0，1 !== 0
    - i = 1，2 !== 0
    - i = 2，發現 0 === 0 回傳 2
  - 而正確的迴圈是要從 i = 2 開始
    - i = 2，第一次就發現 0 === 0 回傳 2

### 3 countPositive

(a) 指出錯在哪裡，並提出修改方式
- 錯誤：for 迴圈裡面，判斷是否為 Positive 寫錯了，0 不是正數
- 修改：應改成 `if (x[i] > 0)`

(b) 找出一個「完全不會執行到 fault」的測資
- 測資：x = 1
- 理由：這個測試資料都測不到 fault，因為會在判斷是否為陣列時，就拋出 TypeError('Not an array')。

(c) 找出一個「有執行到 fault，但狀態沒變錯」的測資
- 測資：x = [1, 2, 3]
- 理由：對於陣列的數值判斷為 >= 0 或 > 0 結果都一樣為 true，最後的回傳值與預期值也皆為 3。
- Expected = 3, Actual = 3

(d) 找出一個「狀態有變錯，但最後輸出剛好是對的」的測資
- 結論：不可能經歷狀態有變錯，但最後輸出可以是對的情況。
- 理由：一但 x[i] = 0 判斷要 count++ 就無法再將結果倒退回去，以 [-4, 2, 0, 2] 為測資範例
- Expected = 2, Actual = 3

(e) 針對 (d)，描述錯誤狀態
- 第一個 error state：x = [-4, 2, 0, 2]，i = 2，count = 1，PC 指向 `count++`
- 正確程式此時應為：PC 指向 `i++`
- 過程：
  - x[i] >= 0 時（count = 0）
    - i = 0，因為 -4 < 0，count = 0
    - i = 1，因為 2 >= 0，count = 1
    - i = 2，因為 0 === 0，count = 2
    - i = 3，因為 2 >= 0，count = 3
    - return 3
  - x[i] > 0 時（count = 0）
    - i = 0，因為 -4 < 0，count = 0
    - i = 1，因為 2 > 0，count = 1
    - i = 2，因為 0 <= 0，count = 1
    - i = 3，因為 2 > 0，count = 2
    - return 2
- 說明：在 i = 2 的情況，兩者的 count 計算結果不同，也造成了最後的預期結果與實際不同

### 4 oddOrPos

(a) 指出錯在哪裡，並提出修改方式
- 錯誤：for 迴圈裡面，判斷是否為 odd 寫錯了，沒有考慮到出現負數且奇數的情況，例如：-3, -1
- 修改：for 迴圈內的判斷式應改成 `Math.abs(x[i] % 2) === 1`，當出現負數的奇數數字時，才能判斷是否為 odd

```js
if (Math.abs(x[i] % 2) === 1 || x[i] > 0) {
    count++;
}
```

(b) 找出一個「完全不會執行到 fault」的測資
- 測資：x = 1
- 理由：這個測試資料都測不到 fault，因為會在判斷是否為陣列時，就拋出 TypeError('Not an array')。

(c) 找出一個「有執行到 fault，但狀態沒變錯」的測資
- 測資：x = [-4, 1, 2, 3]
- 理由：雖然原始的程式碼有執行到 x[i] % 2 === 1，但是因為 -4 本身就不是奇數，所以並不會影響狀態（-4 % 2 !== 1 且 Math.abs(-4 % 2) !== 1）以及 Expected 跟 Actual 的結果
- Expected = 3, Actual = 3

(d) 找出一個「狀態有變錯，但最後輸出剛好是對的」的測資
- 結論：不可能
- 理由：如果 x[i] % 2 === 1 因為是負數的奇數被判斷為 false，那後面的 x[i] > 0 也必定為 false，這會造成 count 沒有加上一，後續也沒有任何判斷把缺少的再補上，因而造成輸出結果錯誤，以 [-3, -2, 0, 1, 4] 為測資範例。
- Expected = 3, Actual = 2

(e) 針對 (d)，描述錯誤狀態
- 第一個 error state：x = [-3, -2, 0, 1, 4]，i = 0，count = 0，PC 指向 `i++`
- 正確程式此時應為：PC 指向 `count++`
- 說明：錯誤在 i = 0 時，就出現了
- 過程：
  - 錯誤的程式碼
    - i = 0，-3 % 2 !== 1，因此 count = 0

## PartB
### 第一次
我是直接在 lab2/ 這份專案下跑 claude code，但發現到他會讀取我在 PEADME.md 寫的 PartA 答案，，因此想到要設置一個乾淨的環境生成測試。

### 前置作業(PromptA)
為了不讓 claude code 讀到我撰寫好的 README.md PartA 所以需要先創一個空的資料夾，讓他單純透過程式碼生成每個方法的測試案例
```
newrun() {
  rm -rf ~/hw1-run && mkdir ~/hw1-run
  cp /Users/ruserxd/Desktop/master/SWT/lab2/hw1.js ~/hw1-run/
  cd ~/hw1-run && ls && claude
}
```
這樣每次只需要在終端機打上 newrun 就會重新生成一個乾淨的環境

### 前置作業(PromptB)
這次的指令只需要一個空的資料夾，剩下透過 prompt 告訴其規格就好
```
newspec() {
  rm -rf ~/hw1-spec && mkdir ~/hw1-spec
  cd ~/hw1-spec && ls && claude # 確保資料夾要空的
}
```
這樣每次只需要在終端機打上 newspec 就會重新生成一個乾淨的環境

### 路徑問題
- Prompt A 的 agent 把測試檔放在根目錄，所以寫成 ./hw1.js。搬進 test/ 之後，路徑要改成 ../hw1.js。
- Prompt B 的 agent 看不到實作，所以自己猜 ./findLast 這樣形式的路徑。

```
cd /Users/ruserxd/Desktop/master/SWT/lab2
perl -i -pe 'if (m{require\(\x27\./hw1(\.js)?\x27\)}) { $o=$_; chomp $o; s{\./hw1(\.js)?}{../hw1.js}; $_ = "// [EDITED by student] original: $o\n$_"; }' test/promptA_*.test.js

grep -n -B1 "require('../hw1.js')" test/promptA_*.test.js
```
```
perl -i -pe 'if (m{require\(\x27\./(findLast|lastZero|countPositive|oddOrPos)(\.js)?\x27\)}) { $o=$_; chomp $o; s{\./(findLast|lastZero|countPositive|oddOrPos)(\.js)?}{../hw1.js}; $_ = "// [EDITED by student] original: $o\n$_"; }' test/promptB_*.test.js

grep -n -B1 "require('../hw1.js')" test/promptB_*.test.js
```
### claude code 聊天紀錄
都存在 assets/ 下，log_promptA_*.txt, log_promptB_*.txt