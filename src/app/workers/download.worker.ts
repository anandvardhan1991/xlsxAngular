/// <reference lib="webworker" />
import { utils } from 'xlsx';

const MAX_EXCEL_ROWS = 1048575;
addEventListener('message', ({ data }) => {
  try {
    postMessage(getURL(data));
  } catch(e: any) {
    postMessage({error: String(e.message || e).bold() });
  }
});

function getExcelWSCount(currentDataLength: number) {
  return Math.ceil(currentDataLength / MAX_EXCEL_ROWS);
}

function getSplittedArray(dataToSplit: Array<any>, currentIndex: number = 0, final?: Array<Array<any>>): Array<Array<any>> {
  if(currentIndex >= getExcelWSCount(dataToSplit.length)) {
    return final!;
  }
  return getSplittedArray(dataToSplit, currentIndex + 1, [...(final ?? []), dataToSplit.slice((currentIndex * MAX_EXCEL_ROWS), (MAX_EXCEL_ROWS * (currentIndex + 1)))])
}

function getURL(finalData: Array<any>) {
  const wb = utils.book_new();
  const getSplitted: Array<Array<any>> = getSplittedArray(finalData);
  for(let i = 0; i < getSplitted.length; i ++) {
    console.log(getSplitted[i]);
    const ws = utils.json_to_sheet(getSplitted[i]);
    utils.book_append_sheet(wb, ws, `Data${i}`);
  }
  return wb;
}
