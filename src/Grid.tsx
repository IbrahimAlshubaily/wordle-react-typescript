import { useEffect, useState } from "react";
import "./index.css"

interface GridProps {
  word: string
}

interface GridRowProps {
  word: string
  values: String[]
  rowIdx: number
}

const initGridEntries = (): String[][] => {
  const gridEntries: String[][] = Array(5)
  for (let i = 0; i < 5; i++)
    gridEntries[i] = Array(5).fill("")
  return gridEntries;
}

export default function Grid({ word }: GridProps): JSX.Element {

  const [currIdx, setCurrIdx] = useState(0);
  const [gridEntries, setGridEntries] = useState(initGridEntries);

  const handleKeyDown = (event: KeyboardEvent) => {

    const currGridEntries = gridEntries.slice()

    const row = Math.floor(currIdx / 5)
    const col = currIdx % 5;

    currGridEntries[row][col] = event.key

    setGridEntries(currGridEntries)
    setCurrIdx(currIdx + 1)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currIdx])

  return (
    <div>
      {
        gridEntries.map((values, idx) => <GridRow key={idx} rowIdx={idx} word={word} values={values} />)
      }
    </div>
  );
}



function GridRow({ rowIdx, word, values }: GridRowProps): JSX.Element {

  return (
    <div key={rowIdx + '--'} className="gridRow" >
      {
        values.map((value: String, idx: number) => {
          const style = { backgroundColor: "gray" }
          if (value !== "") {
            style.backgroundColor = "red"
            if (value === word[idx]) {
              style.backgroundColor = "green"
            } else if (word.includes(value.charAt(0))) {
              style.backgroundColor = "yellow"
            }
          }
          return <div key={rowIdx * 5 + idx + '-'} className="gridCell" style={style}>{value}</div>
        })
      }
    </div>
  );
}