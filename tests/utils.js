export function tryCatch(callback) {
    try {
        callback();
    } catch (err) {
        return err;
    }
}
