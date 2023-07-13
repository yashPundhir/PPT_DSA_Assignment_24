/*

1. **Roman to Integer**

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

```
SymbolValue
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, `2` is written as `II` in Roman numeral, just two ones added together. `12` is written as `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

- `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.
- `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.
- `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.

**Example 1:**

```
Input: s = "III"
Output: 3
Explanation: III = 3.
```

**Example 2:**

```
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
```

**Constraints:**

- `1 <= s.length <= 15`
- `s` contains only the characters `('I', 'V', 'X', 'L', 'C', 'D', 'M')`.
- It is **guaranteed** that `s` is a valid roman numeral in the range `[1, 3999]`.

*/

// Solution

function romanToInt(num) {
	let hash = {
		I: 1,
		V: 5,
		X: 10,
		L: 50,
		C: 100,
		D: 500,
		M: 1000,
	};
	let int = 0;
	for (let i = 0; i < num.length; i++) {
		if (i < num.length - 1 && hash[num[i]] < hash[num[i + 1]]) {
			int = int + hash[num[i + 1]] - hash[num[i]];
			i = i + 1;
		}
		int = int + hash[num[i]];
	}
	return int;
}

/*

2. **Longest Substring Without Repeating Characters**

Given a string `s`, find the length of the **longest substring** without repeating characters.

**Example 1:**

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

**Example 2:**

```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

**Example 3:**

```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

**Constraints:**

- `0 <= s.length <= 50000`
- `s` consists of English letters, digits, symbols and spaces.

*/

//Solution

function longestSubstring(s) {
	let start = 0;
	let end = 0;
	let maxLen = 0;
	let charSet = new Set();

	while (end < s.length) {
		if (!charSet.has(s[end])) {
			charSet.add(s[end]);
			end++;
		} else {
			maxLen = Math.max(maxLen, charSet.size);
			charSet.delete(s[start]);
			start++;
		}
	}
	maxLen = Math.max(maxLen, charSet.size);
	return maxLen;
}

/*

3. **Majority Element**

Given an array `nums` of size `n`, return *the majority element*.

The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

**Example 1:**

```
Input: nums = [3,2,3]
Output: 3
```

**Example 2:**

```
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

**Constraints:**

- `n == nums.length`
- `1 <= n <= 5 * 10^4`
- `-10^9 <= nums[i] <= 10^9`

*/

// Solution

function majorityElement(nums, n) {
	let count = Math.floor(n / 2);
	let hash = {};

	for (const num of nums) {
		if (num in hash) {
			hash[num] = hash[num] + 1;
		} else {
			hash[num] = 1;
		}
	}

	for (const key in hash) {
		if (hash.hasOwnProperty(key)) {
			if (hash[key] > count) {
				return parseInt(key);
			}
		}
	}
}

/*

4. **Group Anagram**

Given an array of strings `strs`, group **the anagrams** together. You can return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**

```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

**Example 2:**

```
Input: strs = [""]
Output: [[""]]
```

**Example 3:**

```
Input: strs = ["a"]
Output: [["a"]]
```

**Constraints:**

- `1 <= strs.length <= 10000`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.

*/

// Solution

function groupAnagrams(strs) {
	const groups = {};

	for (const str of strs) {
		const sortedStr = str.split("").sort().join("");

		if (sortedStr in groups) {
			groups[sortedStr].push(str);
		} else {
			groups[sortedStr] = [str];
		}
	}

	return Object.values(groups); // used to return all the values of all the key value pairs of the object in the form of array
}

/*

 5. **Ugly Numbers**

An **ugly number** is a positive integer whose prime factors are limited to `2`, `3`, and `5`.

Given an integer `n`, return *the* `nth` ***ugly number***.

**Example 1:**

```
Input: n = 10
Output: 12
Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.
```

**Example 2:**

```
Input: n = 1
Output: 1
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
```

**Constraints:**

- `1 <= n <= 1690`

*/

// Solution

function uglyNum(n) {
	let ugly = [1]; // Stores the sequence of ugly numbers
	let i2 = 0,
		i3 = 0,
		i5 = 0; // Pointers for multiplying factors
	let nextMultipleOf2, nextMultipleOf3, nextMultipleOf5;

	while (ugly.length <= n) {
		nextMultipleOf2 = ugly[i2] * 2;
		nextMultipleOf3 = ugly[i3] * 3;
		nextMultipleOf5 = ugly[i5] * 5;

		// Find the minimum ugly number from multiples of 2, 3, and 5
		let nextUglyNum = Math.min(
			nextMultipleOf2,
			nextMultipleOf3,
			nextMultipleOf5
		);
		ugly.push(nextUglyNum);

		// Update the pointers based on the minimum number
		if (nextUglyNum === nextMultipleOf2) {
			i2++;
		}
		if (nextUglyNum === nextMultipleOf3) {
			i3++;
		}
		if (nextUglyNum === nextMultipleOf5) {
			i5++;
		}
	}

	return ugly[n - 1]; // Return the nth ugly number
}

/*

6. **Top K Frequent Words**

Given an array of strings `words` and an integer `k`, return *the* `k` *most frequent strings*.

Return the answer **sorted** by **the frequency** from highest to lowest. Sort the words with the same frequency by their **lexicographical order**.

**Example 1:**

```
Input: words = ["i","love","leetcode","i","love","coding"], k = 2
Output: ["i","love"]
Explanation: "i" and "love" are the two most frequent words.
Note that "i" comes before "love" due to a lower alphabetical order.
```

**Example 2:**

```
Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
Output: ["the","is","sunny","day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words, with the number of occurrence being 4, 3, 2 and 1 respectively.
```

**Constraints:**

- `1 <= words.length <= 500`
- `1 <= words[i].length <= 10`
- `words[i]` consists of lowercase English letters.
- `k` is in the range `[1, The number of **unique** words[i]]`

*/

// Solution

function kFreqWords(words, k) {
	let hash = {};
	let result = [];

	for (const word of words) {
		if (word in hash) {
			hash[word] = hash[word] + 1;
		} else {
			hash[word] = 1;
		}
	}

	const sortedKeys = Object.entries(hash)
		.sort((a, b) => b[1] - a[1])
		.map((entry) => entry[0]);

	for (let i = 0; i < k; i++) {
		result.push(sortedKeys[i]);
	}

	return result;
}

/*

Ques 8.
**Find K Closest Elements**

Given a **sorted** integer array `arr`, two integers `k` and `x`, return the `k` closest integers to `x` in the array. The result should also be sorted in ascending order.

An integer `a` is closer to `x` than an integer `b` if:

- `|a - x| < |b - x|`, or
- `|a - x| == |b - x|` and `a < b`

**Example 1:**

```
Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]
```

**Example 2:**

```
Input: arr = [1,2,3,4,5], k = 4, x = -1
Output: [1,2,3,4]
```

**Constraints:**

- `1 <= k <= arr.length`
- `1 <= arr.length <= 10000`
- `arr` is sorted in **ascending** order.
- -`10000 <= arr[i], x <= 10000`

*/

// Solution

// Using Binary Search

function findClosestElements(arr, k, x) {
	// Perform binary search to find the index of the closest element to x
	let left = 0;
	let right = arr.length - 1;
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (arr[mid] === x) {
			left = mid;
			break;
		} else if (arr[mid] < x) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	// Set the initial range of closest elements
	left--;
	right++;

	// Expand the range until it contains k elements
	while (right - left - 1 < k) {
		if (left < 0) {
			right++;
		} else if (right >= arr.length) {
			left--;
		} else if (Math.abs(arr[left] - x) <= Math.abs(arr[right] - x)) {
			left--;
		} else {
			right++;
		}
	}

	// Return the sublist of k closest elements
	return arr.slice(left + 1, right);
}

//************************************ */
//************************************ */
//************************************ */
//************************************ */

// Using Custom Sort Function

function findClosestElements(arr, k, x) {
	// sort the arr based on x
	arr.sort((num1, num2) => Math.abs(num1 - x) - Math.abs(num2 - x));

	// take only k elements
	return arr.slice(0, k).sort((a, b) => a - b);
}
