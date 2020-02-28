from typing import List, TypeVar, Dict
from functools import reduce

number = TypeVar("number", int, float)
intOrList = TypeVar("intOrList", int, float)

def product(nums: List[number]) -> number:
	return reduce(lambda a, b: a * b, nums, 1)

def sumRange(start: int, lessThan: int, divisibleBy: int = 1) -> number:
	"""Returns the sum of all numbers x where start <= x < lessThan and x mod divisibleBy = 0"""
	start = (start - 1) // divisibleBy
	lessThan = (lessThan - 1) // divisibleBy
	return (((lessThan ** 2 + lessThan) // 2) - ((start ** 2 + start) // 2)) * divisibleBy


def isPalindrome(val: intOrList) -> bool:
	"""Returns whether or not val is a palindrome"""
	if type(val) == int:
		val = str(val)
	for i in range(len(val)):
		if val[i] != val[-i - 1]:
			return False
	return True

def primeFactors(num: int) -> List[int]:
	"""Returns the prime factors of num"""
	arr = []
	length = len(arr)
	while num != 1:
		length = len(arr)
		for i in range(2, int(num ** 0.5) + 1):
			if num % i == 0:
				arr.append(i)
				num /= i
				break
		if len(arr) == length:
			arr.append(int(num))
			break
	return sorted(arr)

def lcm(*nums: int) -> int:
	"""Returns the least common multiple of *nums"""
	nums = list(nums)
	if len(nums) < 2:
		return nums[0]
	arr0 = primeFactors(nums[0])
	arr1 = primeFactors(nums[1])
	fin = []
	while len(arr0) > 0:
		if arr0[0] in arr1:
			arr1.remove(arr0[0])
		fin.append(arr0[0])
		arr0 = arr0[1:]
	nums = nums [2:]
	nums.insert(0, product(arr1) * product(fin))
	return lcm(*nums)

def fib(lessThan: int) -> List[int]:
	"""Returns all fibonacci numbers < lessThan"""
	arr = [0, 1]
	while arr[-1] < lessThan:
		arr.append(arr[-1] + arr[-2])
	if arr[-1] >= lessThan:
		arr.pop()
	return arr

def nFib(n: int) -> List[int]:
	"""Returns all fibonacci numbers up to the nth"""
	arr = [0, 1]
	while len(arr) < n:
		arr.append(arr[-1] + arr[-2])
	return arr

def removeMultiples(nums: List[int]) -> List[int]:
	"""Returns an array with all multiples removed ([2,3,4,5,6] -> [2,3,5])"""
	nums = sorted(nums)
	arr = []
	while len(nums) > 0:
		for num in nums:
			nums.remove(num)
			arr.append(num)
			for n in nums:
				if n % arr[-1] == 0:
					nums.remove(n)
	return arr

def euler1(start: int, lessThan: int, *divisibleBy: int) -> int:
	"""Returns the sum of all integers 'i' where greaterThan < i < lessThan and i is divisible by all divisibleBy"""
	if len(divisibleBy) == 0:
		return sumRange(start, lessThan)
	elif len(divisibleBy) == 1:
		if divisibleBy[0] >= lessThan:
			return 0
		else:
			return sumRange(start, lessThan, *divisibleBy)
	else:
		divisibleBy = list(divisibleBy)
		sum = 0
		print(divisibleBy)
		sum += euler1(start, lessThan, divisibleBy[0])
		sum += euler1(start, lessThan, *divisibleBy[1:])
		for i in range(len(divisibleBy)):
			divisibleBy[i] = lcm(divisibleBy[i], divisibleBy[0])
		print(divisibleBy[1:])
		return sum - euler1(start, lessThan, *divisibleBy[1:])

def euler2(lessThan: int, *divisibleBy: int) -> int:
	"""Returns the sum of all fibonacci numbers < lessThan and divisible by all divisibleBy. Whole numbers only"""
	arr = fib(lessThan)
	for divBy in divisibleBy:
		arr = filter(lambda a: a % divBy == 0, arr)
	return sum(arr)

def euler3(num: int) -> int:
	"""Returns the largest prime factor of num"""
	return(primeFactors(num)[-1])

def euler4() -> int:
	"""Returns the largest palindrome made from the product of two 3 digit numbers"""
	i, arr = 999, []
	while i > 99:
		j = 999
		while j > 99:
			if isPalindrome(i * j):
				arr.append(i * j)
			j -= 1
		i -= 1
	return max(arr)

def euler5(*nums: int) -> int:
	"""Returns the smallest number divisible by all whole numbers less than lessThan"""
	return lcm(*nums)

def euler6(n: int) -> int:
	"""Returns the difference between the sum of the sqaures of the first n whole numbers and the sqaure of the sum of the first n whole numbers"""
	return sum(range(n + 1)) ** 2 - sum([i ** 2 for i in range(n + 1)])


def euler700() -> int:
	arr0, arr1, m = [1504170715041707, 8912517754604], [1, 3], 4503599627370517
	while arr0[-1] != 0:
		for i in range(1000):
			if (((arr1[-1] * i - arr1[-2]) * arr0[0]) % m) < arr0[-1]:
				arr0.append(((arr1[-1] * i - arr1[-2]) * arr0[0]) % m)
				arr1.append(arr1[-1] * i - arr1[-2])
				break
	return sum(arr0)
print(sumRange(0,1000,2) + sumRange(0,1000,3) + sumRange(0,1000,5) - sumRange(0,1000,6) - sumRange(0,1000,10) - sumRange(0,1000,15) + sumRange(0,1000,30))
print(euler1(0,1000,2,3,5))