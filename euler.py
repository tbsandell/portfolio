def product(nums):
	prod = 1
	for num in nums:
		prod *= num
	return prod

def checkInt(*nums):
	for num in nums:
		try:
			assert int(num) == num
		except AssertionError:
			print(str(num) + ' is not an integer\nResults may be incorrect')
			return False
	return True

"""checkInt"""
def sumRange(start, lessThan, divisibleBy = 1):
	"""Returns the sum of all numbers. Integers only"""
	checkInt(start, lessThan, divisibleBy)
	sum = 0
	while start % divisibleBy != 0:
		sum += start
		start += 1
	start = int(start / divisibleBy)
	lessThan = int((lessThan - 1) / divisibleBy)
	return int(sum + divisibleBy * ((lessThan ** 2 + lessThan) - (start ** 2 + start)) / 2)

def isPalindrome(val):
	"""Returns whether or not val is a palindrome. Integers and iterables only"""
	if type(val) == float:
		return False
	if type(val) == int:
		val = str(val)
	for i in range(len(val)):
		if val[i] != val[-i - 1]:
			return False
	return True

def primes(lessThan):
	"""Returns all primes less than lessThan"""
	pass

"""checkInt"""
def primeFactors(num):
	"""Returns the prime factors of num. Integers only"""
	checkInt(num)
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

def primeFactorsDict(num):
	arr = primeFactors(num)
	d = dict()
	for i in arr:
		if i in list(d.keys()):
			d.update({i: d[i] + 1})
		else:
			d.update({i: 1})
	return d

def fib(lessThan):
	"""Returns all fibonacci numbers < lessThan"""
	arr = [0, 1]
	while arr[-1] < lessThan:
		arr.append(arr[-1] + arr[-2])
	if arr[-1] >= lessThan:
		arr.pop()
	return arr

def nFib(n):
	"""Returns all fibonacci numbers up to the nth"""
	arr = [0, 1]
	while len(arr) < n:
		arr.append(arr[-1] + arr[-2])
	return arr

"""checkInt"""
def lcm(*nums):
	"""Returns the least common multiple of *nums. Integers only"""
	primeDicts = [primeFactorsDict(num) for num in nums]
	finalPrimeDict = dict()
	final = 1
	for d in primeDicts:
		for k in list(d.keys()):
			if k in list(finalPrimeDict.keys()):
				if d[k] > finalPrimeDict[k]:
					finalPrimeDict.update({k: d[k]})
			else:
				finalPrimeDict.update({k: d[k]})
	for k in list(finalPrimeDict.keys()):
		final *= k ** finalPrimeDict[k]
	return final
	

def removeDuplicates(arr):
	"""Returns an array with all duplicates removed"""
	tempArr = []
	for i in range(len(arr)):
		if not arr[i] in arr[i + 1: len(arr)]:
			tempArr.append(arr[i])
	return tempArr

"""removeDuplicates"""
def removeOneMultiple(nums):
	nums = sorted(removeDuplicates(nums))
	for i in range(len(nums) - 1):
		for j in range(i + 1, len(nums)):
			if nums[j] % nums[i] == 0:
				nums.remove(nums[j])
				return nums
	return nums

"""removeOneMultiple"""
def removeMultiples(nums):
	"""Returns an array with all multiples removed ([2,3,4,5,6] -> [2,3,5])"""
	arr = []
	while arr != nums:
		arr = nums
		nums = removeOneMultiple(nums)
	return nums

"""checkInt, lcm, sumRange, removeMultiples"""
def euler1(start, lessThan, *divisibleBy):
	"""Returns the sum of all integers 'i' where greaterThan < i < lessThan and i is divisible by all divisibleBy. Integers only"""
	checkInt(start, lessThan, *divisibleBy)
	if len(divisibleBy) == 0:
		return sumRange(start, lessThan)
	elif len(divisibleBy) == 1:
		if divisibleBy[0] >= lessThan:
			return 0
		else:
			return sumRange(start, lessThan, *divisibleBy)
	else:
		divisibleBy = removeMultiples(divisibleBy)
		sum = 0
		arr = []
		for divBy in divisibleBy:
			sum += euler1(start, lessThan, divBy)
		for i in range(len(divisibleBy) - 1):
			arr.append(lcm(divisibleBy[i], divisibleBy[i + 1]))
		sum -= euler1(start, lessThan, *arr)
		return sum

def euler2(lessThan, *divisibleBy):
	"""Returns the sum of all fibonacci numbers < lessThan and divisible by all divisibleBy. Whole numbers only"""
	checkInt(*divisibleBy)
	arr = fib(lessThan)
	for divBy in divisibleBy:
		arr = filter(lambda a: a % divBy == 0, arr)
	return sum(arr)

def euler3(num):
	"""Returns the largest prime factor of num. Whole numbers only"""
	checkInt(num)
	return(primeFactors(num)[-1])

def euler4():
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

def euler5(*nums) :
	"""Returns the smallest number divisible by all whole numbers less than lessThan. Whole numbers only"""
	return lcm(*nums)

def euler6(n):
	"""Returns the difference between the sum of the sqaures of the first n whole numbers and the sqaure of the sum of the first n whole numbers"""
	return sum(range(n)) ** 2 - sum([i ** 2 for i in range(n)])

def euler7(n):
	"""Returns the nth prime"""
	n

def euler700():
	arr0, arr1, m = [1504170715041707, 8912517754604], [1, 3], 4503599627370517
	while arr0[-1] != 0:
		for i in range(1000):
			if (((arr1[-1] * i - arr1[-2]) * arr0[0]) % m) < arr0[-1]:
				arr0.append(((arr1[-1] * i - arr1[-2]) * arr0[0]) % m)
				arr1.append(arr1[-1] * i - arr1[-2])
				break
	return sum(arr0)


	
if __name__ == '__main__':
	print(euler700())