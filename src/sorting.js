let swapCount = 0; 
function createArray(count) {
    return [...Array(count).keys()]
}

function isSorted(toCheck) {
    for (i = 0; i < toCheck.length; i++) {
        if (toCheck[i] > toCheck[i + 1]) {
            return false;
        }
    }
    return true;
}

function shuffle(toShuffle) {
    for (let i = toShuffle.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
    }
    return toShuffle;
}

function swap(toSwap, i, j) {
    swapCount++;
    tmp = toSwap[i];
    toSwap[i] = toSwap[j];
    toSwap[j] = tmp;
    return toSwap;
}

function Bubblesort(toSort) {
    swapCount = 0;
    let didSomething = false;
    for (let i = 0; i < toSort.length; i++) {
        didSomething = false;
        for (let j = 0; j < toSort.length - i; j++) {
            if (toSort[j] > toSort[j + 1]) {
                toSwap = swap(toSort, j, j + 1);
                // swapCount++;
                didSomething = true;
            }
        }
        // premature exit
        if (!didSomething) {
            console.log(swapCount);
            return toSort;
        }
    }
    console.log(swapCount);
    return toSort;
}

function MergesortMuchSpace(toSort) {
    swapCount = 0;

    function merge(m1, m2) {
        let i1 = 0, i2 = 0;
        let res = [];
        while (i1 < m1.length && i2 < m2.length) {
            if (m1[i1] < m2[i2]) {
                res.push(m1[i1++]);
            } else {
                res.push(m2[i2++]);
            }
        }
        for (; i1 < m1.length; i1++) {
            res.push(m1[i1]);
        }
        for (; i2 < m2.length; i2++) {
            res.push(m2[i2]);
        }

        return res;
    }


    // check if final case reached
    if (toSort.length == 1) {
        return toSort;
        // return toSort;
    }

    let pivot = Math.floor(toSort.length / 2);
    return merge(
        MergesortMuchSpace(toSort.slice(0,pivot)),
        MergesortMuchSpace(toSort.slice(pivot, toSort.length)));
    return toSort;
}

function MergesortConstSpace(toSort) {
    return _MergesortConstantSpace(toSort, 0, toSort.length-1);
}

// Works only with an even number of inputs!
function _MergesortConstantSpace(toSort, i1, e2) {
    swapCount = 0;

    // merging with constant space
    function merge(lst, i1, e1, i2, e2) {
        // swapping variable
        let tmp = NaN;

        while (i2 <= e2 && i1 <= e2) {
            // console.log(lst);
            // clear tmp, if possbile
            if (!isNaN(tmp) && i1 == tmp) {
                tmp = NaN;
            }
            // check if the lower value is at i2
            if (lst[i2] < lst[isNaN(tmp) ? i1 : tmp]) {
                swap(lst, i1, i2);
                // do the cleanup
                if (isNaN(tmp)) {
                    tmp = i2;
                }
                i1++; i2++;
            } else {
                // check if tmp is set
                if (!isNaN(tmp)) {
                    swap(lst, tmp, i1);
                    // todo fix this crap! it take way too much time!
                    for (let i = tmp; i < i2 - 1; i++) {
                        swap(lst, i, i + 1);
                    }
                }
                i1++;
            }
        }
        // return toSort;
    }


    // check if final case reached
    if (e2 == i1) {
        return;
        // return toSort;
    }

    let pivot = i1 + Math.floor((e2-i1) / 2);
    // return merge(
    //     Mergesort(toSort.slice(0,pivot)),
    //     Mergesort(toSort.slice(pivot, toSort.length)));
    _MergesortConstantSpace(toSort, i1, pivot);
    _MergesortConstantSpace(toSort, pivot+1, e2);
    merge(toSort, i1,pivot, pivot+1, e2);
    return toSort;
}

function Bogosort(toSort) {
    console.log('starting bogosort');
    let i = 0;
    while (!isSorted(toSort)) {
        shuffle(toSort);
        i++;
    }
    alert("fertig: " + i);
    return toSort;
}

