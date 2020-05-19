const isPrime = (data) => {
    return new Promise((resolve, reject) => {
        const date = new Date(data.dt);
        const day = date.getDate();
        var i, flag = true;

        for (i = 2; i <= day - 1; i++)
            if (day % i == 0) {
                flag = false;
                break;
            }

        if (flag == true)
            resolve({ isPrime: true, data: data });
        else
            resolve({ isPrime: false, data: 'Date is not prime so no data' });
    })
}

// Start - Testing Purpose
function isPrimeTest(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}
// End - Testing Purpose

module.exports.isPrime = isPrime;
