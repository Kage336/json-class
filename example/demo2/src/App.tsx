import "./test/speed.test";
import "./App.less";
import React, { useState } from 'react';
import { ToClass } from "json-class";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";
import { Subject, Observable, combineLatest } from "rxjs";
import { filter, debounceTime, map, tap, withLatestFrom, startWith } from "rxjs/operators";
import { useObservable } from "rxjs-hooks";

import { tansformType, tansformJson, Good } from "./demo/tansform-type";
import { renameType, renameJson, Person2 } from "./demo/rename";
import { formatType, formatJson, Person3 } from "./demo/format";
import { fixErrorType, fixErrorJson, Person4 } from "./demo/fix-error";
import { showHandType, showHandJson, Person5 } from "./demo/show-hand";

interface IState {
  error: boolean; // 代码是否错误
  jsObject: any; // 正确的 json 转化成的 object
  toClassStr: string;
}

const clazzList = [
  { clazz: Good, jsonInputVal: tansformJson, defineCode: tansformType },
  // { clazz: Person2, jsonInputVal: renameJson, defineCode: renameType },
  { clazz: Person3, jsonInputVal: formatJson, defineCode: formatType },
  //{ clazz: Person4, jsonInputVal: fixErrorJson, defineCode: fixErrorType },
  //{ clazz: Person5, jsonInputVal: showHandJson, defineCode: showHandType }
]

const toolBarList = ['类型转换', '自定义 format 函数']
const testPage: React.SFC<any> = (props) => {
  function btnClick(i: number) {
    const { clazz, jsonInputVal, defineCode } = clazzList[i] || clazzList[0];
    // console.log(clazz, jsonInputVal, defineCode)
    setDefineCode(defineCode);
    setJsonInputVal(jsonInputVal);
    Clazz$.next(clazz);
    jsonInput$.next({ error: false, toClassStr: JSON.stringify(ToClass(jsonInputVal, clazz), undefined, 2), jsObject: jsonInputVal })
  }
  const [defineCode, setDefineCode] = useState(tansformType);
  const [jsonInputVal, setJsonInputVal] = useState(tansformJson as any);
  const [Clazz$] = useState(new Subject<any>());
  const [jsonInput$] = useState(new Subject<IState>());
  const { toClassStr } = useObservable((_: Observable<IState>) =>
    combineLatest(
      jsonInput$.pipe(
        startWith({ error: false, toClassStr: JSON.stringify(ToClass(tansformJson, Good), undefined, 2), jsObject: tansformJson })),
      Clazz$.pipe(startWith(Good)
      )
    )
      .pipe(
        // tap(_ => Clazz$.subscribe(console.log)),
        filter(([{ error }]) => !error),
        // debounceTime(1000),
        map(([data, Clazz]) => ({ ...data, toClassStr: JSON.stringify(ToClass(data.jsObject, Clazz), undefined, 2) }))
      )
    , { error: false, toClassStr: '' })

  return (<div className="json-wrapper">
    <div className="tool-bar">
      {toolBarList.map((val, i) => <p key={val + i} onClick={() => btnClick(i)}>{val}</p>)}
    </div>
    <div className="input-output-group">
      <div className="input-left">
        <JSONInput
          placeholder={jsonInputVal} // data to display
          theme="default"
          locale={locale}
          colors={{
            // overrides theme colors with whatever color value you want
            string: "#DAA520"
          }}
          height="100%"
          onChange={input => jsonInput$.next(input)}
        />
      </div>
      <div className="output-middle">
        <SyntaxHighlighter
          language='typescript'
          style={dark}
        >
          {
            defineCode
          }
        </SyntaxHighlighter>
      </div>
      <div className="pre-right">
        <SyntaxHighlighter
          language='javascript'
          style={dark}
        >
          {
            toClassStr
          }
        </SyntaxHighlighter>
      </div>
    </div>
  </div>)
}

export default testPage
