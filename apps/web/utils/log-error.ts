export function logError(err: any) {
  // Do other things here maybe use some log system

  console.error(JSON.stringify(err, null, 2));
}
