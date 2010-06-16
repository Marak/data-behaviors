/* not really needed for EF 2.0, will add in later


	if (/[^0-9-]+/.test(value))
		return false;
	var nCheck = 0,
		nDigit = 0,
		bEven = false;

	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n);
		var nDigit = parseInt(cDigit, 10);
		if (bEven) {
			if ((nDigit *= 2) > 9)
				nDigit -= 9;
		}
		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;

*/