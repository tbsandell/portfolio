function $(str) {
	if (str.charAt(0) == "#") {
		return document.getElementById(str.slice(1));
	} else if (str.charAt(0) == ".") {
		return document.getElementsByClassName(str.slice(1));
	} else if (str.includes(".")) {
		return document.querySelectorAll(str);
	} else {
		return document.getElementsByTagName(str);
	}
}
