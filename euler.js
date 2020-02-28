/**
 * Returns the product of all numbers in nums.
 * @param  {Array<Number>} nums Array of real numbers.
 * @return {Number}             Real number.
 */
function product(nums) {
	final = 1;
	for (let i = 0; i < nums.length; i++) final *= nums[i];
	return final;
}

/**
 * Removes a value from an array.
 * @param  {Array}  arr Array of values.
 * @param  {*}      val Value that is in arr.
 * @return {Array}      Array of values.
 */
function remove(arr, val) {
	arr.splice(arr.indexOf(val), 1);
}

/**
 * Returns the sum of all numbers greater than start, less than lessThan, and divisible by divisibleBy.
 * @param  {Number}  start       Whole number.
 * @param  {Number}  lessThan    Whole number greater than start.
 * @param  {Number}  divisibleBy Natural number.
 * @return {Number}              Whole Number
 */
function sumRange(start, lessThan, divisibleBy) {
	start = parseInt((start - 1) / divisibleBy);
	lessThan = parseInt((lessThan - 1) / divisibleBy);
	return (
		(parseInt((lessThan ** 2 + lessThan) / 2) -
			parseInt((start ** 2 + start) / 2)) *
		divisibleBy
	);
}

/**
 * Returns whether val is a palindrome.
 * @param  {Number}  val Whole number.
 * @return {Boolean}     Boolean.
 */
function isPalindrome(val) {
	val = val.toString();
	for (let i = 0; i < val.length; i++) {
		if (val.charAt(i) != val.charAt(val.length - i - 1)) return false;
	}
	return true;
}

/**
 * Returns the prime factors of num.
 * @param  {Number} num    Natural number.
 * @return {Array<Number>} Array of natural numbers.
 */
function primeFactors(num) {
	let arr = [];
	let length = arr.length;
	while (num != 1) {
		length = arr.length;
		for (let i = 2; i < parseInt(num ** 0.5) + 1; i++) {
			if (num % i == 0) {
				arr.push(i);
				num /= i;
				break;
			}
		}
		if (arr.length == length) {
			arr.push(parseInt(num));
			break;
		}
	}
	arr.sort((a, b) => {
		a < b ? -1 : a > b ? 1 : 0;
	});
	return arr;
}

/**
 * Returns the least common multiple of all nums.
 * @param  {...any} nums Natural numbers.
 * @return {Number}         Natural number.
 */
function lcm(...nums) {
	nums = Array.from(nums);
	if (nums.length < 2) {
		return nums[0];
	}
	let arr0 = primeFactors(nums[0]);
	let arr1 = primeFactors(nums[1]);
	let fin = [];
	while (arr0.length > 0) {
		if (arr1.includes(arr0[0])) {
			remove(arr1, arr0[0]);
		}
		fin.push(arr0.shift());
	}
	nums.shift();
	nums.shift();
	nums.unshift(product(arr1) * product(fin));
	return lcm(...nums);
}

/**
 * Returns all fibonacci numbers less than lessThan.
 * @param  {Number} lessThan Natural number.
 * @return {Array<Number>}   Array of whole numbers.
 */
function fib(lessThan) {
	let arr = [0, 1];
	while (arr[arr.length - 1] < lessThan) {
		arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
	}
	if (arr[arr.length - 1] >= lessThan) {
		arr.pop();
	}
	return arr;
}

/**
 * Returns the first n fibonacci numbers.
 * @param  {Number} n      Natural number greater than 1.
 * @return {Array<Number>} Array of whole numbers.
 */
function nFib(n) {
	let arr = [0, 1];
	while (arr.length < n) {
		arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
	}
	return arr;
}

/**
 * Removes all numbers that are multiples of another number.
 * @param  {Array<Number>} nums Array of natural numbers.
 * @return {Array<Number>}      Array of natural numbers.
 */
function removeMultiples(nums) {
	nums.sort((a, b) => {
		a < b ? -1 : a > b ? 1 : 0;
	});
	let arr = [];
	while (nums.length > 0) {
		for (let i = 0; i < nums.length; i++) {
			arr.push(nums.shift());
			for (let j = 0; j < nums.length; j++) {
				if (nums[j] % arr[arr.length - 1] == 0) {
					remove(nums, nums[j]);
				}
			}
		}
	}
	return arr;
}

function euler1(start, lessThan, ...divisibleBy) {
	if (divisibleBy.length == 0) {
		return sumRange(start, lessThan);
	} else if (divisibleBy.length == 1) {
		if (divisibleBy[0] >= lessThan) {
			return 0;
		} else {
			return sumRange(start, lessThan, ...divisibleBy);
		}
	} else {
		divisibleBy = Array.from(divisibleBy);
		let sum = 0;
		let arr = [];
		let temp = divisibleBy.shift();
		sum += euler1(start, lessThan, temp);
		sum += euler1(start, lessThan, ...divisibleBy);
		for (let i = 0; i < divisibleBy.length; i++) {
			divisibleBy[i] = lcm(divisibleBy[i], temp);
		}
		return sum - euler1(start, lessThan, ...divisibleBy);
	}
}

function euler2(lessThan, ...divisibleBy) {
	let arr = fib(lessThan);
	while (divisibleBy.length > 0) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] % divisibleBy[0] != 0) {
				remove(arr, arr[i]);
				i--;
			}
		}
		divisibleBy.shift();
	}
	return arr.reduce((a, b) => a + b);
}

function euler3(num) {
	return primeFactors(num).pop();
}

function euler4() {
	let i = 999;
	let arr = [];
	while (i > 99) {
		let j = 999;
		while (j > 99) {
			if (isPalindrome(i * j)) {
				arr.push(i * j);
			}
			j--;
		}
		i--;
	}
	return arr.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).pop();
}

function euler5(...nums) {
	return lcm(...nums);
}

function euler6(num) {
	let sum = 0;
	for (i = 1; i < num + 1; i++) {
		sum += i;
	}
	sum = sum ** 2;
	for (i = 1; i < num + 1; i++) {
		sum -= i ** 2;
	}
	return sum;
}

let pNums = ['1', '2', '3', '4', '5', '6'];

window.onload = function() {
	for (let i = 0; i < pNums.length; i++) {
		document.getElementById('euler' + pNums[i] + 'code').innerHTML = eval(
			'euler' + pNums[i],
		).toString();
	}
};
