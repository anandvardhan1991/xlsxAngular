/// <reference lib="webworker" />

const row = { Name: "SheetJS", index: 0 };
addEventListener('message', ({ data }) => {
  const response = getMultiData(data);
  postMessage(response);
});

function getMultiData(n: number): Array<any> {
  console.log(n);
  return Array(n < 10000 ? n : 10000).fill(0).map((curr: any, index: number) => ({...row, index : (n < 10000 ? n : ((10000 * n) + index))}));
}

function factorial(n: number): any{
  if(n < 0){
      return "number has to be positive."
  }

  //base case
  if(n == 0 || n == 1){
      return 1;
  //recursive case
  }else{
      return n * factorial(n-1);
  }
}
