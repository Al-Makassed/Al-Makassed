export const not = (a: readonly number[], b: readonly number[]) => {
    return a.filter((value) => b.indexOf(value) === -1);
}

export const intersection = (a: readonly number[], b: readonly number[]) => {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export const union = (a: readonly number[], b: readonly number[]) => {
    return [...a, ...not(b, a)];
}
