import { useCallback, useState } from 'react';
import { safeJsonString } from 'common/utils';
import css from '../style/index.module.scss';

const useLog = () => {
  const [logs, setLogs] = useState([]);
  // 打印函数
  const logFn = useCallback((...args) => {
    setLogs(prevLogs => prevLogs.concat([args]));
    console.log(...args);
  }, []);
  // 打印组件
  const LogView = () => {
    return (
      <div className={css.list}>
        {!!logs?.length &&
          logs.map((itemArgs, i) => {
            return (
              <div className={css.listItem} key={i}>
                {itemArgs.map(item => {
                  item = safeJsonString(item);
                  return <div className={css.item}>{item}</div>;
                })}
              </div>
            );
          })}
      </div>
    );
  };
  return [logFn, LogView];
};

export default useLog;
