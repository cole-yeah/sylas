import React, { useEffect } from 'react';
import Router from './router';
import history from '@/common/utils/history';

function App() {
  useEffect(() => {
    let arr = [
      { id: 1, name: 'id-1', pid: 0 },
      { id: 2, name: 'id-2', pid: 1 },
      { id: 3, name: 'id-3', pid: 1 },
      { id: 4, name: 'id-4', pid: 3 },
      { id: 5, name: 'id-5', pid: 4 },
      { id: 6, name: 'id-6', pid: 1 },
    ];
    const itemMap = new Map();

    const m = new Map();
    arr.forEach(item => {
      const { pid, id } = item;
      itemMap.set(id, item);
      if (m.has(pid)) {
        m.get(pid).push(id);
      } else {
        m.set(pid, [id]);
      }
    });
    let entry = [];
    arr.forEach(item => {
      if (!itemMap.has(item.pid)) {
        entry.push(item.pid);
      }
    });
    const getItemsByIds = ids => {
      return ids.map(id => {
        const item = itemMap.get(id);
        if (m.has(id)) {
          item.children = getItemsByIds(m.get(id));
        }
        return item;
      });
    };
    let res = entry.map(id => getItemsByIds(m.get(id)));
    console.log('kkkkkkkkkk', m, res);
  }, []);
  return (
    <div className="App">
      <Router history={history} />
    </div>
  );
}

export default App;
