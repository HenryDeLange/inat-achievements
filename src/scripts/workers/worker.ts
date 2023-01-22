export function expensive(x: number) {
    console.log('worker >>', x)
    return x * 2;
}
