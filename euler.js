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

/**
 * Same functionality as Python's range function but without step.
 * @param  {Number} start    Real number.
 * @param  {Number} lessThan Real number.
 * @return {Array<Number>}   Array of real numbers.
 */
function range(start, lessThan) {
	arr = [];
	for (let i = start; i < lessThan; i++) {
		arr.push(i);
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

function d(name) {
	switch (name) {
		case 'product':
			return [name];
		case 'remove':
			return [name];
		case 'sumRange':
			return [name];
		case 'isPalindrome':
			return [name];
		case 'primeFactors':
			return [name];
		case 'lcm':
			return [name, ...d('product'), ...d('primeFactors'), ...d('remove')];
		case 'fib':
			return [name];
		case 'nFib':
			return [name];
		case 'removeMultiples':
			return [name, ...d('remove')];
		case 'range':
			return [name];
		case 'euler1':
			return [name, ...d('sumRange'), ...d('lcm')];
		case 'euler2':
			return [name, ...d('fib'), ...d('remove')];
		case 'euler3':
			return [name, ...d('primeFactors')];
		case 'euler4':
			return [name, ...d('isPalindrome')];
		case 'euler5':
			return [name, ...d('lcm')];
		case 'euler6':
			return [name];
		default:
			return [name];
	}
}

let euler = [
	{},
	{
		desc:
			'If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.\n' +
			'Find the sum of all the multiples of 3 or 5 below 1000.',
		sol:
			'$$ A_x \\cup A_y = A_x + A_y - A_x \\cap A_y $$' +
			'$$ A_a = \\lbrace a \\equiv 0 \\pmod n : n \\in \\Bbb N \\rbrace $$' +
			'euler1 is a recursive implementation of this formula.',
		code: d('euler1'),
		def: '0,1000,3,5',
	},
	{
		desc:
			'Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be:' +
			'$$ 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, \\ldots $$' +
			'By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.',
		sol:
			'$$ a_0 = 0 $$' +
			'$$ a_1 = 1 $$' +
			'$$ a_n = a_{n-1} + a_{n-2} $$' +
			'$$  $$',
		code: d('euler2'),
		def: '4000000,2',
	},
	{
		desc:
			'The prime factors of 13195 are 5, 7, 13 and 29.' +
			'What is the largest prime factor of the number 600851475143 ?',
		sol: 'euler3sol',
		code: d('euler3'),
		def: '600851475143',
	},
	{
		desc:
			'A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.' +
			'Find the largest palindrome made from the product of two 3-digit numbers.',
		sol: 'euler4sol',
		code: d('euler4'),
		def: '',
	},
	{
		desc:
			'2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.' +
			'What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?',
		sol: 'euler5sol',
		code: d('euler5'),
		def: '...range(1,20)',
	},
	{
		desc:
			'The sum of the squares of the first ten natural numbers is,' +
			'$$ 1^2+2^2+...+10^2=385 $$\n' +
			'The square of the sum of the first ten natural numbers is,\n' +
			'$$ (1+2+...+10)^2=55^2=3025 $$\n' +
			'Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is $$ 3025−385=2640 $$\n' +
			'Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.',
		sol: 'euler6sol',
		code: d('euler6'),
		def: '',
	},
];

function changeProb() {
	let e = document.getElementById('probSelect');
	if (e.options[e.selectedIndex].value == 'All') {
		document.getElementById('euler').innerHTML = '';
		for (let i = 1; i < euler.length; i++) {
			document.getElementById('euler').innerHTML += eulerHTML(i);
		}
	} else {
		document.getElementById('euler').innerHTML = eulerHTML(
			e.options[e.selectedIndex].value,
		);
	}
	MathJax.typeset();
	document.querySelectorAll('pre code').forEach(block => {
		hljs.highlightBlock(block);
	});
}

function eulerHTML(num) {
	let e = euler[num];
	let code = '';
	for (let i = 0; i < e.code.length; i++) {
		code += `<button style="display: inline-block;" onclick="document.getElementById('euler${num}Code${i}').hidden = !document.getElementById('euler${num}Code${i}').hidden">${e.code[i]}</button>`;
	}

	for (let i = 0; i < e.code.length; i++) {
		code += `<div id="euler${num}Code${i}" hidden="true">${eval(
			e.code[i],
		).toString()}</div>`;
	}
	code = code.slice(0, code.length - 4);
	return `<tr id="euler${num}Prob" class="row">
		<td class="euler-col-left col-6">
			<p class="euler-desc" id="euler${num}Desc">${e.desc}</p>
			<hr>
			<p class="euler-sol" id="euler${num}Sol">${e.sol}</p>
		</td>
		<td class="euler-col-right col-6">
			<form onsubmit="eulerEval(${num}); return false;">
				<p style="font-family:monospace;font-size:16px;">euler${num}(<input 
					oninput="document.getElementById('euler${num}Input').size = document.getElementById('euler${num}Input').value.length;"
					id="euler${num}Input" size="${e.def.length}" type="text" value="${e.def}">)
				<button>Try It!</button></p>
				<p id="euler${num}Ans"></p>
			</form>
			<pre id="euler${num}Pre" class="euler-pre"><code id="euler${num}Code" class="euler-code">${code}</pre></code>
		</td>
	</tr>`;
}

function eulerEval(num) {
	ans = document.getElementById(`euler${num}Ans`);
	arg = document.getElementById(`euler${num}Input`).value;
	ans.innerHTML = eval(`euler${num}(${arg});`);
}

window.onload = function() {
	let e = document.getElementById('probSelect');
	e.innerHTML += `<option id="optAll" value="All">All</option>`;
	for (let i = 1; i < euler.length; i++) {
		e.innerHTML += `<option id="opt${i}" value="${i}">${i}</option>`;
	}
	this.changeProb('All');
};
